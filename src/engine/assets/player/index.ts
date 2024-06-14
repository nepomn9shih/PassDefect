// @ts-nocheck

import {importFilesSourcesAsObject} from '../../utils/importFilesSourcesAsObject';

export const PLAYER_ATLASES =
	importFilesSourcesAsObject(require.context('./', false, /\.(png|jpe?g|svg|json)$/));