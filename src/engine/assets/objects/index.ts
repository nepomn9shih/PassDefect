// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {importFilesSourcesAsObject} from '../../utils/importFilesSourcesAsObject';

export const OBJECTS_ATLASES =
	importFilesSourcesAsObject(import.meta.glob('./*.{png,jpg,jpeg,webp,json}', {eager: true, query: '?url', import: 'default'}));