import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditHoliday: React.FC = () => {
    const { id } = useParams();
    const [holiday, setHoliday] = useState<any>({});
    const navigate = useNavigate();
    
    
    useEffect(() => {
        axios.get(`http://localhost:5006/api/holidays/${id}`)
          .then((response) => {
            console.log("Fetched holiday data for editing:", response.data);
            setHoliday(response.data);
          })
          .catch((error) => {
            console.error("Error fetching holiday data:", error);
          });
      }, [id]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setHoliday({ ...holiday, [name]: value });
      };
      const Backholiday = () => {
        navigate("/DisplayHolidays");
      }

      const [errorMsg, setErrorMsg] = useState({});
      const updateHoliday = (e: React.FormEvent) => {
        e.preventDefault();

        axios.put(`http://localhost:5006/api/holidays/${id}`, holiday)
          .then((response) => {
            console.log("Updated holiday:", response.data);
            navigate('/DisplayHolidays')
          })
          .catch((error) => {
            console.error("Error updating holiday:", error);
          });
      };

    

  return (
    <div className="container border p-4 rounded mt-4">
      <h3 className="mb-4">Edit Holiday</h3>
      <form className="row g-3" onSubmit={updateHoliday}>
        <div className="col-md-6">
        <label htmlFor="Id" className="form-label">
            Holiday ID
          </label>
          <input
            type="Id"
            className="form-control"
            id="Id"
            required
            name="holidayID"
            value={holiday.holidayID}
            onChange={handleChange}
        
          />
        </div>
        <div className="col-md-6">
        <label htmlFor="holidayName" className="form-label">
            Holiday Name
          </label>
          <input
            type="text"
            className="form-control"
            id="holidayName"
            name="holidayName"
            value={holiday.holidayName}
            onChange={handleChange}
          />
          {errorMsg && <span>{errorMsg.holidayName}</span>}
        </div>
        <div className="col-md-6">
        <label htmlFor="hoidayDateTime" className="form-label">
           Holiday Date 
          </label>
          <input
            type="date"
            className="form-control"
            id="holidayDateTime"
            name="holidayDateTime"
            value={holiday.holidayDateTime}
            onChange={handleChange}
          />
        </div>
      
        <div className="col-12 text-center">
        <button type="submit" className="btn btn-info me-3">Update</button>
        <button type="button" className="btn btn-danger" onClick={Backholiday}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default EditHoliday;
