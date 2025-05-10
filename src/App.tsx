import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/lib/i18n";
import { Layout } from "./components/layout";
import { Provider } from "./components/provider";
import LoginPage from "./modules/auth/page/login";
import { MerchantPage } from "./modules/merchants/pages";
import { WelcomePage } from "./modules/welcome/pages";
import ProductListPage from "./modules/products/pages/product-list";
import ProductDetailPage from "./modules/products/pages/product-details";
import MerchantListPage from "./modules/merchants/pages/merchantList";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route index path="/" element={<WelcomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/merchants" element={<MerchantListPage />} />
              <Route path="/merchants/:id" element={<MerchantPage />} />
              <Route path="*" element={<h3>Not Found</h3>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Toaster/>
    </>
  );
}

export default App;
