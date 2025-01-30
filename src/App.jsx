import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/DetailPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";

function App() {
  const authUser = useSelector((state) => state.authUser || null);
  const isPreload = useSelector((state) => state.isPreload || false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const handleSignOut = () => dispatch(asyncUnsetAuthUser());

  if (isPreload) {
    return <Loading />;
  }

  const renderRoutes = () => {
    if (authUser === null) {
      return (
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads/:id" element={<DetailPage />} />
      </Routes>
    );
  };

  return (
    <>
      <Loading />
      <div className="app-container">
        {authUser && (
          <header>
            <Navigation authUser={authUser} signOut={handleSignOut} />
          </header>
        )}
        <main>{renderRoutes()}</main>
      </div>
    </>
  );
}

export default App;
