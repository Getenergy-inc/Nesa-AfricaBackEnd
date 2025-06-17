import express from "express";
import {
  getNominationDashboardStats,
  getPaginatedNominations,
  searchNominations,
  getNominationTimelineChart,
  getNominationGroupedPieChart,
  exportNominations,
  getSortedNominations,
} from "../controllers/adminNominationController.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";



const router = express.Router();

router.get("/nominations", authenticate, isAdmin, getNominationDashboardStats);
router.get("/nominations/paginated",authenticate, isAdmin, getPaginatedNominations);
router.get("/nominations/search",authenticate, isAdmin, searchNominations);
router.get("/nominations/export",authenticate, isAdmin, exportNominations);
router.get("/nomination/chart/timeline",authenticate, isAdmin, getNominationTimelineChart);
router.get("/nomination/chart/grouped",authenticate, isAdmin, getNominationGroupedPieChart);
router.get("/nomination/sort",authenticate, isAdmin, getSortedNominations);



export default router;
