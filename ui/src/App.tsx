import "./App.css";
import { NavBar } from "./components/NavBar/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext.tsx";
import ProjectsPage from "./pages/Projects/ProjectsPage.tsx";
import ProjectPage from "./pages/Projects/ProjectPage.tsx";

const App = () => {
  return (
    <UserProvider>
      <RecentlyViewedProvider>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </RecentlyViewedProvider>
    </UserProvider>
  );
};

export default App;
