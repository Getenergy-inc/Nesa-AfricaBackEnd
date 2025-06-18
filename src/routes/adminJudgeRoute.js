import express from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { 
    getJudgeDashboardStats, 
    getPaginatedApplicants, 
    searchApplicants,
    exportApplications,
    getApplicationTimelineChart,
    getApplicationGroupedChart,
    getSortedApplications,
    approveJudgeApplication,
    getJudgeApplicationById,
    denyJudgeApplication,
} from "../controllers/adminJudgeController.js";




const router = express.Router();

router.get("/judges/applicants",authenticate, isAdmin, getJudgeDashboardStats);
router.get("/judges/paginated",authenticate, isAdmin, getPaginatedApplicants);
router.get("/judges/search",authenticate, isAdmin, searchApplicants);
router.get("/judges/export",authenticate, isAdmin, exportApplications);
router.get("/judges/chart/timeline",authenticate, isAdmin, getApplicationTimelineChart);
router.get("/judges/chart/grouped",authenticate, isAdmin, getApplicationGroupedChart);
router.get("/judges/sort",authenticate, isAdmin, getSortedApplications);
router.put("/judges/approve/:id",authenticate, isAdmin, approveJudgeApplication);
router.get("/judges/application/:id",authenticate, isAdmin, getJudgeApplicationById);
router.put("/judges/denied/:id",authenticate, isAdmin, denyJudgeApplication);




export default router;
