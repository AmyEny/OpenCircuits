import {useState} from "react";

import {CircuitInfoHelpers} from "shared/utils/CircuitInfoHelpers";
import {CircuitInfo} from "core/utils/CircuitInfo";

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
    info: CircuitInfo;
    extraUtilities: Utility[];
}
export const HeaderRight = ({ helpers, info, extraUtilities }: Props) => {
    const [isHidden, setHidden] = useState(true);

    return (
        <div className="header__right">
            <button type="button" onClick={() => setHidden(!isHidden)}>
                <img className="expand" src={isHidden ? "img/icons/expand.svg" : "img/icons/collapse.svg"} alt="" />
            </button>
            <div className={`header__right__btns ${isHidden ? "header__right__collapsed" : ""}`}>
                <SignInOutButtons />

                {  // Render only if there are utilities or in dev mode for dev utilities
                (extraUtilities.length > 0 || process.env.NODE_ENV === "development") &&
                    <UtilitiesDropdown helpers={helpers} extraUtilities={extraUtilities} />
                }
                <DownloadMenuDropdown helpers={helpers} />
                <OpenFileButton helpers={helpers} />
                <SettingsMenu helpers={helpers} info={info} />
                <TutorialDropdown />
            </div>
        </div>
    );
};
