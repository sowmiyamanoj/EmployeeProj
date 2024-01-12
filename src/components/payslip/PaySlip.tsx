import "./paySlip.css";
import { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";  // Import html2canvas
import React from "react";

const PaySlip = () => {
  const [data, setData] = useState<any>(null);
  const [searchEmployeeID, setSearchEmployeeID] = useState<any>(null);
  const [shouldFetchDefault, setShouldFetchDefault] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Backend = `http://localhost:3306`;

  const handleGenerate = () => {
    setErrorMessage(null);

    fetch(`${Backend}/api/payslip/payslips/${searchEmployeeID}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((responseData) => {
        const newData = Array.isArray(responseData) ? responseData : [responseData];
        setData(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data. Please try again.");  // Set error message
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmployeeID(e.target.value);
    setShouldFetchDefault(true);
  };

  useEffect(() => {
    handleGenerate();
  }, [shouldFetchDefault]);

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    const content = pdfContainerRef.current;

    if (content) {
      const payslipData = Array.isArray(data) ? data : [];

      // Iterate over payslip data and add it to the PDF
      for (let i = 0; i < payslipData.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        // Convert HTML content to image using html2canvas
        const canvas = await html2canvas(content, { scale: 2 });

        // Add image to PDF
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 190, 0);

        // Add additional content as needed
       
      }

      pdf.save("paySlip.pdf");
    }
  };

  return (
    <>
      <div style={{ padding: "50px" }}>
        <div className="search-section d-flex gap-1">
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={searchEmployeeID}
            onChange={handleInputChange}
          />
          <button onClick={handleGenerate} className="btn btn-primary ms-2">
            Generate
          </button>
        </div>

        {errorMessage && (
          <div className="mt-2" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
        <br></br>
        <br></br>
       
        <div id="paySlipContainer" className="salary-slip" ref={pdfContainerRef} >
          <header className="salary-header">
            <h1 style={{ borderBottom: "1px solid #000", paddingBottom: "20px" }}>Thay Technology</h1>
            <p style={{ borderBottom: "1px solid #000", paddingBottom: "20px", fontSize: '20px' }} ><b>Salary Slip</b></p>
          </header>
          <div>
            <div style={{ borderBottom: "1px solid #000", paddingBottom: "20px" }}>
              {Array.isArray(data) &&
                data.map((d: any, i: number) => (
                  <div key={i} className="row">
                    <div className="col-md-6">
                      <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                        <b>EmployeeID: {d.employeeID}</b>
                      </div>
                      <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                        <b>EmployeeName: {d.employeeName}</b>
                      </div>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                        <b>Month: {d.month}</b>
                      </div>
                      <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                        <b>DateOfJoining: {d.dateOfJoining}</b>
                      </div>
                      <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '18px' }}>
                        <b>Number of days present: 26</b>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <br></br>
          </div>
          <br></br>

          <table className="table border-gray-200 mt-3">
            <thead>
              <tr>
                <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm px-0">Description</th>
                <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm text-end px-0">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((d: any, i: number) => (
                  <>
                    <tr key={i}>
                      <td className="px-0" style={{ fontSize: '17px' }}>Basic Salary</td>
                      <td className="text-end px-0" style={{ fontSize: '17px' }}>{d.basicSalary}</td>
                    </tr>
                    <tr>
                      <td className="px-0" style={{ fontSize: '17px' }}>Bonus Salary</td>
                      <td className="text-end px-0" style={{ fontSize: '16px' }}>{d.bonusSalary}</td>
                    </tr>
                    <tr>
                      <td className="px-0" style={{ fontSize: '17px' }}>HRA Amount</td>
                      <td className="text-end px-0" style={{ fontSize: '16px' }}>{d.hraAmount}</td>
                    </tr>
                    <tr>
                      <td className="px-0" style={{ fontSize: '17px' }}>PF Amount</td>
                      <td className="text-end px-0" style={{ fontSize: '17px' }}>{d.pfAmount}</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
          <br></br>
          <h5><b>Total:</b></h5>
          <div>
            {Array.isArray(data) &&
              data.map((d: any, i: number) => (
                <div key={i} className="row dark-bottom-border" >
                  <div className="col-md-6" >
                    <div className="fs-sm text-dark text-uppercase-bold-sm px-0" style={{ fontSize: '17px' }}>Netsalary</div>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <div className="fs-sm text-dark text-uppercase-bold-sm px-0 " style={{ fontSize: '17px' }}>{d.netSalary}</div>
                  </div>
                </div>
              ))}
            <br></br>
          </div>
        </div>
        <br/>
       <center><button
          onClick={() => handleDownloadPDF()}
          className="btn btn-primary ms-2"
        >
          Download PDF
        </button>
        </center>
      </div>
    </>
  );
};

export default PaySlip;
