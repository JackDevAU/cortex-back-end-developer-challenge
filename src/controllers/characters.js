import { Character } from "../mongodb/models/character.js";

export const createCharacter = async (req, res, next) => {};

export const getAllCharacters = async (req, res, next) => {
  try {
    var char = await Character.find();
    res.status(200).json(char);
  } catch (err) {
    next(err);
  }
};

export const getCharacter = async (req, res, next) => {
  try {
    var char = await Character.findOne({ _id: req.params.id });
    res.status(200).json(char);
  } catch (err) {
    next(err);
  }
};

export const updateCharacterHitPoints = async (req, res, next) => {};
