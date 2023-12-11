import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRole: React.FC = () => {
    const { id } = useParams();
    const [role, setRole] = useState<any>({});
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:5006/api/role/${id}`)
            .then((response) => {
                console.log("Fetched role data for editing:", response.data);
                setRole(response.data);
            })
            .catch((error) => {
                console.error("Error fetching role data:", error);
            });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRole({ ...role, [name]: value });
    };
    const BackRole = () => {
        navigate("/ReadRole");
      }

    const updateRole = (e: React.FormEvent) => {
        e.preventDefault();

        axios.put(`http://localhost:5006/api/role/${id}`, role)
            .then((response) => {
                console.log("Updated Role:", response.data);
                navigate('/ReadRole')
            })
            .catch((error) => {
                console.error("Error updating Role:", error);
            });
    };

    return (
        <div className="container border rounded p-4 mt-4">
            <h3 className="mb-4">Edit Role</h3>
            <form className="row col-xxl" onSubmit={updateRole}>
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
                    <button type="submit" className="btn btn-success me-3">
                        Update
                    </button>
                    <button type="reset" className="btn btn-danger " onClick={BackRole}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default EditRole;