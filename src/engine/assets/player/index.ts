// @ts-nocheck

import {importFilesSourcesAsObject} from '../../utils/importFilesSourcesAsObject';

export const PLAYER_ATLASES =
	importFilesSourcesAsObject(import.meta.glob('./*.{png,jpg,jpeg,webp,json}', {eager: true, query: '?url', import: 'default'}));