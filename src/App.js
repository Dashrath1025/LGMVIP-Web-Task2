import React, { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers,faEye,faEnvelope,faIdBadge,faUser} from '@fortawesome/free-solid-svg-icons'
import { PacmanLoader} from "react-spinners";
import "./App.css";
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function App() {
  function delay(delayInms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadUsers = async () => {
    setLoading(true);
    const response = await fetch("https://reqres.in/api/users?page=1");
    const jsonResponse = await response.json();
    await delay(3000);
    setUser(jsonResponse.data);
    setLoading(false);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand trh" href="#">
            Hip-Sonics
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Docs
              </a>
              <a className="nav-link" href="#">
                Gallery
              </a>
              <a className="nav-link" href="#">Features</a>
            </div>
          </div>
          <button className="btn" onClick={loadUsers}><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> Get Users</button>
        </div>
      </nav>

      {loading ? (
        <PacmanLoader color="blue" css={style} size={90} />
      ) : (
        <>
          {users.map(({ id, first_name, last_name, avatar, email }) => (
              <div className="cards">
              <img src={avatar} alt=''/>  
            
            <div className='dis'>
              <br></br>
              <h5 className="tr"><FontAwesomeIcon icon={faIdBadge} />   Id :   </h5> <p>{id}</p>
              <br></br>
              <h5><FontAwesomeIcon icon={faUser} />  Name :</h5> <p>{first_name} {last_name}</p>
              <br></br>
              <h5><FontAwesomeIcon icon={faEnvelope} /> Email :</h5> <p>{email}</p>
            </div>
            
            <button id='view'><FontAwesomeIcon icon={faEye} /> View</button>
            <button id='contact'><FontAwesomeIcon icon={faEnvelope} /> Contact</button>  
              </div>
          ))}
        </>
      )}
    </>
  );
}

export default App;
