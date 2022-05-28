import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';


const Shop = () => {
  return <h1>I am the shop page</h1>;
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} /> 
        <Route path='shop' element={<Shop />} />
      </Route>

      {/* the / path routes you to the home page and <Home /> 
      is the name of the element you are being routed to*/}      
      
    </Routes>
  );
};

export default App;
