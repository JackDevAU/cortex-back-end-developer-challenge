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

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Get all characters
 *     description: Returns all characters
 *     tags:
 *      - Characters
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Characters
 */
router.get('/', getAllCharacters);

/**
 * @swagger
 * /characters/rand:
 *   post:
 *     summary: Random hit point generation method
 *     description: Used to create a new character - with the random Hit Point generation method
 *     tags: [Characters, Create Character]
 *     produces:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Created new character
 */

/**
 * @swagger
 * /characters/rounded:
 *   post:
 *     summary: Rounded Avg hit point generation method
 *     description: Used to create a new character - with the Rounded Avg Hit Point generation method
 *     tags: [Characters, Create Character]
 *     produces:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Created new character
 */
router.post('/:calcMethod', createCharacter);

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Delete a character given the id
 *     tags: [Characters, Delete Character]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Deleted character with id
 */
router.delete('/:id', deleteCharacter);

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Gets a character given the id
 *     tags: [Characters, Get Character]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Found character with id
 */
router.get('/:id', getCharacter);

/**
 * @swagger
 * /characters/{id}:
 *   patch:
 *     summary: Update hit points of a character given the id
 *     description: Used to update a characters hit points <br>  <br> <strong>Heal</strong> = Positive Number <strong>E.g. hp:10</strong> <br> <strong>Damage</strong> = Negative Number <strong>E.g. hp:-10</strong>
 *     tags: [Characters, Update HP]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
*     produces:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *           type: object
 *           properties:
 *              hp:
 *                 type: integer
 *              dmgType:
 *                 type: string
 *          required: true
 *     responses:
 *       200:
 *         description: Updated hit points of character
 */
router.patch('/:id', updateCharacterHitPoints);

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Add temporary hit points  of a character given the id
 *     description: Used to add temporary hit points to a character <strong>Has to be a positive number </strong>
 *     tags: [Characters, Temp HP]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
*     produces:
 *       - application/json
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *           type: object
 *           properties:
 *              tempHp:
 *                 type: integer
 *                 minimum: 0
 *                 exclusiveMinimum: true
 *          required: true
 *     responses:
 *       200:
 *         description: Updated hit points of character
 *       500:
*         description: Something went wrong
 */
router.put('/:id', addTempHitPoints);

export default router;
