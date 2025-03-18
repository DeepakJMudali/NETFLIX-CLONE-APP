
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
	const { id } = useParams();
    const user = useSelector((state) => state.authUser.user);
    console.log("WatchPage ID:", id);
    console.log("User:", user);
	const [content, setContent] = useState({});
	const [loading, setLoading] = useState(true);
	const [youtubeVideoId, setYoutubeVideoId] = useState(null);

	useEffect(() => {
		const getContentDetails = async () => {
			try {
				const res = await axios.get(`/api/v4/movie/details/${id}`);
				setContent(res.data.content);

				// Fetch YouTube video for the movie title
				if (res.data.content.primaryTitle) {
					fetchYouTubeVideo(res.data.content.primaryTitle);
				}
			} catch (error) {
				if (error.message.includes("404")) {
					setContent(null);
				}
			} finally {
				setLoading(false);
			}
		};

		getContentDetails();
	}, [id]);

	// Function to fetch YouTube video based on title
	const fetchYouTubeVideo = async (title) => {
		try {
			const response = await axios.get(
				`https://www.googleapis.com/youtube/v3/search`, {
					params: {
						part: "snippet",
						q: title,  // Search query (movie title)
						key: "AIzaSyDIVzfAzvUGiM8Yo7AISjyDWlQ2ptWwCfM",  // 🔴 
						type: "video",
						maxResults: 1
					}
				}
			);

			// Extract the first video ID
			const videoId = response.data.items[0]?.id?.videoId;
			if (videoId) {
				setYoutubeVideoId(videoId);
			}
		} catch (error) {
			console.error("Error fetching YouTube video:", error);
		}
	};

	if (loading)
		return (
			<div className="min-h-screen bg-black p-10">
				<WatchPageSkeleton />
			</div>
		);

	if (!content) {
		return (
			<div className="bg-black text-white h-screen">
				<div className="max-w-6xl mx-auto">
					<Navbar />
					<div className="text-center mx-auto px-4 py-8 h-full mt-40">
						<h2 className="text-2xl sm:text-5xl font-bold text-balance">
							Content not found 😥
						</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-black min-h-screen text-white">
			<div className="mx-auto container px-4 py-8 h-full">
				<Navbar />

				{/* Video Player */}
				<div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
					{youtubeVideoId ? (
						<ReactPlayer
							controls={true}
							playing={true} 
							width={"100%"}
							height={"70vh"}
							className="mx-auto overflow-hidden rounded-lg"
							url={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
						/>
					) : (
						<h2 className="text-xl text-center mt-5">
							No trailer available for{" "}
							<span className="font-bold text-red-600">{content?.primaryTitle}</span> 😥
						</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default WatchPage;
