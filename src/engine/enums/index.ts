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
    SWORD = 'sword',
    GUN = 'gun',
    RIFLE = 'rifle'
}

export enum PlayerDirections {
    RIGHT = 'right',
    LEFT = 'left',
    UP = 'up',
    DOWN = 'down'
}

export enum PlayerSkinVariations {
    KNIGHT = 'player-skin-knight'
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

export enum GameEvents {
    SPAWN_PLAYER = 'spawn-player',
    RESPAWN_PLAYER = 'respawn-player',
    DEATH_PLAYER = 'death-player',
    SPAWN_CHEST = 'chest-spawned',
    REMOVE_CHEST = 'chest-removed',
    SPAWN_MONSTER = 'monster-spawned',
    MOVE_MONSTER = 'move-monster',
    HIT_MONSTER = 'hit-monster',
    HIT_PLAYER = 'hit-player',
    DESTROY_MONSTER = 'destroy-monster',
    PICK_UP_CHEST = 'pick-up-chest',
    UPDATE_SCORE = 'update-score'
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