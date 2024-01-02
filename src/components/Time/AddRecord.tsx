import axios from "axios";
import { useEffect, useState } from "react";

function AddRecord() {
  const [employeeID, setEmployeeID] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');


  const handleCheckIn = async () => {
    if (!employeeID) {
      setValidationMessage('Please enter Employee ID');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/time/checkin', { employeeID });
      setValidationMessage('Checked in successfully');
    } catch (error) {
      console.error('Error checking in:', error);
      setValidationMessage('Your Already Check in.');
    }
  };

  const handleCheckOut = async () => {
    if (!employeeID) {
      setValidationMessage('Please enter Employee ID');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/time/checkout', { employeeID });
      setValidationMessage('Checked out successfully');
    } catch (error) {
      console.error('Error checking out:', error);
      setValidationMessage('Your Already Check Out');
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="text-center">
        <h2 className="p-4">Employee Attendance</h2>
        <p className="mb-4">Current Time: {currentTime}</p>
        <div className="mb-3">
          <input
            type="text"
            id="employeeID"
            className="form-control"
            placeholder="Enter Employee ID"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          />
          {validationMessage && (
            <p className={validationMessage.includes('successfully') ? 'text-success' : 'text-danger'}>{validationMessage}</p>
          )}
        </div>
        <button className="btn btn-primary me-2" onClick={handleCheckIn}>Check In</button>
        <button className="btn btn-secondary" onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}

export default AddRecord;