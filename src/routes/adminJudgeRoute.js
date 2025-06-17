import express from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { 
    getJudgeDashboardStats, 
    getPaginatedApplicants, 
    searchApplicants,
    exportApplications,
    getApplicationTimelineChart,
    getApplicationGroupedChart,
    getSortedApplications
} from "../controllers/adminJudgeController.js";




const router = express.Router();

router.get("/judges/applicants",authenticate, isAdmin, getJudgeDashboardStats);
router.get("/judges/paginated",authenticate, isAdmin, getPaginatedApplicants);
router.get("/judges/search",authenticate, isAdmin, searchApplicants);
router.get("/judges/export",authenticate, isAdmin, exportApplications);
router.get("/judges/chart/timeline",authenticate, isAdmin, getApplicationTimelineChart);
router.get("/judges/chart/grouped",authenticate, isAdmin, getApplicationGroupedChart);
router.get("/judges/sort",authenticate, isAdmin, getSortedApplications);





export default router;
