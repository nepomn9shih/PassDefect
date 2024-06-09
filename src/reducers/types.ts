import {GameState} from "./slices/game/types"
import {WeaponState} from "./slices/weapon/types"

export type AllGameState = {
    game: GameState
    weapon: WeaponState
} 