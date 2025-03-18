// import { useState } from "react";
// import { useContentStore } from "../store/content";
// import Navbar from "../components/Navbar";
// import { Search } from "lucide-react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const SearchPage = () => {
// 	const [activeTab, setActiveTab] = useState("searchByMovieTitle");
// 	const [searchTerm, setSearchTerm] = useState("");

// 	const [results, setResults] = useState([]);
// 	const { setContentType } = useContentStore();

// 	const handleTabClick = (tab) => {
// 		setActiveTab(tab);
// 		tab === "searchByMovieTitle" ? setContentType("movie") : setContentType("tvSeries");
// 		setResults([]);
// 	};

// 	const handleSearch = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const res = await axios.get(`/api/v4/search/${activeTab}?title=${searchTerm}`);
// 			setResults(res.data.content.results);
// 		} catch (error) {
// 			if (error.response.status === 404) {
// 				toast.error("Nothing found, make sure you are searching under the right category");
// 			} else {
// 				toast.error("An error occurred, please try again later");
// 			}
// 		}
// 	};

// 	return (
// 		<div className='bg-black min-h-screen text-white'>
// 			<Navbar />
// 			<div className='container mx-auto px-4 py-8'>
// 				<div className='flex justify-center gap-3 mb-4'>
// 					<button
// 						className={`py-2 px-4 rounded ${
// 							activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
// 						} hover:bg-red-700`}
// 						onClick={() => handleTabClick("searchByMovieTitle")}
// 					>
// 						Movies
// 					</button>
// 					<button
// 						className={`py-2 px-4 rounded ${
// 							activeTab === "tvSeries" ? "bg-red-600" : "bg-gray-800"
// 						} hover:bg-red-700`}
// 						onClick={() => handleTabClick("searchByTvSeriesTitle")}
// 					>
// 						TV Shows
// 					</button>
					
// 				</div>

// 				<form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
// 					<input
// 						type='text'
// 						value={searchTerm}
// 						onChange={(e) => setSearchTerm(e.target.value)}
// 						placeholder={"Search for a " + activeTab}
// 						className='w-full p-2 rounded bg-gray-800 text-white'
// 					/>
// 					<button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
// 						<Search className='size-6' />
// 					</button>
// 				</form>

// 				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
// 					{results.map((result) => {
// 						if (!result.primaryImage) return null;

// 						return (
// 							<div key={result.id} className='bg-gray-800 p-4 rounded'>
// 								{activeTab === "person" ? (
// 									<div className='flex flex-col items-center'>
// 										<img
// 											src={ result.primaryImage}
// 											alt={result.name}
// 											className='max-h-96 rounded mx-auto'
// 										/>
// 										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
// 									</div>
// 								) : (
// 									<Link
// 										to={"/watch/" + result.id}
// 										onClick={() => {
// 											setContentType(activeTab);
// 										}}
// 									>
// 										<img
// 											src={result.primaryImage}
// 											alt={result.title || result.name}
// 											className='w-full h-auto rounded'
// 										/>
// 										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
// 									</Link>
// 								)}
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default SearchPage;



import { useState } from "react";
import {  useDispatch } from "react-redux";
import { setContentType } from ".././actions/actions"; // Import Redux action
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const dispatch = useDispatch();
	//const contentType = useSelector((state) => state.contentType); // Get contentType from Redux store

	const [activeTab, setActiveTab] = useState("searchByMovieTitle");
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		dispatch(setContentType(tab === "searchByMovieTitle" ? "movie" : "tvSeries"));
		setResults([]);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(`/api/v4/search/${activeTab}?title=${searchTerm}`);
			setResults(res.data.content.results);
		} catch (error) {
			if (error.response?.status === 404) {
				toast.error("Nothing found, make sure you are searching under the right category");
			} else {
				toast.error("An error occurred, please try again later");
			}
		}
	};

	return (
		<div className='bg-black min-h-screen text-white'>
			<Navbar />
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-center gap-3 mb-4'>
					<button
						className={`py-2 px-4 rounded ${activeTab === "searchByMovieTitle" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
						onClick={() => handleTabClick("searchByMovieTitle")}
					>
						Movies
					</button>
					<button
						className={`py-2 px-4 rounded ${activeTab === "searchByTvSeriesTitle" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
						onClick={() => handleTabClick("searchByTvSeriesTitle")}
					>
						TV Shows
					</button>
				</div>

				<form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={"Search for a " + activeTab}
						className='w-full p-2 rounded bg-gray-800 text-white'
					/>
					<button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
						<Search className='size-6' />
					</button>
				</form>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{results.map((result) => {
						if (!result.primaryImage) return null;

						return (
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img src={result.primaryImage} alt={result.name} className='max-h-96 rounded mx-auto' />
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link to={"/watch/" + result.id} onClick={() => dispatch(setContentType(activeTab))}>
										<img src={result.primaryImage} alt={result.title || result.name} className='w-full h-auto rounded' />
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
