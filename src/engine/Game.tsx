import React, {useEffect, useState} from 'react';
import Phaser from 'phaser';
import {useStore} from 'react-redux';

import {GAME_PASS_DEFECT_ID} from './constants';
import {getGameConfig} from './utils/getGameConfig';
import {BootScene, MainScene} from './scenes';
import {AllGameState} from '../reducers/types';

export const Game = () => {
    const [, setGame] = useState<Phaser.Game>();
    const store = useStore<AllGameState>();

    useEffect(() => {
        const scenes: Phaser.Scene[] = [
            new BootScene(store),
            new MainScene(store)
        ];

        const config = getGameConfig(scenes);
        const _game = new Phaser.Game(config);

        setGame(_game);

        return (): void => {
            _game.destroy(true);
            setGame(undefined);
        }
    // eslint-disable-next-line
    }, []);

    return <div id={GAME_PASS_DEFECT_ID} />;
};