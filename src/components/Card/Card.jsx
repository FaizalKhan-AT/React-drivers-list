import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth, EditDriver } from "../../store/Contexts";

function Card({ driver, fetch }) {
  const { setDriverDetails } = useContext(EditDriver);
  const { token } = useContext(Auth);
  const history = useHistory();
  let data = [];
  const handleDelete = (id) => {
    data = JSON.parse(localStorage.getItem("drivers"));
    data = data.filter((el) => el.id !== driver.id);
    localStorage.setItem("drivers", JSON.stringify(data));
    fetch();
  };
  return (
    <>
      <div className="card py-3 px-2 col-md-5">
        <div className="card-body">
          <p>id: {driver.id}</p>
          <p>
            Name : {driver.firstname} {driver.lastname}
          </p>
          <p>DOB : {driver.dob}</p>
          <p>License number : {driver.licenseNum}</p>
          <p>License Expiration : {driver.licenseExp}</p>
          <p>Email: {driver.email}</p>
          <p>Phone: {driver.phone}</p>
        </div>
        <div className="row w-100 gap-1 justify-content-center">
          {token ? (
            <>
              {" "}
              <button
                className="btn btn-primary col-5"
                onClick={() => {
                  setDriverDetails(driver);
                  history.push("/edit");
                }}
              >
                Edit
              </button>
              <button className="btn btn-danger col-5" onClick={handleDelete}>
                Delete
              </button>
            </>
          ) : (
            <Link className="col-7" to="/login">
              Login to edit and delete
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
