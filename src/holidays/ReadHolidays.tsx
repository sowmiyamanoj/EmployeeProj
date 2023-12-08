import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DisplayHoliday.css";

const ReadHoliday: React.FC = () => {
  const { id } = useParams();
  const [holiday, setHoliday] = useState<any>({});
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const updateHoliday = (id) => {
    navigate("/EditHoliday/" + id);
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
        setDeleteId(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5006/api/holidays/${id}`)
      .then((response) => {
        console.log("Fetched holiday data for editing:", response.data);
        setHoliday(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hoiday data:", error);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Holiday Details</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Holiday Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Holiday ID:</strong> {holiday.holidayID}
            </li>
            <li className="list-group-item">
              <strong>Name:</strong> {holiday.holidayName}
            </li>
            <li className="list-group-item">
              <strong>Date:</strong> {holiday.holidayDateTime}
            </li>
           
          </ul>
          <br />
          <div className="d-flex gap-3">
            <input
              type="button"
              className="btn btn-success"
              onClick={() => updateHoliday(holiday.holidayID)}
              value="Edit"
            />
            <br />
            <input
              type="button"
              className="btn btn-danger"
              onClick={() => confirmDelete(holiday.holidayID)}
              value="Delete"
            />
          </div>
        </div>
      </div>
      {deleteId && (
        <div className="modal-background">
          <div className="modal-card">
            <div className="card-body">
              <p>Are you sure you want to delete this holidays?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadHoliday;
