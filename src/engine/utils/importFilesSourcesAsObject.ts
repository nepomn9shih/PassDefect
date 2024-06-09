import {JSONImageType} from "../types";

/**
 * собрать все изображения в объект с ключом - названием изображения и значением путем до изображения
 */
export const importFilesSourcesAsObject = (
	// @ts-ignore
	requireContext: __WebpackModuleApi.RequireContext
): {[key: string]: {
	imgUrl: string;
	jsonUrl: string;
};
} => {
	return requireContext.keys().reduce<{[key: string]: string | JSONImageType}>(
		// @ts-ignore
		(acc, item) => {
			let key = '';
			if (item.substring(2).match(/\.(png|jpe?g|svg)$/)) {
				key = item.substring(2).replace(/\.(png|jpe?g|svg)$/, '');
				if (acc[key]) {
					acc[key].imgUrl = requireContext(item);
				} else {
					acc[key] = {
						imgUrl: requireContext(item)
					};
				}
			}
			if (item.substring(2).match(/\.(json)$/)) {
				key = item.substring(2).replace(/\.(json)$/, '');
				if (acc[key]) {
					acc[key].jsonUrl = requireContext(item);
				} else {
					acc[key] = {
						jsonUrl: requireContext(item)
					};
				}
			}

			return acc;
		}, {}
	);
};
