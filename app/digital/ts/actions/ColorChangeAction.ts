import {Action} from "./Action";
import {LED} from "../../models/ioobjects/outputs/LED";

export class ColorChangeAction implements Action {
    private led: LED;

    private initialColor: string;
    private targetColor: string;

    public constructor(led: LED, targetCol: string) {
        this.led = led;

        this.initialColor = led.getColor();
        this.targetColor = targetCol;
    }

    public execute(): Action {
        this.led.setColor(this.targetColor);

        return this;
    }

    public undo(): Action {
        this.led.setColor(this.initialColor);

        return this;
    }

}
