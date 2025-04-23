import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Login } from "./Login";
//import { Register } from "./Register";
import { Hrdashboard } from "./Hrdashboard";
//import { Menu } from "./Menu/Menu";
import EmployeeManagement from "./EmployeeManagement"; 
import { SkillGap } from './SkillGap';
import Projects  from './Projects';
import 'react-datepicker/dist/react-datepicker.css';
//import {NavBar} from "./Navbar/NavBar"; 
import {Feedback} from "./Feedback";
import {Workforce} from "./Workforce";
import {Settings} from "./Settings";
import {Notification} from "./Notification";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route path="/" element={<Hrdashboard/>} />
        <Route path="workforce" element={<Workforce />} />
        <Route path="skillgap" element={<SkillGap />} />
        <Route path="employeemangment" element={<EmployeeManagement />} />
        <Route path="projects" element={<Projects />} />
        <Route path="settings" element={<Settings/>}/>
        <Route path="feedback" element={<Feedback/>}/>
        <Route path="notification" element={<Notification/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
