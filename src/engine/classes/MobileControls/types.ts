import type {ButtonVariations} from "../../enums";
import type {ControlsScene} from "../../scenes/ControlsScene";

export type MobileControlsProps = {
    scene: ControlsScene;
};

export type ButtonProps = {
    scene: ControlsScene;
    variation: ButtonVariations;
};
