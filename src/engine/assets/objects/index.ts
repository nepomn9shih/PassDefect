// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {importFilesSourcesAsObject} from '../../utils/importFilesSourcesAsObject';

export const OBJECTS_ATLASES =
	importFilesSourcesAsObject(require.context('./', false, /\.(png|jpe?g|svg|json)$/));