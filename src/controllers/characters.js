import { Character } from '../mongodb/models/character.js';

export const createCharacter = async (req, res, next) => {
    /* Create a Character Randomly! */
    /* -> calcMethod = rand || rounded */
    try {
        const { params, body } = req;

        const calcMethod = params.calcMethod.toString().trim();
        /* TODO: Might need to redo this one chief */
        if (calcMethod === 'rand' || calcMethod === 'rounded') {
            const newChar = new Character(body);

            // Need to add these!?!
            newChar.hp = 0;
            newChar.temphp = 0;
            newChar.maxhp = 0;

            /* Take away first level of first class
            /* + Add hitDiceValue! */
            newChar.classes[0].classLevel -= 1;
            newChar.hp += newChar.classes[0].hitDiceValue;

            // eslint-disable-next-line max-len
            const classHitDie = newChar.classes.map((charClass) => [charClass.hitDiceValue, charClass.classLevel]);

            /* Check which calcMethod we are using!  */
            switch (calcMethod) {
                case 'rand': {
                    let newHp = 0;
                    classHitDie.forEach((rolls) => {
                        for (let i = 0; i < rolls[1]; i++) {
                            newHp = Math.floor(Math.random()
                                    * (rolls[0] - 1 + 1)) + 1;
                            newChar.hp += newHp;
                        }
                    });
                    break;
                }
                case 'rounded': {
                    let newHp = 0;
                    classHitDie.forEach((rolls) => {
                        /* Round up avg dice roll */
                        for (let i = 0; i < rolls[1]; i++) {
                            newHp = Math.ceil((1 + rolls[0]) / 2);
                            newChar.hp += newHp;
                        }
                    });
                    break;
                }
                default: {
                    break;
                }
            }

            /* Add Constituion to hp + maxhp
            /* -don't know if i need to do this per level? should be fine...  */
            newChar.hp += Math.floor((newChar.stats.constitution - 10) / 2)
                        * newChar.level;
            newChar.maxhp = newChar.hp;

            await newChar.save({ validateBeforeSave: true });
            res.status(200).json(newChar);
        } else {
            throw Error('Wrong Params');
        }
    } catch (err) {
        next(err);
    }
};

export const deleteCharacter = async (req, res, next) => {
    try {
        const delChar = await Character.deleteOne({ _id: req.params.id });
        if (delChar.deletedCount > 0) {
            res.status(200).json(delChar);
        } else {
            throw Error('No character with that id found');
        }
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
        if (req.body.tempHp < 0) throw Error('Has to be a positive number');

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
                            break;
                    }
                }
            });
        }
        /* Heal Character! */
        if (hpMod > 0) {
            char.hp += hpMod;
        } else {
            /* Take away damage from temphp */
            char.temphp += hpMod;

            /* Deal Damage! */
            if (char.temphp < 0) char.hp -= Math.abs(char.temphp);
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
