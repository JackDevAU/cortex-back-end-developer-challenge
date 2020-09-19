import pkg from "mongoose";
const { Schema, model } = pkg;

var CharacterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  hp: { type: Number, required: true },
  maxhp: { type: Number, required: true },
  temphp: { type: Number, required: true },
  classes: [
    {
      name: String,
      hitDiceValue: Number,
      classLevel: Number,
    },
  ],
  stats: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  items: [
    {
      name: String,
      modifiers: {
        affectedObject: String,
        affectedValue: String,
        value: Number,
      },
    },
  ],
  defenses: [
    {
      type: { type: String },
      defense: String,
    },
  ],
});

export const Character = model("character", CharacterSchema, "characters");
