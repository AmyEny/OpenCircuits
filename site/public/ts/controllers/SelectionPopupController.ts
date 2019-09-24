import {Vector, V} from "Vector";

import {Camera} from "math/Camera";
import {MainDesignerController} from "./MainDesignerController";
import {Component} from "core/models/Component";
import {Wire} from "core/models/Wire";
import {Port} from "digital/models/ports/Port";

import {SelectionPopupModule} from "../selectionpopup/SelectionPopupModule";
import {TitlePopupModule} from "../selectionpopup/TitlePopupModule";
import {PositionPopupModule} from "../selectionpopup/PositionPopupModule";
import {ICButtonPopupModule} from "../selectionpopup/ICButtonPopupModule";
import {BusButtonPopupModule} from "../selectionpopup/BusButtonPopupModule";
import {ColorPopupModule} from "../selectionpopup/ColorPopupModule";
import {InputCountPopupModule} from "../selectionpopup/InputCountPopupModule";
import {OutputCountPopupModule} from "../selectionpopup/OutputCountPopupModule";
import {ClockFrequencyPopupModule} from "../selectionpopup/ClockFrequencyPopupModule";

/**
* A popup that exposes certain properties of the selected components to the user
* ! Controls its own DOM element(s)
* TODO: use decorators or some other interface to determine what properties are available
*/
export const SelectionPopupController = (() => {
    let camera: Camera;
    let div: HTMLDivElement;
    let modules: Array<SelectionPopupModule>;
    let pos: Vector;

    const setPos = function(v: Vector): void {
        pos = v;

        div.style.left = `${pos.x}px`;
        div.style.top  = `${pos.y}px`;
    }

    return {
        Init: function(cam: Camera, divId: string = "selection-popup"): void {
            camera = cam;

            div = document.getElementById(divId) as HTMLDivElement;
            // ? .js sets position to "absolute" -- why? Why not set in the css file

            modules = new Array<SelectionPopupModule>(
                new TitlePopupModule(div),
                new PositionPopupModule(div),
                new ColorPopupModule(div),
                new InputCountPopupModule(div),
                new OutputCountPopupModule(div),
                new ClockFrequencyPopupModule(div),
                new ICButtonPopupModule(div),
                new BusButtonPopupModule(div)
            );
            pos = V(0, 0);

            SelectionPopupController.Hide();
        },
        Update: function(): void {
            const selections = MainDesignerController.GetSelections();

            if (selections.length > 0) {
                // Update each module
                // Important to do this before repositioning the popup, since its size changes depending on which modules are active
                modules.forEach(c => c.pull());

                // Update the position of the popup
                const positions = selections.map((o) => {
                    if (o instanceof Component)
                        return o.getPos();
                    else if (o instanceof Wire)
                        return o.getShape().getPos(0.5);
                    else if (o instanceof Port)
                        return o.getWorldTargetPos();
                });
                const sum = positions.reduce((acc, pos) => acc.add(pos), V(0, 0));
                const screenPos = camera.getScreenPos(sum.scale(1/positions.length)).sub(0, div.clientHeight/2);

                // TODO: clamp should make sure not to overlap with other screen elements
                //const lo = new Vector(0);
                //const hi = new Vector(document.body.clientWidth, document.body.clientHeight);

                setPos(screenPos);// Vector.clamp(screen_pos, lo, hi);

                this.Show();
            } else {
                this.Hide();
            }
        },
        Show: function(): void {
            div.classList.remove("invisible")
            div.focus();
        },
        Hide: function(): void {
            div.classList.add("invisible");
        }
    };
})();
