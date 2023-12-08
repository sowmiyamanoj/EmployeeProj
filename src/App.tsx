import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import AddHoliday from './holidays/AddHoliday';


import EditHoliday from './holidays/EditHoliday';
import DisplayHoliday from './holidays/DisplayHoliday';
import ReadHoliday from './holidays/ReadHolidays';


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
          {/*<Route path='/' element={<DisplayEmployee />} />
          <Route path='/AddEmployees' element={<AddEmployee />} />
  <Route path='/EditEmployee/:id' element={<EditEmployee />} />*/}
          <Route path='/' element={<DisplayHoliday/>} />
          <Route path='/AddHolidays' element={<AddHoliday />} />
          <Route path='/EditHoliday/:id' element={<EditHoliday />} />
          <Route path="/ReadHoliday/:id" element={<ReadHoliday/>} />
       
          
        </Routes>
      </Router>
  
    </>
      </div>
    </div>
  );
}

export default App;
