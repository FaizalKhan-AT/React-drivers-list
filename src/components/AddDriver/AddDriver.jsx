import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Auth, EditDriver } from "../../store/Contexts";
import { validateDate, validateEmail, validatePhone } from "../../Validation";

function AddDriver({ edit }) {
  const [driver, setDriver] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();
  const { driverDetails } = useContext(EditDriver);
  const { token } = useContext(Auth);
  let data = [];
  const handleChange = (e) => {
    setError("");
    setDriver({
      ...driver,
      [e.target.name]: e.target.value,
      id: edit ? driverDetails.id : Date.now(),
    });
  };
  const handleSubmit = () => {
    setError("");
    if (!validate()) return;
    if (edit) pushToLocalStorage();
    else pushToLocalStorage();
    history.push("/");
  };
  const validate = () => {
    const { firstname, lastname, email, licenseNum, licenseExp, dob, phone } =
      driver;
    if (Object.keys(driver).length < 8) {
      setError("Fill all the details");
      return;
    }
    if (firstname.length < 4) {
      setError("first name should be atleast four letters");
      return;
    }
    if (lastname.length < 4) {
      setError("last name should be atleast four letters");
      return;
    }
    if (licenseNum.length < 4) {
      if (licenseNum.length > 12) {
        setError("license number should not be more than 12");
        return;
      }
      setError("license Number should be atleast four and max of 12 letters");
      return;
    }
    if (!validateEmail(email)) {
      setError("email address not valid");
      return;
    }
    if (!validatePhone(phone)) {
      setError("phone number not valid");
      return;
    }
    if (!validateDate(dob)) {
      setError("DOB not valid");
      return;
    }
    if (!validateDate(licenseExp)) {
      setError("License Exp date not valid");
      return;
    }
    return true;
  };
  useEffect(() => {
    if (!token) history.push("login");
    if (edit) {
      fetchDriver();
    }
  }, []);
  const pushToLocalStorage = () => {
    if (localStorage.getItem("drivers")) {
      data = JSON.parse(localStorage.getItem("drivers"));
      if (edit) {
        data = data.filter((el) => el.id !== driverDetails.id);
      }
      data.push(driver);
      localStorage.setItem("drivers", JSON.stringify(data));
    } else {
      data.push(...data, driver);
      localStorage.setItem("drivers", JSON.stringify(data));
    }
  };
  const fetchDriver = () => {
    setDriver(driverDetails);
  };
  return (
    <>
      <Link to="/" className="btn btn-warning m-2 ">
        Home
      </Link>
      <div className="container my-5 d-flex justify-content-center align-items-center">
        <div className="card">
          <div className="card-top text-center h5 my-3">
            {edit ? "Edit" : "Add"} Driver Details
          </div>
          {error && <span className="text-danger m-2">{error}</span>}
          <div className="row w-100 justify-content-center px-3">
            <div className="col-md-6 my-3 mt-4">
              <label className="form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={driver.firstname}
                name="firstname"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 my-3 mt-4">
              <label className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                value={driver.lastname}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 my-3 mt-4">
              <label className="form-label">
                Date Of Birth <span className="text-danger">*</span>
              </label>
              <input
                value={driver.dob}
                type="date"
                name="dob"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 my-3 mt-4">
              <label className="form-label">
                License number <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                value={driver.licenseNum}
                name="licenseNum"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 my-3 mt-4">
              <label className="form-label">
                License Expiration <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                name="licenseExp"
                value={driver.licenseExp}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 my-3 mt-4">
              <label className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={driver.email}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 my-3 mt-4">
              <label className="form-label">
                Phone number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={driver.phone}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-7 my-3">
              <button
                className="btn btn-primary form-control"
                onClick={handleSubmit}
              >
                {edit ? "Edit" : "Create"} Driver
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDriver;
