import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from 'react-router-dom';

import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";

const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Navigation = lazy(() => import ('./routes/navigation/navigation.component'));
const Shop = lazy(() => import ('./routes/shop/shop.component'));
const Checkout = lazy(() => import ('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]); 
  //dispatch doesnt change. aka useEffect will still only run on mount

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} /> 
          {/*  the /* means you set up further routes in shop */}
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>

        {/* the / path routes you to the home page and <Home /> 
        is the name of the element you are being routed to by default aka index*/}      
        
      </Routes>
    </Suspense>
  );
};

export default App;
