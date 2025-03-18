// import { useAuthStore } from "../../store/authUser";
// import AuthScreen from "./AuthScreen";
// import HomeScreen from "./HomeScreen";

// const HomePage = () => {
// 	const { user } = useAuthStore();

// 	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
// };
// export default HomePage;

import { useSelector } from "react-redux";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
	const user = useSelector((state) => state.authUser.user);
	console.log("user",user)
	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
