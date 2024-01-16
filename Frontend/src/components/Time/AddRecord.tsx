import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";

function AddRecord() {
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  const { token } = useAuth();

  const Backend = `https://thaydb.vercel.app/api`;

  const handleCheckIn = async () => {
    try {
      // Perform check-in
      await axios.post(`${Backend}/time/checkin`,{},
      { headers: {
        Authorization: `Bearer ${token}`,
        }});
      setValidationMessage('Checked in successfully');
    } catch (error) {
      console.error('Error checking in:', error);
      setValidationMessage('Your Already Checked In for Today');
    }
  };

  const handleCheckOut = async () => {
    try {
      // Perform check-out
      await axios.post(`${Backend}/time/checkout`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }});
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
    <div className="App d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="text-center">
        <h2 className="p-3">Employee Attendance</h2>
        <p className="mb-2">Current Time: {currentTime}</p>
        <p style={{marginBottom:"20px",fontSize:"80%", opacity:"85%"}} >
          Disclaimer: Per day, you are allowed to perform a single check-in and checkout.
        </p>
        <div className="mb-3">
          {validationMessage && (
            <p className={validationMessage.includes('successfully') ? 'text-success' : 'text-danger'}>
              {validationMessage}
            </p>
          )}
        </div>
        <button className="btn btn-primary me-2" onClick={handleCheckIn}>
          Check In
        </button>
        <button className="btn btn-secondary" onClick={handleCheckOut}>
          Check Out
        </button>
        
      </div>
      <style>
      {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
      `}
    </style>
    </div>
  );
}

export default AddRecord;
