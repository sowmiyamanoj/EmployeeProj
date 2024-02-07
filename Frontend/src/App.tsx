import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmployee from './components/employees/DisplayEmployees'
import Navbar from './components/nav/Navbar';
import Home from './components/Home';
import AddEmployees from './components/employees/AddEmployees';
import EditEmployee from './components/employees/EditEmployees';
import ReadEmployees from './components/employees/ReadEmployees';
import ReadRole from './components/role/ReadRole';
import EditRole from './components/role/EditRole';
import AddRole from './components/role/AddRole';
import DisplayHoliday from './components/holidays/DisplayHoliday';
import EditHoliday from './components/holidays/EditHoliday';
import AddHoliday from './components/holidays/AddHoliday';
import AboutUs from './components/AboutUs';
import LearnMore from './components/LearnMore';
import DisplayTime from './components/Time/DisplayTime';
import ContactUs from './components/Contact';
import AddRecord from './components/Time/AddRecord';
import "./components/Deletecall.css";
import PaySlip from './components/payslip/PaySlip';
import Login from './components/login/Login';
import { AuthProvider } from './components/login/AuthContext';
import SignUp from './components/login/Signup';
import ProtectedRoute from './components/login/ProtectedRoute'

function App() {
  const protectedRoutes = [
    { path: '/DisplayEmployees', component: DisplayEmployee, allowedRoles: ['admin', 'superuser'] },
    { path: '/AddEmployee', component: AddEmployees, allowedRoles: ['admin'] },
    { path: '/EditEmployee/:id', component: EditEmployee, allowedRoles: ['admin'] },
    { path: '/ReadEmployee/:id', component: ReadEmployees, allowedRoles: ['admin', 'employee' , 'superuser'] },
    { path: '/ReadRole', component: ReadRole, allowedRoles: ['admin', 'superuser'] },
    { path: '/DisplayHolidays', component: DisplayHoliday, allowedRoles: ['admin', 'employee', 'superuser'] },
    { path: '/DisplayTime', component: DisplayTime, allowedRoles: ['admin', 'superuser'] },
    { path: '/AddRole', component: AddRole, allowedRoles: ['admin'] },
    { path: '/EditRole/:id', component: EditRole, allowedRoles: ['admin'] },
    { path: '/AddHoliday', component: AddHoliday, allowedRoles: ['admin'] },
    { path: '/EditHoliday/:id', component: EditHoliday, allowedRoles: ['admin'] },
    { path: '/AttendanceSheet', component: AddRecord, allowedRoles: ['admin', 'employee' , 'superuser'] },
    { path: '/PaySlip', component: PaySlip, allowedRoles: ['admin', 'superuser'] },
  ];

  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='*' element={<Home />} />
            {protectedRoutes.map(({ path, component: Component, allowedRoles }) => (
              <Route key={path} path={path} element={<ProtectedRoute allowedRoles={allowedRoles}><Component /></ProtectedRoute>} />
            ))}
            <Route path='/learnMore' element={<LearnMore />} />
            <Route path='/ContactUs' element={<ContactUs />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;