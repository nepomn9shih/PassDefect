import {MonstersVariations} from '../enums';

export const getRandomMonsterVariation = () => {
    const monsters = [
        MonstersVariations.KNIGHT
    ];

    return monsters[Math.floor(Math.random() * monsters.length)];
}