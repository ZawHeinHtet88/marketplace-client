import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from "./modules/welcome/pages";
import LoginPage from "./modules/auth/page/login";
import { Provider } from "./components/provider";
import { AuthGuard } from "./middlewares/auth-guard";

function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              index
              path="/"
              element={
                <AuthGuard>
                  <WelcomePage />
                </AuthGuard>
              }
            />
            <Route path="*" element={<h3>Not Found</h3>}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
