import {useRef} from "react";

import {SharedModuleInputFieldProps, useBaseModule} from "./ModuleInputField";


type Props<T extends string|number> = SharedModuleInputFieldProps<T> & {
    kind: (T extends string ? "string[]" : "number[]");
    options: Array<[string, T]>;
}
export const SelectModuleInputField = <T extends number|string>({ kind, options, placeholder, ...props }: Props<T>) => {
    const ref = useRef<HTMLSelectElement>(null);

    const [state, setState] = useBaseModule<T>({
        ...props,

        parseVal:      (val) => (kind === "string[]" ? val : Number(val)) as T,
        isValid:        (_)  => true,
    });

    return (
        <select
            ref={ref}
            value={state.value}
            onChange={(ev) => setState.onChange(ev.target.value)}
            onFocus={() => setState.onFocus()}
            onBlur={() => setState.onBlur()}
            placeholder={placeholder}>
        <option value="" disabled hidden>{placeholder ?? "-"}</option>
        {options.map(o => (
            <option key={`select-module-${o}`} value={o[1]}>{o[0]}</option>
        ))}
        </select>
    );
}
