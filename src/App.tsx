import {Provider} from 'react-redux';

import {Game} from './engine/Game';
import {configureGameStore} from './utils/configureGameStore';
import {Interface} from './components/Interface';
import type {AllGameState} from './reducers/types';

export const App = ({data}: {data: Partial<AllGameState>}) => {
  return (
    <Provider store={configureGameStore(data)}>
      <Interface />
      <Game />
    </Provider>
  );
}