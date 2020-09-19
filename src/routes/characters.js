import express from "express";
import {
  createCharacter,
  getCharacter,
  updateCharacterHitPoints,
  getAllCharacters,
} from "../controllers/characters.js";

const router = express.Router();

router.get("/", getAllCharacters);

router.post("/:id", createCharacter);

router.get("/:id", getCharacter);

router.patch("/:id", updateCharacterHitPoints);

export default router;
