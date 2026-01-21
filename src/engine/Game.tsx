import {useEffect, useState} from 'react';
import Phaser from 'phaser';
import {useDispatch, useStore} from 'react-redux';

import {GAME_PASS_DEFECT_ID} from './constants';
import {getGameConfig} from './utils/getGameConfig';
import {BootScene, MainScene, ControlsScene} from './scenes';
import type {AllGameState} from '../reducers/types';
import {useIsMobile} from '../hooks/useIsMobile';
import {setIsMobile, setIsTouchDevice} from '../reducers/slices';
import { isTouchDevice } from '../utils/isTouchDevice';

export const Game = () => {
    const [, setGame] = useState<Phaser.Game>();
    const store = useStore<AllGameState>();
    const isMobile = useIsMobile();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsMobile(isMobile));
    }, [dispatch, isMobile]);

    useEffect(() => {
        dispatch(setIsTouchDevice(isTouchDevice()));
    }, [dispatch]);

    useEffect(() => {
        const scenes: Phaser.Scene[] = [
            new BootScene(store),
            new MainScene(store),
            new ControlsScene(store)
        ];

        const config = getGameConfig(scenes);
        const _game = new Phaser.Game(config);

        // eslint-disable-next-line
        setGame(_game);

        return (): void => {
            _game.destroy(true);
            setGame(undefined);
        }
    // eslint-disable-next-line
    }, []);

    return <div id={GAME_PASS_DEFECT_ID} />;
};