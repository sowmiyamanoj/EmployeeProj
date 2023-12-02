import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EmployeeProps {
    clientData;
    onSelectItem: (item: string[]) => void;
}


const DispayEmployee = () => {
    const [data, SetData] = useState([]);
    const navigate = useNavigate();
    function getData() {
        fetch("http://localhost:5006/api/employees")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                SetData(data);
            });
    }

    const EditEmployee = (id: string) => {
        navigate("regFrom");
        console.log("here" + id)
    }

    const DeleteEmployee = (id: string) => {
        navigate("/AddEmployees/" + id + "/Delete");
        console.log("here" + id)
    }

    useEffect(() => {
        getData();
    }, [data]);
    return (
        <div style={{ padding: "50px" }}>
            <table className="table table-success table-hover table-bordered">
                <caption>List of Clients </caption>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee ID</th>
                        <th>Employee Age</th>
                        <th>Date of Joining</th>
                        <th>Employee Remarks</th>
                        <th>Employee Gender</th>
                        <th>Acrued Leaves</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.employeeName}</td>
                            <td>{d.employeeID}</td>
                            <td>{d.employeeAge}</td>
                            <td>{d.employeeDOJ}</td>
                            <td>{d.employeeRemarks}</td>
                            <td>{d.employeeGender}</td>
                            <td>{d.employeeAcuredLeaves}</td>

                            <td ><input type='button' onClick={() => { EditEmployee(d.employeeID) }} value="Edit"></input>{" "}<br />
                                <input type='button' onClick={() => { DeleteEmployee(d.employeeID) }} value="Delete"></input></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DispayEmployee;
