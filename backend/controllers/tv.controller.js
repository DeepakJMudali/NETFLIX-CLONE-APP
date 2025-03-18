import { fetchFromMVDB } from "../services/mvdb.service.js";

export async function getTvShows(req, res) {
	try {
		const data = await fetchFromMVDB("https://imdb236.p.rapidapi.com/imdb/top250-tv");
		if(!data)
			{
				return 	 res.status(404).json({ success: false, message:"Tv shows not found!" });
			}
		const randomMovie = data[Math.floor(Math.random() * data?.length)];

		res.json({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}



export async function getPopularTvShows(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/most-popular-tv`);
		if(!data)
			{
				return 	 res.status(404).json({ success: false, message:"Tv shows not found!" });
			}
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSimilarTvs(req, res) {
	try {
		
		const data = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/top250-tv`);
		if(!data)
			{
				return 	 res.status(404).json({ success: false, message:"Tv shows not found!" });
			}
		console.log(data);
		const reducedData = data.slice(0, 30);
		return res.status(200).json({ success: true, similar: reducedData });
	  } catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: "Internal Server Error" });
	  }
}

export async function getTvsByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/${category}`);
		if(!data)
			{
				return 	 res.status(404).json({ success: false, message:"Tv shows not found!" });
			}
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
