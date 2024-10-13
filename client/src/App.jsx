import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
  Link,
  Navigate,
} from "react-router-dom";
import Locations from "./pages/Locations";
import LocationEvents from "./pages/LocationEvents";
import Events from "./pages/Events";
import "./App.css";

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Locations />,
    },
    {
      path: "/:id",
      element: <LocationEvents />,
    },
    {
      path: "/events",
      element: <Events />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return element;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="main-header">
          <h1>UnityGrid Plaza</h1>
          <div className="header-buttons">
            <Link to="/" role="button">
              Home
            </Link>
            <Link to="/events" role="button">
              Events
            </Link>
          </div>
        </header>
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;
