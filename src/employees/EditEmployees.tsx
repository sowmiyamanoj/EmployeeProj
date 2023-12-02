import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee: React.FC = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState<any>({});
    const navigate = useNavigate();
    
    
    useEffect(() => {
        axios.get(`http://localhost:5006/api/employees/${id}`)
          .then((response) => {
            console.log("Fetched employee data for editing:", response.data);
            setEmployee(response.data);
          })
          .catch((error) => {
            console.error("Error fetching employee data:", error);
          });
      }, [id]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
      };

      const [errorMsg, setErrorMsg] = useState({});
      const updateEmployee = (e: React.FormEvent) => {
        e.preventDefault();

        axios.put(`http://localhost:5006/api/employees/${id}`, employee)
          .then((response) => {
            console.log("Updated employee:", response.data);
            navigate('/')
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
          });
      };

    

  return (
    <div className="container border p-4 rounded">
      <h3 className="mb-4">Edit Employee</h3>
      <form className="row g-3" onSubmit={updateEmployee}>
        <div className="col-md-6">
          <label htmlFor="Id" className="form-label">
            Employee ID
          </label>
          <input
            type="Id"
            className="form-control"
            id="Id"
            required
            name="employeeID"
            readOnly
            value={employee.employeeID}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="empName" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            id="empName"
            name="employeeName"
            required
            value={employee.employeeName}
            onChange={handleChange}
          />
          {errorMsg && <span>{errorMsg.employeeName}</span>}
        </div>
        <div className="col-md-6">
          <label htmlFor="age" className="form-label">
            Employee Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="employeeAge"
            value={employee.employeeAge}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <label htmlFor="dateOfjoining" className="form-label">
            Date of Joining
          </label>
          <input
            type="date"
            className="form-control"
            id="Dateofjoining"
            name="employeeDOJ"
            value={employee.employeeDOJ}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="remark" className="form-label">
            Employee Remark
          </label>
          <input
            type="text"
            className="form-control"
            id="remark"
            name="employeeRemarks"
            value={employee.employeeRemarks}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="Gender" className="form-label">
            Gender
          </label>
          <select
            id="Gender"
            className="form-select"
            name="employeeGender"
            value={employee.employeeGender}
            onChange={handleChange}
          >
            <option selected>Choose...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Transgender</option>
          </select>
        </div>

        <div className="col-md-2">
          <label htmlFor="AccruedLeaves" className="form-label">
            Accrued Leaves
          </label>
          <input
            type="text"
            className="form-control"
            id="AccruedLeaves"
            name="employeeAcuredLeaves"
            value={employee.employeeAcuredLeaves}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 text-center">
        <button type="submit" className="btn btn-info">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
