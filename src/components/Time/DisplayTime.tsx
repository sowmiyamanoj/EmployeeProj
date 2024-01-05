import { useEffect, useState } from "react";

const AttendanceRecord = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchEmployeeID, setSearchEmployeeID] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Backend = `http://localhost:5000`;

  const handleSearch = () => {
    setErrorMessage(null);

    let url = `${Backend}/api/time`;

    if (searchEmployeeID !== null) {
      url += `/${searchEmployeeID}`;

      if (startDate !== null) {
        url += `/${startDate}`;

        if (endDate !== null) {
          url += `/${endDate}`;
        }
      }
    } else if (startDate !== null) {
      url += `/date/${startDate}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid Input');
        }
        return res.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const clearSearchCriteria = () => {
    setSearchEmployeeID(null);
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    handleSearch();
  }, [searchEmployeeID, startDate, endDate]);

  return (
    <>
      <div style={{ padding: "50px" }}>
        <div className="search-section d-flex gap-1">
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={searchEmployeeID || ''}
            onChange={(e) => setSearchEmployeeID(Number(e.target.value))}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={clearSearchCriteria} className="btn btn-secondary ms-2">Clear</button>
        </div>
        {errorMessage && <div className="mt-2" style={{ color: "red" }}>{errorMessage}</div>}

        <table className="table table-hover table-bordered table-striped text-center mt-4">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>CheckInDateTime</th>
              <th>CheckOutDateTime</th>
              <th>totalWorkingHours</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.employeeID}</td>
                <td>{d.date}</td>
                <td>{d.checkInDateTime}</td>
                <td>{d.checkOutDateTime}</td>
                <td>{d.totalWorkingHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </>
  );
};

export default AttendanceRecord;