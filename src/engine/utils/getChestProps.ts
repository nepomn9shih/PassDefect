import {ChestVariations} from "../enums";
import {getRandomNumber} from "./getRandomNumber";

export const getChestProps = () => {
    let variation: ChestVariations;
    let gold = 0;
    let hearts = 0;
    let bolts = 0;
    let armor = 0;
    const random = Math.floor(Math.random() * 10);

    switch(random) {
        case 0: {
            variation = ChestVariations.HEART;
            hearts = getRandomNumber(1, 3);
            break;
        }
        case 1: {
            variation = ChestVariations.BOLTS;
            bolts = 5;
            break;
        }
        case 2: {
            variation = ChestVariations.ARMOR;
            armor = 1;
            break;
        }
        default: {
            variation = ChestVariations.COIN;
            gold = getRandomNumber(10, 20)
        }
    }

    return {
        variation,
        gold,
        hearts,
        bolts,
        armor
    }
}