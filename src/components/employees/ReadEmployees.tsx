import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../DeleteCall.css";

const ReadEmployees: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>({});
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const updateEmployee = (id) => {
    navigate("/EditEmployee/" + id);
  }

  const confirmDelete = (id) => {
    setDeleteId(id);
  }

  const cancelDelete = () => {
    setDeleteId(null);
  }

  const executeDelete = (id) => {
    fetch("http://localhost:5006/api/employees/" + id, {
      method: "DELETE"
    })
      .then((res) => {
        setDeleteId(null);
        navigate("/DisplayEmployees");
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5006/api/employees/${id}`)
      .then((response) => {
        console.log("Fetched employee data for editing:", response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Employee Details</h3>
      <div className="card">
        <div className="card-body">
        <h5 className="card-title">Employee Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Employee ID:</strong> {employee.employeeID}
            </li>
            <li className="list-group-item">
              <strong>Name:</strong> {employee.employeeName}
            </li>
            <li className="list-group-item">
              <strong>Age:</strong> {employee.employeeAge}
            </li>
            <li className="list-group-item">
              <strong>Date of Joining:</strong> {employee.employeeDOJ}
            </li>
            <li className="list-group-item">
              <strong>Remarks:</strong> {employee.employeeRemarks}
            </li>
            <li className="list-group-item">
              <strong>Gender:</strong> {employee.employeeGender}
            </li>
            <li className="list-group-item">
              <strong>Accrued Leaves:</strong> {employee.employeeAcuredLeaves}
            </li>
          </ul>
          <div className="d-flex gap-3 ms-3 pt-3">
            <input
              type="button"
              className="btn btn-info "
              onClick={() => updateEmployee(employee.employeeID)}
              value="Edit"
            />
            <br />
            <input
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => confirmDelete(employee.employeeID)}
                    value="Delete"
                  />
          </div>
        </div>
      </div>
      {deleteId && (
        <div className="modal-background">
          <div className="modal-card">
            <div className="card-body">
              <p>Are you sure you want to delete this employee?</p>
              <div className="d-flex justify-content-evenly">
                <button className="btn btn-danger" onClick={() => executeDelete(deleteId)}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadEmployees;
