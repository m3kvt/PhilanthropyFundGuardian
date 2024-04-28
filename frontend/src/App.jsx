
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
// import './App.css'
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import Donation from "./pages/Donation";
import DonationForm from "./components/DonationForm/DonationForm";
import Login from "./components/Login/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import DonorList from "./pages/DonorList";
import GirlChild from "./components/ApplyForm/GirlChild";
import GirlChildDocuments from "./components/ApplyForm/GirlChildDocuments";
import DisplayId from "./components/ApplyForm/DisplayId";
import ApplicantList from "./pages/ApplicantList";
import ApplicationStatus from "./pages/ApplicationStatus";
import CauseAmount from "./pages/CauseAmount";
import Disability from "./components/ApplyForm/Disability";
import DisabilityDocuments from "./components/ApplyForm/DisabilityDocuments";
import WaitingList from "./pages/WaitingList";

const App = () => {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/:name" element={<Home />}></Route>
        <Route path="/signin" element={<Login/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/apply" element={<Apply/>}></Route>
        <Route path="/apply/1" element={<GirlChild/>}></Route>
        <Route path="/apply/1/:applicationId" element={<GirlChildDocuments/>}></Route>
        <Route path="/apply/2" element={<Disability/>}></Route>
        <Route path="/apply/2/:applicationId" element={<DisabilityDocuments/>}></Route>
        <Route path="/apply/display/:applicationId" element={<DisplayId/>}></Route>
        <Route path="/donate" element={<Donation/>}></Route>
        <Route path="/donate/:name/:causeId" element={<DonationForm/>}></Route>
        <Route path="/profile/:name" element={<Profile/>}></Route>
        <Route path="/adminlogin" element={<AdminLogin/>}></Route>
        <Route path="/admin/:name" element={<Admin/>}></Route>
        <Route path="/display/donor/:causeId" element={<DonorList/>}></Route>
        <Route path="/display/apply/:causeId" element={<ApplicantList/>}></Route>
        <Route path="/display/cause/:causeId" element={<CauseAmount/>}></Route>
        <Route path="/applicationstatus" element={<ApplicationStatus/>}></Route>
        <Route path="/display/waiting/:causeId" element={<WaitingList/>}></Route>

      </Routes>
      
    </Router>
  );
};
export default App;
