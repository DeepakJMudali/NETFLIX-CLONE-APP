import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromMVDB= async (url) => {
	const options = {
		headers: {
			'x-rapidapi-key': ENV_VARS.RAPID_API_KEY,
			'x-rapidapi-host': 'imdb236.p.rapidapi.com'
		  },
		
		
	};

	const response = await axios.get(url, options);
		console.log(url)
	if (response.status !== 200) {
		throw new Error("Failed to fetch data from IMDB" + response.statusText);
	}

	return response.data;
};
