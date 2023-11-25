import "./App.css";
import { NavBar } from "./components/NavBar/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import { UserController } from "./contexts/UserContext.tsx";
import { RecentlyViewedController } from "./contexts/RecentlyViewedContext.tsx";

const App = () => {
  return (
    <UserController>
      <RecentlyViewedController>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </RecentlyViewedController>
    </UserController>
  );
};

export default App;
