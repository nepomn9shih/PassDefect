export type GameState = {
    zoom: number;
    isMobile: boolean;
    isTouchDevice: boolean;
    isPaused: boolean;
    isGameOver: boolean;
    restartRequested: boolean;
}