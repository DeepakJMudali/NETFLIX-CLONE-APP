import express from "express";
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	autoComplete,
	searchTv,
	searchMovie
} from "../controllers/search.controller.js";

const router = express.Router();


router.get("/autocomplete/:query", autoComplete);
router.get("/searchByTvSeriesTitle", searchTv);
router.get("/searchByMovieTitle", searchMovie);
router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
