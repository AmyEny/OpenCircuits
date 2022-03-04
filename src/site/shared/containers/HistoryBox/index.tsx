import {useState} from "react";

import {CircuitInfo} from "core/utils/CircuitInfo";

import {Action} from "core/actions/Action";
import {GroupAction} from "core/actions/GroupAction";

import {useSharedDispatch, useSharedSelector} from "shared/utils/hooks/useShared";
import {useHistory} from "shared/utils/hooks/useHistory";

import {CloseHistoryBox} from "shared/state/ItemNav";

import "./index.scss";


type HistoryEntryProps = {
    a: Action;
}
const HistoryEntry = ({a}: HistoryEntryProps) => {
    function stopPropagation(e: any) {
        e.stopPropagation();
    }

    if (a instanceof GroupAction)
        return(<GroupActionEntry g={a}></GroupActionEntry>)
    return(<div className="historybox__entry" onClick={(e) => stopPropagation(e)}>{a.getName()}</div>);
}


type GroupActionEntryProps = {
    g: GroupAction;
}
const GroupActionEntry = ({g}: GroupActionEntryProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    function collapse(e: any) {
        e.stopPropagation();
        setIsCollapsed(!isCollapsed);
    }

    if (g.isEmpty())
        return null;
    if (g.getActions().length === 1) {
        return(<HistoryEntry a={g.getActions()[0]}></HistoryEntry>);
    }
    return (
        <div className="historybox__groupentry" onClick={(e) => collapse(e)}>
            <span>Group Action</span>
            {isCollapsed ?
                <span className="historybox__groupentry-collapse">&#8964;</span>
                :
                <span className="historybox__groupentry-collapse">&rsaquo;</span>
            }
            {isCollapsed && g.getActions().map((a, i) => {
                return(<HistoryEntry key={`group-action-entry-${i}`} a={a}></HistoryEntry>);
            })}
        </div>
    );
}


type Props = {
    info: CircuitInfo;
}
export const HistoryBox = ({ info }: Props) => {
    const {isOpen, isHistoryBoxOpen} = useSharedSelector(
        state => ({ ...state.itemNav })
    );
    const dispatch = useSharedDispatch();

    const {undoHistory, redoHistory} = useHistory(info);

    return (
        <div className={`historybox ${isOpen ? "" : "historybox__move"} ${isHistoryBoxOpen ? "" : "hide"}`}>
            <div>
                <span>History</span>
                <span onClick={() => dispatch(CloseHistoryBox())}>×</span>
            </div>
            <div>
                {[...undoHistory].reverse().map((a, i) =>
                    <HistoryEntry key={`history-box-entry-${i}`} a={a}></HistoryEntry>
                )}
            </div>
        </div>

    );
}