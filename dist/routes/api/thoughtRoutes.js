import { Router } from 'express';
import { getThoughts, createThoughts, getSingleThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';
const router = Router();
// localhost/api/thoughts/
router.route('/').get(getThoughts).post(createThoughts);
// localhost/api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// localhost/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);
export default router;
