import {Provider} from 'react-redux';

import {Game} from './engine/Game';
import {configureGameStore} from './utils/configureGameStore';

export const App = ({data}:{data: any}) => {
  return (
    <Provider store={configureGameStore(data)}>
      <Game />
    </Provider>
  );
}