import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import { Auth } from "../store/Contexts";

function Home() {
  const [data, setData] = useState([]);
  const { setToken } = useContext(Auth);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setToken(token);
    }
    fetch();
  }, []);
  const fetch = () => {
    setData(JSON.parse(localStorage.getItem("drivers")));
  };
  return (
    <>
      <Navbar />
      <div className=" w-100">
        {data.length > 0 ? (
          <div className="row w-100 gap-2 my-5 d-flex justify-content-center">
            {data.map((item, idx) => {
              return <Card fetch={fetch} driver={item} key={idx} />;
            })}
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <h5>
              No Drivers were added <Link to="/add">Add new driver</Link>
            </h5>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
