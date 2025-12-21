// @ts-nocheck

import {importFilesSourcesAsObject} from '../../utils/importFilesSourcesAsObject';

// const modules = import.meta.glob('./*.{png,jpg,jpeg,webp,json}', {eager: true, query: '?url', import: 'default'});
// const urls = Object.values(modules);

export const WEAPON_ATLASES =
	importFilesSourcesAsObject(import.meta.glob('./*.{png,jpg,jpeg,webp,json}', {eager: true, query: '?url', import: 'default'}));