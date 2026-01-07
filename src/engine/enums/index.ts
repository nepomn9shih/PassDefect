export * from './GameEvents';

export enum LevelMaps {
    SWAMP_PLANET = 'swamp-planet'
}

export enum MapLayersNames {
    MAP = 'map-layer',
    BLOCKER = 'blocked-layer'
}

export enum ObjectLayersNames {
    CHEST_LOCATIONS = 'chest-locations',
    PLAYER_LOCATIONS = 'player-locations',
    MONSTER_LOCATIONS = 'monster-locations'
}

export enum SceneNames {
    MAIN = 'MainScene',
    BOOT = 'BootScene'
}

export enum WeaponVariations {
    FLAME_GUN = 'flame-gun',
    SWORD = 'sword'
}

export enum WeaponBoltsVariations {
    FLAME_BOLT = 'flame-bolt',
    SWORD_BOLT = 'sword-bolt'
}

export enum PlayerDirections {
    RIGHT = 'right',
    LEFT = 'left',
    RIGHT_UP = 'right-up',
    LEFT_UP = 'left-up',
    RIGHT_DOWN = 'right-down',
    LEFT_DOWN = 'left-down'
}

export enum PlayerSkinVariations {
    KNIGHT = 'player-skin-knight'
}

export enum HelmetsVariations {
    PLAYER_KNIGHT = 'player-helmets-knight'
}

export enum MonstersVariations {
    KNIGHT = 'monster-knight'
}

export enum SpawnObjects {
    CHEST = 'chest',
    MONSTER = 'monster'
}

export enum SpawnerImageVariations {
    CHEST = 'chest-spawner',
    MONSTER = 'monster-spawner',
    PLAYER = 'player-spawner'
}

export enum AtlasesKeys {
    PICK_UP_OBJECTS = 'pick-up',
    SWAMP_PLANET_LEVEL_MAP = 'swamp-planet',
    SPAWNERS = 'spawners',
    MAP_OBJECTS = 'map-objects'
}

export enum PlayerAnimation {
    MOVE = 'player-move',
    GET_HIT = 'player-get-hit',
    DEATH = 'player-death',
    SPAWN = 'player-spawn'
}

export enum MonsterAnimation {
    MOVE = 'monster-move',
    GET_HIT = 'monster-get-hit',
    DEATH = 'monster-death',
    SPAWN = 'monster-spawn'
}

export enum MapObjectVariations {
    ROCK_MINI = 'rock-mini',
    ROCK_BIG = 'rock-big',
    ROCK_MEDIUM = 'rock-medium',
    ROCK_AND_BUSH = 'rock-and-bush',
    TREE_BIG = 'tree-big',
    TREE_LITTLE = 'tree-little',
    TREE_BUSHES = 'tree-bushes',
    PUDDLE_MINI = 'puddle-mini',
    PUDDLE_1 = 'puddle-1',
    PUDDLE_2 = 'puddle-2',
    PUDDLE_3 = 'puddle-3',
    BONES = 'bones',
    WALL_LEFT_RIGHT = 'wall-left-right',
    WALL_RIGHT_LEFT = 'wall-right-left'
}

export enum ChestVariations {
    COIN = 'coin-chest',
    BOLTS = 'bolts-chest',
    HEART = 'heart-chest',
    ARMOR = 'armor-chest'
}