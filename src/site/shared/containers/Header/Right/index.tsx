import {useState} from "react";

import {CircuitInfoHelpers} from "shared/utils/CircuitInfoHelpers";

import {TutorialDropdown} from "./TutorialDropdown";
import {OpenFileButton} from "./OpenFileButton";
import {DownloadMenuDropdown} from "./DownloadMenuDropdown";
import {UtilitiesDropdown} from "./UtilitiesDropdown";
import {SignInOutButtons} from "./SignInOutButtons";
import {SettingsMenu} from "./SettingsMenu";
import {Utility} from "./UtilitiesDropdown";

import "./index.scss";


type Props = {
    helpers: CircuitInfoHelpers;
    extraUtilities: Utility[];
}
export const HeaderRight = ({ helpers, extraUtilities }: Props) => {
    const [isHidden, setHidden] = useState(true);

    return (
        <div className="header__right">
            <button type="button" onClick={() => setHidden(!isHidden)}>
                <img className="expand" src={isHidden ? "img/icons/expand.svg" : "img/icons/collapse.svg"} alt="" />
            </button>
            <div className={`header__right__btns ${isHidden ? "header__right__collapsed" : ""}`}>
                <SignInOutButtons />
                {extraUtilities.length > 0 && // Render only if there are tools
                    <UtilitiesDropdown extraUtilities={extraUtilities} />
                }
                <DownloadMenuDropdown helpers={helpers} />
                <OpenFileButton helpers={helpers} />
                <SettingsMenu helpers={helpers} />
                <TutorialDropdown />
            </div>
            {/* <div className="header__right">
            </div>
            <div className="header__right__alt">
                <button type="button" onClick = {() => setHidden(!isHidden)}><img className ="expand"
                        src={isHidden ? "img/icons/expand.svg" : "img/icons/collapse.svg"} alt = ""/></button>
                <div id={isHidden ? 'hidden' : 'notHidden' } >
                    <li><OpenFileButton helpers={helpers} /></li>
                    <li><SettingsMenu helpers={helpers} /></li>
                    <li><DownloadMenuDropdown helpers={helpers} /></li>
                    <li><TutorialDropdown /></li>
                    <li><SignInOutButtons /></li>
                </div>
            </div> */}
        </div>
    );
}
