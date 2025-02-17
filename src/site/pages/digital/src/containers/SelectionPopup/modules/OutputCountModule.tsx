import {CircuitInfo} from "core/utils/CircuitInfo";
import {GroupAction} from "core/actions/GroupAction";

import {CoderPortChangeAction} from "digital/actions/ports/CoderPortChangeAction";

import {Encoder} from "digital/models/ioobjects";

import {useSelectionProps} from "shared/containers/SelectionPopup/modules/useSelectionProps";
import {NumberModuleInputField} from "shared/containers/SelectionPopup/modules/inputs/NumberModuleInputField";


type Props = {
    info: CircuitInfo;
}
export const OutputCountModule = ({ info }: Props) => {
    const { history, renderer } = info;

    const [props, cs] = useSelectionProps(
        info,
        (c): c is Encoder => (c instanceof Encoder),
        (c) => ({ numOutputs: c.getOutputPortCount().getValue() })
    );

    if (!props)
        return null;

    return <div>
        Output Count
        <label>
            <NumberModuleInputField
                kind="int" min={1} max={8} step={1}
                props={props.numOutputs}
                getAction={(newCount) =>
                    new GroupAction(
                        cs.map(o => new CoderPortChangeAction(o, o.getOutputPortCount().getValue(), newCount)),
                        "Output Count Module"
                    )}
                onSubmit={(info) => {
                    renderer.render();
                    if (info.isValid && info.isFinal)
                        history.add(info.action);
                }}
                alt="Number of outputs object(s) have" />
        </label>
    </div>
}
