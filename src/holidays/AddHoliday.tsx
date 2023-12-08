import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface HolidayAddProps {
  HolidayAddData;
}

interface HolidayProps {
  holidayID: string;
  holidayName: string;
  holidayDateTime: string;
}

export default function HolidayForm(data: HolidayAddProps) {
  const [holiday, setHoliday] = useState<HolidayProps>({
    holidayID: "",
    holidayName: "",
    holidayDateTime: "",

  });
  const [errorMsg, setErrorMsg] = useState({});

  const { opr } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHoliday({ ...holiday, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    if (!holiday.holidayName.trim()) {
      validationErrors.holidayName = "Name Cannot be Empty";
    }

    setErrorMsg(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Validation successful");
    } else {
      return;
    }

    console.log({
      holidayName: holiday.holidayName,
    });

    axios
      .post("http://localhost:5006/api/holidays/", holiday)
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
      <h3 className="mb-4">Holiday Registration</h3>
      <form className="row col-xxl" onSubmit={handleSubmit}>
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

        <div className="col-6">
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
        <div className="p-5 text-center">
          <button type="submit" className="btn btn-success ">Submit</button>
        </div>
      </form>
    </div>
  );
}

