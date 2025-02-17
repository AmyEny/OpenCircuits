import {THUMBNAIL_ZOOM_PADDING_RATIO,
        DEFAULT_THUMBNAIL_SIZE} from "./Constants";
import {Camera} from "math/Camera";

import {CullableObject} from "core/models";
import {GetCameraFit} from "core/utils/ComponentUtils";

import {ToolManager} from "core/tools/ToolManager";
import {DefaultTool} from "core/tools/DefaultTool";

import {AnalogCircuitInfo} from "analog/utils/AnalogCircuitInfo";

import {GetRenderFunc} from "./Rendering";


type Info = {
    info: AnalogCircuitInfo;
    size?: {w: number, h: number};
}
export const GenerateThumbnail = (() => {
    const canvas = document.createElement("canvas");
    const camera = new Camera(DEFAULT_THUMBNAIL_SIZE, DEFAULT_THUMBNAIL_SIZE);

    return ({ info, size }: Info): string => {
        canvas.width  = size?.w ?? DEFAULT_THUMBNAIL_SIZE;
        canvas.height = size?.h ?? DEFAULT_THUMBNAIL_SIZE;

        camera.resize(canvas.width, canvas.height);

        // Get final camera position and zoom
        const objs = info.designer.getAll() as CullableObject[];
        const [pos, zoom] = GetCameraFit(camera, objs, THUMBNAIL_ZOOM_PADDING_RATIO);
        camera.setPos(pos);
        camera.setZoom(zoom);

        const render = GetRenderFunc({
            canvas,
            info: {
                ...info,
                camera,
                toolManager: new ToolManager(new DefaultTool()),
            },
        });

        render();

        return canvas.toDataURL("image/png", 0.9);
    }
})();
