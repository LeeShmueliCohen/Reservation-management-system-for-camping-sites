import { Route, Routes } from 'react-router-dom';

import Sites from './components/Sites/Sites';
import FloatingButton from './components/Accessibility/FloatingButton';
import NotFound from './pages/NotFound';
import Info from './pages/Info';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsUse from "./pages/TermsUse";
import Cart from './components/Cart/Cart';
import Home from './components/UI/Home';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Checkout from './components/Checkout/Checkout';
import Confirm from './components/Checkout/Confirm';
import MiniCart from './components/Cart/MiniCart';
import React from 'react';


function App() {
  return (
    <>
      <div style={{ height: '4.2rem' }}></div>

      <Header />
      <FloatingButton />
      <MiniCart />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Info" element={<Info />} />
          <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="TermsUse" element={<TermsUse />} />
          <Route
            path="/:campingName/:siteId"
            element={
              <>
                <Sites />
              </>
            }
          />
          <Route
            path="Cart"
            element={
              <>
                <Cart />
              </>
            }
          />
          <Route
            path="checkout"
            element={
              <>
                <Checkout />
              </>
            }
          />
          <Route
            path="checkout/confirm/:bookingId"
            element={
              <>
                <Confirm />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
