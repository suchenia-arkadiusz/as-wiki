import "./App.css";
import { NavBar } from "./components/NavBar/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext.tsx";
import ProjectsPage from "./pages/Projects/ProjectsPage.tsx";
import ProjectPage from "./pages/Projects/ProjectPage.tsx";
import { ProjectsContextLayout } from "./contexts/ProjectsContext.tsx";
import { useToasterContext } from "./contexts/ToasterContext.tsx";
import { RestApiProvider } from "./contexts/RestApiContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const App = () => {
  const { toasters } = useToasterContext();

  return (
    <RestApiProvider>
      <UserProvider>
        <AuthProvider>
          <RecentlyViewedProvider>
            {toasters.map((toaster) => toaster)}
            <NavBar />
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route element={<ProjectsContextLayout />}>
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectPage />} />
                </Route>
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </div>
          </RecentlyViewedProvider>
        </AuthProvider>
      </UserProvider>
    </RestApiProvider>
  );
};

export default App;
