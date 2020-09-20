import pkg from 'mongoose';

const { Schema, model } = pkg;

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    level: {
        type: Number, required: true, min: 1, max: 20,
    },
    hp: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value',
        },
    },
    maxhp: { type: Number, required: true },
    temphp: { type: Number, required: true },
    classes: [
        {
            name: { type: String, required: true },
            hitDiceValue: { type: Number, required: true },
            classLevel: {
                type: Number, required: true, min: 1, max: 20,
            },
        },
    ],
    stats: {
        strength: { type: Number, required: true },
        dexterity: { type: Number, required: true },
        constitution: { type: Number, required: true },
        intelligence: { type: Number, required: true },
        wisdom: { type: Number, required: true },
        charisma: { type: Number, required: true },
    },
    items: [
        {
            name: { type: String, required: true },
            modifiers: {
                affectedObject: String,
                affectedValue: String,
                value: Number,
            },
        },
    ],
    defenses: [
        {
            type: { type: String, required: true },
            defense: { type: String, required: true },
        },
    ],
});

// eslint-disable-next-line import/prefer-default-export
export const Character = model('character', CharacterSchema, 'characters');
