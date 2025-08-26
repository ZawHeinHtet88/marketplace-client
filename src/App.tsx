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
import { AuthGuard } from "./middlewares/auth-guard";
import SignupPage from "./modules/auth/page/singup";
import OrderListPage from "./modules/orders/pages/order-list";
import PaymentSuccessPage from "./modules/cart/pages/payment-success";
import OrderDetails from "./modules/orders/pages/order-details";
import CustomerSupportPage from "./modules/supports/pages";
import ProfilePage from "./modules/profile/pages";

function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              element={
                <AuthGuard>
                  <Layout />
                </AuthGuard>
              }
            >
              <Route index path="/" element={<WelcomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/merchants" element={<MerchantListPage />} />
              <Route path="/merchants/:id" element={<MerchantPage />} />
              <Route path="/orders" element={<OrderListPage />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/supports" element={<CustomerSupportPage/>} />
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="*" element={<h3>Not Found</h3>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
