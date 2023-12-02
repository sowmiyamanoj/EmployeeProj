import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface EmployeeProps {
  employeeData;
  onSelectItem: (item: EmployeeProps) => void;
}

const DisplayEmployee: React.FC<EmployeeProps> = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  function getData() {
    fetch("http://localhost:5006/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const updateEmployee = (id) => {
    navigate("/EditEmployee/" + id);
  }
  const AddEmployees = () => {
    navigate("/AddEmployees/");
  }

  const deleteEmployee = (id) => {
    if (window.confirm('Do you want to remove?')) {
      fetch("http://localhost:5006/api/employees/" + id, {
        method: "DELETE"
      }).then((res) => {
        alert('Removed successfully.')
        window.location.reload();
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex align-items-end flex-column">
        <button className="btn btn-info" onClick={AddEmployees}> + Add Employees</button>
      </div>
      <div style={{ padding: "50px" }}>
        <table className="table table-hover table-bordered table-striped">
          <caption className="">List of Employees </caption>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Employee Age</th>
              <th>Date of Joining</th>
              <th>Employee Remarks</th>
              <th>Employee Gender</th>
              <th>Acrued Leaves</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.employeeID}</td>
                <td>{d.employeeName}</td>
                <td>{d.employeeAge}</td>
                <td>{d.employeeDOJ}</td>
                <td>{d.employeeRemarks}</td>
                <td>{d.employeeGender}</td>
                <td>{d.employeeAcuredLeaves}</td>

                <td className="d-flex justify-content-evenly">
                  <input
                    type="button"
                    className="btn btn-success"
                    onClick={() => updateEmployee(d.employeeID)}
                    value="Edit"
                  />
                  <br />
                  <input
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteEmployee(d.employeeID)}
                    value="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayEmployee;
