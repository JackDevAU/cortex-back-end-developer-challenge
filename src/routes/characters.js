import express from 'express';

import {
    createCharacter,
    getCharacter,
    updateCharacterHitPoints,
    getAllCharacters,
    addTempHitPoints,
    deleteCharacter,
} from '../controllers/characters.js';

const router = express.Router();

router.get('/', getAllCharacters);

router.post('/:calcMethod', createCharacter);

router.delete('/:id', deleteCharacter);

router.get('/:id', getCharacter);

router.patch('/:id', updateCharacterHitPoints);

router.put('/:id', addTempHitPoints);

export default router;
