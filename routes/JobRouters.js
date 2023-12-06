import { Router } from "express";
const router = Router()


import { getAllJobs, getASingleJob, createAJob, editAJob, deleteAJob, showStats } from "../controllers/JobControllers.js";
import { validateJobInput, validateParam } from "../middleware/validationMiddleware.js";


// router.get('/',getASingleJob)
// router.post('/',createAJob)

//OR

router.route('/').get(getAllJobs).post(validateJobInput, createAJob)
router.route('/stats').get(showStats)
router.route('/:id').get(validateParam, getASingleJob).patch(validateJobInput, validateParam, editAJob).delete(validateParam, deleteAJob)

export default router;
