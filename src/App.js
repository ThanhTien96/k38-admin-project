import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTemplate from "./templates/MainTemplate";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { PAGE_PATH } from "./constants/pagePath";
import LoginPage from "./pages/LoginPage";
import Singup from "./pages/Singup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainTemplate />}>
          <Route index path={PAGE_PATH.home} element={<HomePage />} />
          <Route path={PAGE_PATH.user} element={<UserPage />} />
        </Route>

        <Route path={PAGE_PATH.login} element={<LoginPage />} />
        <Route path={PAGE_PATH.singup} element={<Singup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
