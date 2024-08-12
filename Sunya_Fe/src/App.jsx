// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ControlledCarousel from './Components/ControlledCarousel/ControlledCarousel';
import Header from './Components/Header/Header';
import Cards from './Components/Cards/Cards';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import WhatsAppIcon from './Components/WhatsAppIcon/WhatsAppIcon';
import HomeProducts from './Components/HomeProducts/HomeProducts';
import ProductScreen from './Components/Product/ProductScreen';
import Cart from './Components/Cart/Cart';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress';
import PaymentMethod from './Components/PaymentMethod/PaymentMethod';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import Order from './Components/Order/Order';
import OrderHistoryUser from './Components/OrderHistoryUser/OrderHistoryUser';
import { Dashboard } from './Components/Dashboard/Dashboard';
import Users from './Components/Users/Users';
import TableUsersOrders from './Components/TableUsersOrders/TableUsersOrders';
import ProductList from './Components/ProductList/ProductList';
import CustomerData from './Components/CustomerData/CustomerData';
import PlaceOrderStore from './Components/PlaceOrderStore/PlaceOrderStore';
import OrderStore from './Components/OrderStore/OrderStore';
import AssignStock from './Components/AssignStock/AssignStock';
import AssignCashiersToStore from './Components/AssignCashiersToStore/AssignCashiersToStore';
import SocialMediaBanner from './Components/SocialMediaBanner/SocialMediaBanner';
//import UpLoadImage from './Components/UpLoadImage/UpLoadImage';
import Store from './Components/Store/Store';
import CompanyMissionVision from './Components/CompanyMissionVision/CompanyMissionVision';
import CompanyHistory from './Components/CompanyHistory/CompanyHistory';
import TableDeliverys from './Components/TableDeliverys/TableDeliverys';
import TablePays from './Components/TablePays/TablePays';
import PartnersList from './Components/PartnersList/PartnersList';
import CreateInvoice from './Components/Invoice/CreateInvoice/CreateInvoice';
import TypeInvoices from './Components/TypeInvoices/TypeInvoices';
import TableListInvoices from './Components/TableListInvoices/TableListInvoices';
import Customers from './Components/Customers/Customers';
import Loading from './Components/Loading/Loading'; // Importa el componente de carga

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  // eslint-disable-next-line react/prop-types
  const MainContainer = ({ children }) => (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );

  const HomeRoute = () => (
    <MainContainer>
      {/* <ControlledCarousel /> */}
      <HomeProducts/>
      {/* <Cards /> */}
      {/* <CompanyHistory /> */}
      {/* <CompanyMissionVision /> */}
      {/* <SocialMediaBanner /> */}
      {/* <Store /> */}
      {/* <UpLoadImage /> */}
      {/* <TiendaOnLineIcon /> */}
      <WhatsAppIcon />
    </MainContainer>
  );

  return (
    <BrowserRouter>
      {loading ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route
            path="/login"
            component={() => (
              <MainContainer>
                <Login />
              </MainContainer>
            )}
          />
          <Route
            path="/registrar"
            component={() => (
              <MainContainer>
                <SignUp />
              </MainContainer>
            )}
          />
          <Route
            path="/products"
            component={() => (
              <MainContainer>
                <HomeProducts />
                <WhatsAppIcon />
              </MainContainer>
            )}
          />
          <Route
            path="/carousel_products"
            component={() => (
              <MainContainer>
                <Cards />
                <WhatsAppIcon />
              </MainContainer>
            )}
          />
          <Route
            path="/partner"
            component={() => (
              <MainContainer>
                <Store />
                <WhatsAppIcon />
              </MainContainer>
            )}
          />
          <Route
            path="/company"
            component={() => (
              <MainContainer>
                <CompanyHistory />
                {/* <CompanyMissionVision /> */}
                <WhatsAppIcon />
              </MainContainer>
            )}
          />
          <Route
            path="/social"
            component={() => (
              <MainContainer>
                <SocialMediaBanner />
                <WhatsAppIcon />
              </MainContainer>
            )}
          />
          <Route
            path="/product/:id_product"
            component={() => (
              <MainContainer>
                <ProductScreen />
              </MainContainer>
            )}
          />
          <Route
            path="/cart"
            component={() => (
              <MainContainer>
                <Cart />
              </MainContainer>
            )}
          />
          <Route
            path="/shipping"
            component={() => (
              <MainContainer>
                <ShippingAddress />
              </MainContainer>
            )}
          />
          <Route
            path="/shipping2"
            component={() => (
              <MainContainer>
                <CustomerData />
              </MainContainer>
            )}
          />
          <Route
            path="/payment"
            component={() => (
              <MainContainer>
                <PaymentMethod />
              </MainContainer>
            )}
          />
          <Route
            path="/placeorder"
            component={() => (
              <MainContainer>
                <PlaceOrder />
              </MainContainer>
            )}
          />
          <Route
            path="/placeorderstore"
            component={() => (
              <MainContainer>
                <PlaceOrderStore />
              </MainContainer>
            )}
          />
          <Route
            path="/order/:id"
            component={() => (
              <MainContainer>
                <Order />
              </MainContainer>
            )}
          />
          <Route
            path="/orderstore/:id"
            component={() => (
              <MainContainer>
                <OrderStore />
              </MainContainer>
            )}
          />
          <Route
            path="/orderhistory"
            component={() => (
              <MainContainer>
                <OrderHistoryUser />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/dashboard"
            component={() => (
              <MainContainer>
                <Dashboard />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/users"
            component={() => (
              <MainContainer>
                <Users />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/customers"
            component={() => (
              <MainContainer>
                <Customers/>
              </MainContainer>
            )}
          />
          <Route
            path="/admin/orders"
            component={() => (
              <MainContainer>
                <TableUsersOrders />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/deliverys"
            component={() => (
              <MainContainer>
                <TableDeliverys />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/pays"
            component={() => (
              <MainContainer>
                <TablePays />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/products"
            component={() => (
              <MainContainer>
                <ProductList />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/product/:id"
            component={() => (
              <MainContainer>
                <ProductList />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/partners"
            component={() => (
              <MainContainer>
                <PartnersList />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/stockStores"
            component={() => (
              <MainContainer>
                <AssignStock />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/casherStore"
            component={() => (
              <MainContainer>
                <AssignCashiersToStore />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/invoice"
            component={() => (
              <MainContainer>
                <CreateInvoice />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/invoice_type"
            component={() => (
              <MainContainer>
                <TypeInvoices />
              </MainContainer>
            )}
          />
          <Route
            path="/admin/invoices_list"
            component={() => (
              <MainContainer>
                <TableListInvoices />
              </MainContainer>
            )}
          />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
