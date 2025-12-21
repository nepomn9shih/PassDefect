import type {GameState} from "./slices/game/types"
import type {PlayerState} from "./slices/player/types";
import type {WeaponState} from "./slices/weapon/types"

export type AllGameState = {
    game: GameState;
    player: PlayerState;
    weapon: WeaponState;
} 