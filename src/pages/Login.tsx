import { ChangeEvent, useState, useEffect } from "react";
import Button from "../components/Button";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import useFetch from "../components/UseFetch";

function Login() {
  const intUrl = "http://localhost:8080/User/";
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //const { data, isLoading, error } = useFetch(url);
  const [user, setUser] = useState("");

  if (sessionStorage.getItem("UserCred") != null) {
    navigate("/yourPage")
}

  const changePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const loginAcc = () => {
    setUrl(intUrl + username + "/" + password);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to get data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("UserCred", data.userId);
        navigate("/yourPage")
      })
      .catch((err) => {
        if (err.name == "AbortError") {
          console.log("fetch Aborted");
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      });
  }, [url]);

  const changeUser = (event: any) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <div style={{ maxWidth: 1500 }}>
        <div className="row g-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="UserName"
              aria-label="UserName"
              onChange={changeUser}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="PassWord"
              aria-label="PassWord"
              onChange={changePassword}
            />
          </div>
        </div>
        <p>{username}</p>
        <Button
          classString={"btn btn-primary"}
          clicked={loginAcc}
          buttonText="Login"
        />
      </div>
    </div>
  );
}

export default Login;

{
  /* <input name="My Input" onChange={changeUserName} placeholder="User Name" />
            <button onClick={submitLogin}>Submit</button>
            <p>{output}</p>
            <form></form> */
}
