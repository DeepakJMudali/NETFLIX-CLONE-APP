import express from "express";
import {
	getMovieDetails,
	getMoviesByCategory,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/trailers", getMovieTrailers);
router.get("/details/:id", getMovieDetails);
router.get("/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;
