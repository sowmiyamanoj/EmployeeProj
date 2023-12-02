import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AddEmployees from './Components/AddEmployees.tsx'
//import DisplayClients from './Components/DispayEmployee.tsx';
import DispayEmployee from './Components/DispayEmployee.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<DispayEmployee/>} />
        <Route path='/regForm' element={<AddEmployees/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App

