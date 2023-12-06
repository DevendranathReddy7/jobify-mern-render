import { Router } from "express";
const router = Router()
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userControllers.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorisePermission } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMIddleware.js";

router.get('/current-user', getCurrentUser)
//router.get('/admin/app-stats', [authorizePermissions('admin'),getApplicationStats,]);
router.get('/admin/app-stats', getApplicationStats)
router.patch('/update-user', upload.single('avatar'), validateUpdateUserInput, updateUser)
export default router;