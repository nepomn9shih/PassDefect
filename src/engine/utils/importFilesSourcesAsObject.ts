/**
 * собрать все изображения в объект с ключом - названием изображения и значением путем до изображения
 */
export const importFilesSourcesAsObject = (
	modules: Record<string, string>
): {[key: string]: {
	imgUrl?: string;
	jsonUrl?: string;
};
} => {
	return Object.keys(modules).reduce<{[key: string]: {
		imgUrl?: string;
		jsonUrl?: string;
	}}>(
		(acc, item) => {
			let key = '';
			if (item.substring(2).match(/\.(png|jpe?g|svg)$/)) {
				key = item.substring(2).replace(/\.(png|jpe?g|svg)$/, '');
				if (acc[key]) {
					acc[key].imgUrl = modules[item];
				} else {
					acc[key] = {
						imgUrl: modules[item]
					};
				}
			}
			if (item.substring(2).match(/\.(json)$/)) {
				key = item.substring(2).replace(/\.(json)$/, '');
				if (acc[key]) {
					acc[key].jsonUrl = modules[item];
				} else {
					acc[key] = {
						jsonUrl: modules[item]
					};
				}
			}

			return acc;
		}, {}
	);
};
