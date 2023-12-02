import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface EmployeeAddProps {
  EmployeeAddData;
}

interface EmployeeProps {
  employeeID: string;
  employeeName: string;
  employeeAge: string;
  employeeDOJ: string;
  employeeRemarks: string;
  employeeAcuredLeaves: string;
  employeeGender: string;
}

export default function EmployeeForm(data: EmployeeAddProps) {
  const [employee, setEmployee] = useState<EmployeeProps>({
    employeeID: "",
    employeeName: "",
    employeeAge: "",
    employeeDOJ: "",
    employeeRemarks: "",
    employeeAcuredLeaves: "",
    employeeGender: "",
  });
  const [errorMsg, setErrorMsg] = useState({});

  const { opr } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    if (!employee.employeeName.trim()) {
      validationErrors.employeeName = "Name Cannot be Empty";
    }

    setErrorMsg(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Validation successful");
    } else {
      return;
    }

    console.log({
      employeeName: employee.employeeName,
    });

    axios
      .post("http://localhost:5006/api/employees/", employee)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
  }, [opr]);

  return (
    <div className="container border rounded p-4">
      <h3 className="mb-4">Employee Registration</h3>
      <form className="row col-xxl" onSubmit={handleSubmit}>
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
          <label htmlFor="empName" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            className="form-control"
            id="empName"
            name="employeeName"
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
        <div className="p-5 text-center">
          <button type="submit" className="btn btn-success ">Submit</button>
        </div>
      </form>
    </div>
  );
}
