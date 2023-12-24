import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee: React.FC = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<any>({});
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<Record<string, string>>({});

  const getEmployees = (id) => {
    axios.get(`http://localhost:5006/api/employees/${id}`)
      .then((response) => {
        console.log("Fetched employee data for editing:", response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }

  const backEmployee = () => {
    history.back();
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const hasValidationErrors = () => {
    const errors = {};

    if (!employee.employeeName.trim()) {
      errors.employeeName = "Name cannot be empty";
    } else if (employee.employeeName.trim().length <= 4) {
      errors.employeeName = "Name must have more than 4 letters";
    } else if (!/^[a-zA-Z. ]+$/.test(employee.employeeName)) {
      errors.employeeName = "Name must uppercase letter,lowercase letters only";
    }
    if (!employee.employeeID.trim()) {
      errors.employeeID = "ID cannot be empty";
    } else if (!/^\d+$/.test(employee.employeeID.trim())) {
      errors.employeeID = "ID must be a number";
    }

    if (!employee.employeeAge.trim()) {
      errors.employeeAge = "Age cannot be empty";
    } else if (!/^(1[8-9]|[2-7]\d|80)$/.test(employee.employeeAge.trim())) {
      errors.employeeAge = "Age not Valid";
    }

    if (!employee.employeeDOJ.trim()) {
      errors.employeeDOJ = "Date of Joining cannot be empty";
    } else {
      const dojDate = new Date(employee.employeeDOJ);
      const currentDate = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

      if (dojDate > currentDate || dojDate < twoMonthsAgo) {
        errors.employeeDOJ = "Date of Joining must be within the last two months";
      }
    }

    if (!employee.employeeRemarks.trim()) {
      errors.employeeRemarks = "Remarks cannot be empty";
    }

    if (!employee.employeeGender) {
      errors.employeeGender = "Gender cannot be empty";
    }

    if (!employee.employeeAcuredLeaves.trim()) {
      errors.employeeAcuredLeaves = "cannot be empty";
    } else if (!/^\d+$/.test(employee.employeeAcuredLeaves.trim())) {
      errors.employeeAcuredLeaves = "Accrued Leave must be a valid number";
    } else if (parseInt(employee.employeeAcuredLeaves, 10) > 24) {
      errors.employeeAcuredLeaves = "Accrued Leaves cannot exceed 24 days per year";
    }

    setErrorMsg(errors);

    return Object.keys(errors).length > 0;
  };

  const updateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasValidationErrors()) {
      console.log("Validation error");
    } else {
      axios.put(`http://localhost:5006/api/employees/${id}`, employee)
        .then((response) => {
          navigate('/DisplayEmployees')
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    };
  };

  useEffect(() => {
    getEmployees(id);
  }, [id, setEmployee]);

  return (
    <div className="container border rounded p-4 mt-5">
      <h3 className="mb-4">Employee Registration</h3>
      <form className="row col-xxl" onSubmit={updateEmployee}>
        <div className="col-md-6">
          <label htmlFor="Id" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="Id"
            name="employeeID"
            disabled
            value={employee.employeeID}
            onChange={handleChange}

          />
          {errorMsg && <span style={{ color: "red" }}>{errorMsg.employeeID}</span>}
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
          {errorMsg && <span style={{ color: "red" }}>{errorMsg.employeeName}</span>}
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
          {errorMsg && <span style={{ color: "red" }}>{errorMsg.employeeAge}</span>}
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
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeDOJ}</span>)}
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
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeRemarks}</span>)}
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
            <option>Others</option>
          </select>
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeGender}</span>)}
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
          {errorMsg && (<span style={{ color: 'red' }}>{errorMsg.employeeAcuredLeaves}</span>)}
        </div>
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-info me-3">Update</button>
          <button type="reset" className="btn btn-danger " onClick={backEmployee}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
