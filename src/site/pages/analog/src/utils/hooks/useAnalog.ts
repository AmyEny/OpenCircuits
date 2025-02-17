import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";

import {AppState} from "site/analog/state";
import {AllActions} from "site/analog/state/actions";


export const useAnalogDispatch = () => {
    return useDispatch<ThunkDispatch<AppState, undefined, AllActions>>();
}

export const useAnalogSelector = <TSelected = unknown>(selector: (state: AppState) => TSelected) => {
    return useSelector<AppState, TSelected>(selector);
}
