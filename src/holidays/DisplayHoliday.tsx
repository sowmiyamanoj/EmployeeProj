import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface HolidayProps {
  holidayData;
  onSelectItem: (item: HolidayProps) => void;
}

const DisplayHoliday: React.FC<HolidayProps> = () => {
  const [data, setData] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  function getData() {
    fetch("http://localhost:5006/api/holidays")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const readHoliday = (id) => {
    navigate("/ReadHoliday/" + id);
  }

  const confirmDelete = (id) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }

  const executeDelete = (id) => {
    fetch("http://localhost:5006/api/holidays/" + id, {
      method: "DELETE"
    })
      .then((res) => {
        getData();
        setDeleteId(null);
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  const AddHolidays = () => {
    navigate("/AddHolidays/");
  }

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
       <div className="d-flex align-items-end flex-column">
        <button className="btn btn-info" onClick={AddHolidays}> + Add Hoidays</button>
      </div>
      <div style={{ padding: "50px" }}>
        <table className="table table-hover table-bordered table-striped text-center">
          <caption className="">List of Holidays </caption>
          <thead>
            <tr>
              <th>Holiday ID</th>
              <th>Holiday Name</th>
              <th>Holiday Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.holidayID}</td>
                <td>{d.holidayName}</td>
                <td>{d.holidayDateTime}</td>
                <td className="d-flex justify-content-evenly">
                  <input
                    type="button"
                    className="btn btn-success"
                    onClick={() => readHoliday(d.holidayID)}
                    value="View details"
                  />
                  <br />
                  <input
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(d.hoidayID)}
                    value="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <div className="modal-background">
          <div className="modal-card">
            <div className="card-body">
              <p>Are you sure you want to delete this employee?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayHoliday;
