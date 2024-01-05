import axios from "axios";
import { useEffect, useState } from "react";

function AddRecord() {
  const [employeeID, setEmployeeID] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  const  Backend =`https://thaydb.vercel.app`
  
  const handleCheckIn = async () => {
    if (!/^\d+$/.test(employeeID)) {
      setValidationMessage('Please enter a valid Employee ID ');
      return;
    }
    try {
      // Perform check-in
      await axios.post(`${Backend}/api/time/checkin`, { employeeID });
      setValidationMessage('Checked in successfully');
    } catch (error) {
      console.error('Error checking in:', error);
      setValidationMessage('Your Already CheckIn for Today');
    }
  };

  const handleCheckOut = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    try {
      // Fetch existing check-out record for today
      const response = await axios.get(`${Backend}/api/time/${employeeID}/${currentDate}`);
      if (response.data.length > 0 && response.data[0].checkOutDateTime !== null) {
        setValidationMessage('Your Already Checked Out for Today');
        return;
      }
    } catch (error) {
      console.error('Error fetching check-out details:', error);
      setValidationMessage('Failed to check out. Please try again.');
      return;
    }
  
    try {
      // Perform check-out
      await axios.post(`${Backend}/api/time/checkout`, { employeeID });
      setValidationMessage('Checked out successfully');
    } catch (error) {
      console.error('Error checking out:', error);
      setValidationMessage('Failed to check out. Please try again.');
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