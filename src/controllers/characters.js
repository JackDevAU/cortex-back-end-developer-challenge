/* eslint-disable no-console */

import { Character } from '../mongodb/models/character.js';

export const createCharacter = async (req, res, next) => {
    /* Create a Character Randomly! */

};

export const deleteCharacter = async (req, res, next) => {
    try {
        res.status(200).json(await Character.deleteOne({ _id: req.params.id }));
    } catch (err) {
        next(err);
    }
};

export const getAllCharacters = async (req, res, next) => {
    try {
        const char = await Character.find();
        res.status(200).json(char);
    } catch (err) {
        next(err);
    }
};

export const getCharacter = async (req, res, next) => {
    try {
        const char = await Character.findOne({ _id: req.params.id });
        res.status(200).json(char);
    } catch (err) {
        next(err);
    }
};

export const addTempHitPoints = async (req, res, next) => {
    try {
        if (req.body.tempHp === undefined) throw Error('Missing param');

        const char = await Character.findOne({ _id: req.params.id });

        if (req.body.tempHp > char.temphp) {
            char.temphp = req.body.tempHp;
            char.save({ validateBeforeSave: true });
        }

        res.status(200).json(char);
    } catch (err) {
        next(err);
    }
};

export const updateCharacterHitPoints = async (req, res, next) => {
    try {
        if (req.body.hp === undefined) throw Error('Missing param');
        if (req.body.dmgType === undefined) throw Error('Missing param');

        let hpMod = req.body.hp;

        console.log(req.body);

        const char = await Character.findOne({ _id: req.params.id });

        let found = false;

        /* Check if character has defenses! */
        /* Check if its Damage (Negative Number) */
        if (hpMod < 0 && char.defenses?.length) {
            /* Loop over all characters defenses */

            char.defenses.forEach((resist) => {
                /* Check if the attack matches one */

                if (resist.type.toLowerCase()
                === req.body.dmgType.trim().toLowerCase()
                && found !== true) {
                    switch (resist.defense) {
                        case 'immunity': {
                            found = true;
                            /* Take no damage */
                            hpMod = 0;
                            break;
                        }
                        case 'resistance': {
                            found = true;
                            /* Half the damage */
                            hpMod = Math.floor(hpMod / 2);
                            break;
                        }
                        default:
                            /* Do nothing! */
                    }
                }
            });
        }
        /* Heal Character! */
        if (hpMod > 0) {
            console.log(`adding hp! ${char.hp} : ${hpMod}`);
            char.hp += hpMod;
            console.log(`New hp! ${char.hp}`);
        } else {
            console.log(`taking hp! ${char.hp}`);
            /* Take away damage from temphp */
            char.temphp += hpMod;

            /* Deal Damage! */
            if (char.temphp < 0) char.hp -= Math.abs(char.temphp);

            console.log(`new hp! ${char.hp}`);
        }

        /* Check temphp! No -Neg */
        if (char.temphp < 0) char.temphp = 0;

        /* Check maxhp */
        if (char.hp > char.maxhp) char.hp = char.maxhp;

        /* Check -Neg hp */
        if (char.hp < 0) char.hp = 0;

        /* update! */
        char.save({ validateBeforeSave: true });

        res.status(200).json(char);
    } catch (err) {
        next(err);
    }
};
