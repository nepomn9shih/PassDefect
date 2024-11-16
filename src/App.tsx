import React from 'react';
import {Provider} from 'react-redux';

import {Game} from './engine/Game';
import {configureGameStore} from './utils/configureGameStore';
import {Interface} from './components/Interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const App = ({data}:{data: any}) => {
  return (
    <Provider store={configureGameStore(data)}>
      <Interface />
      <Game />
    </Provider>
  );
}