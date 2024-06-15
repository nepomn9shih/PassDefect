import {getRelativeZoomSizes} from "../utils/getRelativeZoomSizes";

export const DPR = window.devicePixelRatio || 1;

export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;

export const MAX_ZOOM = getRelativeZoomSizes(3.5, DPR);

export const MIN_ZOOM = getRelativeZoomSizes(1.5, DPR);

const ZOOM_STEP_VALUE = 0.05;

export const ZOOM_STEP = getRelativeZoomSizes(ZOOM_STEP_VALUE, DPR);

export const INITIAL_ZOOM = 2.5;