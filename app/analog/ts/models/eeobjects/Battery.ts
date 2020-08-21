import {serializable} from "serialeazy";

import {IO_PORT_LENGTH} from "core/utils/Constants";

import {V} from "Vector";
import {ClampedValue} from "math/ClampedValue";

import {AnalogComponent} from "analog/models/AnalogComponent";
import { NetlistComponent } from "../NetlistComponent";

@serializable("Battery")
export class Battery extends NetlistComponent {
    public constructor(voltage: number = 5) {
        super(new ClampedValue(2), V(50, 50));

        // Ensure no negative/zero voltage!!!
        if (voltage > 0) {
            this.voltage = voltage;
        } else {
            this.voltage = 5;
        }

        this.ports.getPorts()[0].setTargetPos(V(0, IO_PORT_LENGTH));
        this.ports.getPorts()[1].setTargetPos(V(0, -IO_PORT_LENGTH));
    }

    public getDisplayName(): string {
        return "Battery";
    }

    public getImageName(): string {
        return "voltagesource.svg";
    }

    public getVoltage(): number {
        return this.voltage;
    }

    public setVoltage(newVoltage: number): void {
        if (newVoltage > 0) {
            this.voltage = newVoltage;
        }
    }

    public getNetlistSymbol(): string {
        return "v" + this.netlistNum;
    }

    public getNetListStats(): string {
        return " dc " + this.getVoltage();
    }
}
