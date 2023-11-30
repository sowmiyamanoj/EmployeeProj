import axios from "axios";
import React, { useState } from "react";

interface Employee {
  employeeName: string;
  employeeID: string;
  employeeAge: string;
  employeeDOJ: string;
  employeeRemarks: string;
  employeeAcuredLeaves: string;
  employeeGender: string;
}

const EmployeeForm: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>({
    employeeName: "",
    employeeID: "",
    employeeAge: "",
    employeeDOJ: "",
    employeeRemarks: "",
    employeeAcuredLeaves: "",
    employeeGender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
    axios
      .post("http://localhost:5006/api/employees", employee)
      .catch((err) => console.log(err))
      .then((res) => console.log(res));
  };

  return (
    <div className="container border p-4 rounded">
      <h3 className="mb-4">Employee Registration</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="empName" className="form-label">
            Employee Name
          </label>
          <input
            type="empName"
            className="form-control"
            id="empName"
            name="employeeName"
            required
            value={employee.employeeName}
            onChange={handleChange}
          />
        </div>
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
            value={employee.employeeID}
            onChange={handleChange}
          />
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
            id="Dtaeofjoining"
            name="employeeDOJ"
            value={employee.employeeDOJ}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="remark" className="form-label">
            Empoyee Remark
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
          <label htmlFor="AccuredLeaves" className="form-label">
            AccuredLeaves
          </label>
          <input
            type="text"
            className="form-control"
            id="AccuredLeaves"
            name="employeeAcuredLeaves"
            value={employee.employeeAcuredLeaves}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;