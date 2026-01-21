import {importFilesSourcesAsObject} from '../../utils/importFilesSourcesAsObject';

export const INTERFACE_ATLASES =
	importFilesSourcesAsObject(import.meta.glob('./*.{png,jpg,jpeg,webp,json}', {eager: true, query: '?url', import: 'default'}));