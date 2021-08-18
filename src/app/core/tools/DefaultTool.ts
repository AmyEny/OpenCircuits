import {CircuitInfo} from "core/utils/CircuitInfo";
import {Event} from "core/utils/Events";
import {EventHandler} from "./EventHandler";


export class DefaultTool {
    protected handlers: EventHandler[];

    public constructor(...handlers: EventHandler[]) {
        this.handlers = handlers;
    }

    public onActivate(event: Event, info: CircuitInfo): void {
    }

    // Method called when this tool is currently active and an event occurs
    public onEvent(event: Event, info: CircuitInfo): boolean {
        // Zoom
        if (event.type === "zoom") {
            info.camera.zoomTo(event.pos, event.factor);
            return true;
        }

        if (event.type == "mouseenter"){
            //hover handlers here to ease debugging.
            console.log("hit");

            return true;
        }

        for (const handler of this.handlers) {
            if (handler.conditions(event, info)) {
                handler.getResponse(info);
                return true;
            }
        }

        return false;
    }
}
