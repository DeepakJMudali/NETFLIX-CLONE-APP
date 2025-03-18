import { User } from "../models/user.model.js";
import { fetchFromMVDB } from "../services/mvdb.service.js";


export async function autoComplete(req, res) {
	
	const{query} = req.params
	try {
		const response = await fetchFromMVDB(
			`https://imdb236.p.rapidapi.com/imdb/autocomplete?query=${query}`
		);

		if (response.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response[0].id,
					image: response[0].primaryImage,
					title: response[0].primaryTitle,
					searchType: response[0].type,
					createdAt: new Date(),
				},
			},
		});
		res.status(200).json({ success: true, content: response });
	} catch (error) {
		
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function searchTv(req, res) {
	const { title } = req.query;
	
	try {
		const response = await fetchFromMVDB(`https://imdb236.p.rapidapi.com/imdb/search?type=tvSeries&originalTitle=${title}`
		);
		console.log(res)
		if (response.length === 0) {
			return res.status(404).send({message:"Tv series not found"});
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].primaryImage,
					title: response.results[0].primaryTitle,
					searchType: response.results[0].type,
					createdAt: new Date(),
				},
			},
		});
		res.json({ success: true, content: response });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function searchMovie(req, res) {
	const { title } = req.query;
	console.log(title)
	try {
		const response = await fetchFromMVDB(
			`https://imdb236.p.rapidapi.com/imdb/search?type=movie&originalTitle=${title}`
		);

		if (response.length === 0) {
			return res.status(404).send({message:"Movie not found!"});
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].primaryImage,
					title: response.results[0].primaryTitle,
					searchType: response.results[0].type,
					createdAt: new Date(),
				},
			},
		});
		res.json({ success: true, content: response });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params;

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
