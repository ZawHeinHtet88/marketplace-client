import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../src/lib/i18n';
import { Layout } from "./components/layout";
import { Provider } from "./components/provider";
import LoginPage from "./modules/auth/page/login";
import { MerchantPage } from "./modules/merchants/pages";
import { WelcomePage } from "./modules/welcome/pages";


function App() {

  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout/>}>
              <Route index path="/" element={<WelcomePage />} />
              <Route index path="/merchants/:id" element={<MerchantPage />} />
              <Route path="*" element={<h3>Not Found</h3>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
