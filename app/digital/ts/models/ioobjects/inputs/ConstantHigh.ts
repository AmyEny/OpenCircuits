import {V} from "../../../utils/math/Vector";
import {ClampedValue} from "../../../utils/ClampedValue";
import {Component} from "../Component";

export class ConstantHigh extends Component {

    public constructor(){
        super(new ClampedValue(0), new ClampedValue(1), V(50, 50));
        super.activate(true);
    }

    public getDisplayName(): string {
        return "Constant High";
    }

    public getXMLName(): string {
        return "consthigh";
    }

    public getImageName(): string {
        return "constHigh.svg";
    }

}
