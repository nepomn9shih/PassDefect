import {GameState} from "./slices/game/types"
import {PlayerState} from "./slices/player/types";
import {WeaponState} from "./slices/weapon/types"

export type AllGameState = {
    game: GameState;
    player: PlayerState;
    weapon: WeaponState;
} 