import { Router } from "express";

import controller from "../controllers/controller.js";
//import profListController from "../controllers/profListController.js";
//import profPageController from "../controllers/profPageController.js";

const router = Router();

router.get('/', controller.getIndex);

export default router;