import express from "express";
import taskRoute from "./taskRoute";
import clientRoute from "./clientRoute";
import locationRoute from "./locationRoute";
import weeklyRoute from "./weeklyRoute";
import monthlyRoute from "./monthlyRoute";
import improvementRoute from "./improvementRoute";
import metricsRoute from "./metricsRoute";

const router = express.Router();

router.use("/tasks", taskRoute);
router.use("/clients", clientRoute);
router.use("/locations", locationRoute);
router.use("/weekly", weeklyRoute);
router.use("/monthly", monthlyRoute);
router.use("/improvements", improvementRoute);
router.use("/metrics", metricsRoute);

export default router;
