import {MonstersVariations} from '../enums';

export const getRandomMonsterVariation = () => {
    const monsters = [
        MonstersVariations.INFECTED
    ];

    return monsters[Math.floor(Math.random() * monsters.length)];
}