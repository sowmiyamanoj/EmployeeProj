import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmployee from './employees/AddEmployees'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayEmployee from './employees/DispayEmployees'
import EditEmployee from './employees/EditEmployees';

function App() {
  
  return (
    <div>
      <div className='d-flex justify-content-center p-3' style={{background:"lightblue"}} >
      <h1>Thay Technology</h1>
      </div>
      <div className='p-5'>
      <>
      <Router>
        <Routes>
          <Route path='/' element={<DisplayEmployee />} />
          <Route path='/AddEmployees' element={<AddEmployee />} />
          <Route path='/EditEmployee/:id' element={<EditEmployee />} />
        </Routes>
      </Router>
    </>
      </div>
    </div>
  );
}

export default App;
