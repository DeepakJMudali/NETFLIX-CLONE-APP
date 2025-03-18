// import { Navigate, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/home/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import WatchPage from "./pages/WatchPage";
// import Footer from "./components/Footer";
// import { Toaster } from "react-hot-toast";
// import { useAuthStore } from "./store/authUser";
// import { useEffect } from "react";
// import { Loader } from "lucide-react";
// import SearchPage from "./pages/SearchPage";
// import SearchHistoryPage from "./pages/SearchHistoryPage";
// import NotFoundPage from "./pages/404";

// function App() {
// 	const { user, isCheckingAuth, authCheck } = useAuthStore();

// 	useEffect(() => {
// 		authCheck();
// 	}, [authCheck]);

// 	if (isCheckingAuth) {
// 		return (
// 			<div className='h-screen'>
// 				<div className='flex justify-center items-center bg-black h-full'>
// 					<Loader className='animate-spin text-red-600 size-10' />
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<>
// 			<Routes>
// 				<Route path='/' element={<HomePage />} />
// 				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
// 				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
// 				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
// 				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
// 				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
// 				<Route path='/*' element={<NotFoundPage />} />
// 			</Routes>
// 			<Footer />

// 			<Toaster />
// 		</>
// 	);
// }

// export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";


// Redux hooks
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "./actions/actions"; // Import the authCheck action

function App() {
  // Redux state: user, isCheckingAuth
  const dispatch = useDispatch();
  const { user, isCheckingAuth } = useSelector(state => state.authUser); // Accessing auth state from Redux store

  useEffect(() => {
    dispatch(authCheck()); // Dispatch authCheck action to verify user authentication status
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>  

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* If user is not logged in, redirect to login page */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
        {/* Protected routes */}
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to="/login" />} />
        {/* 404 page */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
