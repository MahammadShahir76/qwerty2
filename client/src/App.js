import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProviderInfo from './Components/ProviderInfo';
import UpiPayment from './Components/UpiPayment';
import TakerInfo from './Components/TakerInfo';
import CategorySelection from './Components/CategorySelection';
import Plumbers from './Components/Categories/Plumbers';
import ServiceProviderCategory from './Components/ServiceProviderCategory';
import Plumbers1 from './Components/ProviderDomain/Plumbers1';
import NextTakerInfo from './Components/NextTakerInfo';
import ProvideReview from './Components/ProvideReview';
import Location from './Components/Location';
import ShowReviews from './Components/ShowReviews';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Nav from './Components/Nav';
import VideoTaker from './Components/VideoComponents/VideoTaker';
import VideoTakerInfo from './Components/VideoComponents/VideoTakerInfo';

function App() {
  return (
<div>
  <BrowserRouter>
  <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/ProviderInfo" element={<ProviderInfo/>}></Route>
      <Route path="/TakerInfo" element={<TakerInfo/>}></Route>
      <Route path="/CategorySelection" element={<CategorySelection/>}></Route>

      <Route path="/PlumberInterest" element={<Plumbers/>}></Route>


      <Route path="/SeeProviders" element={<ServiceProviderCategory/>}></Route>
      <Route path="/PlumbersDetails" element={<Plumbers1/>}></Route>



      <Route path="/nextTakerInfo" element={<NextTakerInfo/>}></Route>


      {/* this is the route to add reviews */}
      <Route path="/add-Review" element={<ProvideReview/>}></Route>
      <Route path="/show-reviews" element={<ShowReviews/>}></Route>

      <Route path="/UPI" element={<UpiPayment/>}></Route>
      <Route path="/location" element={<Location/>}></Route>


      <Route path="/VideoTaker" element={<VideoTaker/>}></Route>
      <Route path="/VideoTakerInfo" element={<VideoTakerInfo/>}></Route>


      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>

    </Routes>
  </BrowserRouter>
</div>
  );
}

export default App;
