import type {ButtonHTMLAttributes} from 'react';
import type { ButtonColors } from './enums';

/** Варианты цветовой темы кнопки */
export type ButtonVariation = 'purple' | 'yellow';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	/** Цветовая тема кнопки */
	variation?: ButtonColors;
};
