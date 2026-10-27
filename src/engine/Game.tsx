import {useEffect, useRef} from 'react';
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
    const gameRef = useRef<Phaser.Game | null>(null);
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
        const game = new Phaser.Game(config);
        gameRef.current = game;

        return (): void => {
            game.destroy(true);
            gameRef.current = null;
        }
    }, [store]);

    return <div id={GAME_PASS_DEFECT_ID} />;
};