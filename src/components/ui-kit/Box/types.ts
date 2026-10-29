import type {CSSProperties, HTMLAttributes} from 'react';

/** Допустимые значения flex-свойств бокса */
export type BoxFlexProperties = {
	direction?: CSSProperties['flexDirection'];
	justify?: CSSProperties['justifyContent'];
	align?: CSSProperties['alignItems'];
	gap?: number | string;
};

export type BoxProps = HTMLAttributes<HTMLDivElement> & {
	/** Переключает display: flex внутри бокса */
	flex?: boolean;
	/** Свойства выравнивания компонентов внутри бокса, работают только вместе с flex */
	flexOptions?: BoxFlexProperties;
	padding?: string;
	margin?: string;
	width?: CSSProperties['width'];
};
