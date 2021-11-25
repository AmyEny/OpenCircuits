import {Deserialize, Serialize} from "serialeazy";

import {V, Vector} from "Vector";

import {IOObjectSet} from "core/utils/ComponentUtils";

import {Action} from "core/actions/Action";
import {GroupAction} from "core/actions/GroupAction";
import {AddGroupAction} from "core/actions/addition/AddGroupAction";
import {CreateDeselectAllAction, CreateGroupSelectAction} from "core/actions/selection/SelectAction";
import {TranslateAction} from "core/actions/transform/TranslateAction";

import {Component, IOObject} from "core/models";

import {DigitalCircuitInfo} from "digital/utils/DigitalCircuitInfo";
import {TransferICDataAction} from "digital/actions/TransferICDataAction";
import {DigitalCircuitDesigner} from "digital/models/DigitalCircuitDesigner";
import {IC} from "digital/models/ioobjects/other";

/**
 * Finds and adds any new IC data upon paste
 * @param objs All objects in data
 * @param designer Circuit designer
 * @returns GroupAction to add all relevant IC data
 */
function TransferNewICData(objs: IOObject[], designer: DigitalCircuitDesigner): Action | undefined {
    // Find ICs and ICData
    const ics = objs.filter(o => o instanceof IC) as IC[];
    const icData = [...new Set(ics.map(ic => ic.getData()))]; // Get unique ICData

    // Check if any of the icData's are already within this circuit by comparing
    //  their serialized versions (fixes issue #712)
    const serializedICDatas = designer.getICData().map(d => Serialize(d));

    // Get indices of ICData that already exist (-1 if the ICData is new)
    const icDataIndices = icData
        .map(d => Serialize(d))
        .map(s => serializedICDatas.indexOf(s));

    // Filter out only the new ICData
    const newICData = icData.filter((_, i) => (icDataIndices[i] === -1));

    // Update ICs to use existing ICData if applicable
    ics.forEach(ic => {
        const dataIndex = icDataIndices[icData.indexOf(ic.getData())];
        if (dataIndex === -1)
            return; // Don't change IC since it uses the new Data
        // Change ICData to point to the existing ICData in the designer
        ic["data"] = designer.getICData()[dataIndex];
    });

    // Transfer the new ICData
    const action = new GroupAction([
        new TransferICDataAction(newICData, designer).execute()
    ]);

    // Recursively look through all the new ICs for new ICData
    newICData.forEach(d => {
        const newAction = TransferNewICData(d.getGroup().toList(), designer);
        if (newAction)
            action.add(newAction)
    });

    return action;
}

/**
 * Maps positions of pasted components based around intially selected item
 * @param comps Components in clipboard
 * @param info Circuit info from which to pull camera and input
 * @returns Target positions for pasting at mouse pos
 */
function shiftAllObj(comps: Component[], info: DigitalCircuitInfo): Vector[] {
    const {camera, input} = info;
    const worldMousePos = camera.getWorldPos(input.getMousePos());
    const shift = worldMousePos.sub(comps[0].getPos());
    return comps.map(o => o.getPos().add(shift));
}

/**
 * Performs paste action in Digital Circuit
 * @param data Clipboard data
 * @param info Circuit info
 * @param mouse True if being pasted using context menu
 * @returns True if successful paste
 */
export function DigitalPaste(data: string, info: DigitalCircuitInfo, mouse: boolean): boolean {
    try {
        const {history, designer, selections, renderer} = info;
        const objs = Deserialize<IOObject[]>(data);

        const newICDataAction = TransferNewICData(objs, designer);

        // Get all components
        const comps = objs.filter(o => o instanceof Component) as Component[];

        // Determine target positions for pasted components
        const targetPositions = mouse ?
            shiftAllObj(comps, info) :
            comps.map(o => o.getPos().add(V(5, 5)));

        // Create action to transfer the ICData, add the objects, select them, and offset them slightly
        const action = new GroupAction();
        if (newICDataAction)
            action.add(newICDataAction);
        action.add(new GroupAction([
            new AddGroupAction(designer, new IOObjectSet(objs)),
            CreateDeselectAllAction(selections),
            CreateGroupSelectAction(selections, comps),
            new TranslateAction(comps, comps.map(o => o.getPos()), targetPositions)
        ]).execute());

        history.add(action);

        renderer.render();

        return true;
    } catch (_) {
        return false;
    }
}
