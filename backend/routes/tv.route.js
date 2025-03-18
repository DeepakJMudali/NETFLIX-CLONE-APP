import express from "express";
import {
	
	getTvShows,
	getPopularTvShows,
	getSimilarTvs,
	getTvsByCategory

} from "../controllers/tv.controller.js";

const router = express.Router();


router.get("/getTvShows", getTvShows);
router.get("/popularTvShows", getPopularTvShows);
router.get("/getSimilarTvs",getSimilarTvs);
router.get("/:category", getTvsByCategory);
export default router;
