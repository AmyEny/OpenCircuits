import {serializable, serialize} from "serialeazy";

import {Wire} from "core/models/Wire";

import {AnalogPort} from "./index";

import {AnalogNode} from "./AnalogNode";


@serializable("AnalogWire")
export class AnalogWire extends Wire {
    @serialize
    protected p1: AnalogPort;
    @serialize
    protected p2: AnalogPort;

    public constructor(p1?: AnalogPort, p2?: AnalogPort) {
        super(p1!, p2!);

        this.p1 = p1!;
        this.p2 = p2!;
    }

    public split(): AnalogNode {
        return new AnalogNode();
    }
}
