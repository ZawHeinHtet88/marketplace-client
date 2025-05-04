import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from "./modules/welcome/pages";
import LoginPage from "./modules/auth/page/login";
import { Provider } from "./components/provider";
import { AuthGuard } from "./middlewares/auth-guard";
import { Layout } from "./components/layout";
import '../src/lib/i18n' 


function App() {

  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout/>}>
              <Route index path="/" element={<WelcomePage />} />
              <Route path="*" element={<h3>Not Found</h3>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
