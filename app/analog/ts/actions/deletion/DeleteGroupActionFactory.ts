import {GroupAction} from "../GroupAction";
import {DeselectAction} from "../selection/SelectAction";
import {DeleteAction} from "../addition/PlaceAction";
import {DisconnectAction} from "../addition/ConnectionAction";

import {SelectionTool} from "analog/tools/SelectionTool";

import {GatherGroup} from "analog/utils/ComponentUtils";

import {EEObject} from "analog/models/eeobjects/EEObject";

export function CreateDeleteGroupAction(selectionTool: SelectionTool, objects: Array<EEObject>): GroupAction {
    const action = new GroupAction();

    const allDeletions = GatherGroup(objects);
    const components = allDeletions.getAllComponents();
    const wires = allDeletions.wires;

    // Create actions for deletion of wires then objects
    //  order matters because the components need to be added
    //  (when undoing) before the wires can be connected
    action.add(objects.map((obj)    => new DeselectAction(selectionTool, obj)));
    action.add(wires.map((wire)     => new DisconnectAction(wire)));
    action.add(components.map((obj) => new DeleteAction(obj)));

    return action;
}
