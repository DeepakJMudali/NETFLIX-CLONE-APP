import { fetchFromMVDB } from "../services/mvdb.service.js";


export async function getTrendingMovie(req, res) {
	try {
		const data = await fetchFromMVDB("https://imdb236.p.rapidapi.com/imdb/india/trending-tamil");
		 const randomMovie = data[Math.floor(Math.random() * data?.length)];
		if(!data)
		{
			return 	 res.status(404).json({ success: false, message:"Movie not found!" });
		}
		 res.json({ success: true, results: randomMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMovieTrailers(req, res) {

	try {
		const data = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/upcoming-releases?countryCode=IN&type=MOVIE`);
		if(!data)
			{
				return 	res.status(404).json({ success: false, message:"Movie trailors not found!" });
			}
	
	 res.json({ success: true, trailers: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMovieDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/${id}`);
		if(!data)
			{
				return 	 res.status(404).json({ success: false, message:"Movie not found for details!" });
			}
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
export async function getSimilarMovies(req, res) {
	try {
	
	  const data = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/top250-movies`);
	  console.log(data);
	  const reducedData = data.slice(0, 30);
	  return res.status(200).json({ success: true, similar: data });
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({ success: false, message: "Internal Server Error" });
	}
  }
  
export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/${category}`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
