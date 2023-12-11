import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


interface RoleProps{
    roleID: String;
    roleName : String;
    roleStatus: String;
    roleDescription: String ;
    ruleRights: String;
}

const RoleForm: React.FC = () => {
const  [role , setRole] = useState<RoleProps> ({

    roleID: "",
    roleName : "",
    roleStatus: "",
    roleDescription:"",
    ruleRights: "",

});


const handleChange=(e) => {
    const{ name , value} = e.target;
    setRole({ ...role , [name]: value });
};

const { opr } = useParams();
const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:5006/api/role/", role)
      .then((res) => {
        console.log(res);
        })
        .catch((err) => console.log(err));
        navigate('/ReadRole')
      };
    
      useEffect(() => {
      }, [opr]);


  return(
    <div className="container border rounded p-4 mt-4">
      <h3 className="mb-4">Role Registration</h3>
      <form className="row col-xxl" onSubmit={handleSubmit}>
        <div className="col-md-6">
              <label htmlFor="roleid" className="form-label">
                Role ID
              </label>
              <input
                type="id"
                className="form-control"
                id="roleid"
                name="roleID"
                value={role.roleID}
                onChange={handleChange}
              />
            </div>
        <div className="col-md-6">
          <label htmlFor="roleName" className="form-label">
            Role Name
          </label>
          <input
            type="text"
            className="form-control"
            id="roleName"
            name="roleName"
            value={role.roleName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ruleRigths" className="form-label">
            Rule Rights
          </label>
          <input
            type="text"
            className="form-control"
            id="ruleRights"
            name="ruleRights"
            value={role.ruleRights}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="roleStatus" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="roleStatus"
            name="roleStatus"
            value={role.roleStatus}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 me-3">
          <label htmlFor="roleDescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="roleDescription"
            name="roleDescription"
            value={role.roleDescription}
            onChange={handleChange}
          />
        </div>

        <div className="p-5 text-center">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        </div>
      </form>
    </div>
);
  };

export default RoleForm;

