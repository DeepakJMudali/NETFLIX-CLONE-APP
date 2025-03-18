// import { useEffect, useState } from "react";
// import { useContentStore } from "../store/content";
// import axios from "axios";

// const useGetTrendingContent = () => {
// 	const [trendingContent, setTrendingContent] = useState(null);
// 	const { contentType } = useContentStore();

// 	useEffect(() => {
// 		const getTrendingContent = async () => {
// 			const res = await axios.get(`/api/v4/${contentType}/trending`);
// 			console.log(res)
// 			setTrendingContent(res.data.results);
// 		};

// 		getTrendingContent();
// 	}, [contentType]);

// 	return { trendingContent };
// };
// export default useGetTrendingContent;

import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


const useGetTrendingContent = () => {

  const [trendingContent, setTrendingContent] = useState(null);
	const contentType = useSelector((state) => state.content.contentType);

	useEffect(() => {
		const getTrendingContent = async () => {
			try {
				const res = await axios.get(`/api/v4/${contentType}/trending`);
				console.log(res?.data?.results);
        setTrendingContent(res?.data?.results);
			
			} catch (error) {
				console.error("Error fetching trending content:", error);
			}
		};

		getTrendingContent();
	}, [contentType]);

	return  trendingContent ;
};

export default useGetTrendingContent;
