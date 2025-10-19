// @ts-nocheck
import {importFilesSourcesAsObject} from '../../utils/importFilesSourcesAsObject';

export const MAP_ATLASES =
	importFilesSourcesAsObject(require.context('./', false, /\.(png|jpe?g|svg|json)$/));