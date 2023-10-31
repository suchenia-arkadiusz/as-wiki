import "./App.css";
import { NavBar } from "./components/NavBar/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";

function App() {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
