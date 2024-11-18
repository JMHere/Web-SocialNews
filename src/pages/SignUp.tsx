import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../components/UseFetch";
import Alert from "../components/Alert";

function SignUp() {
    const [alertVisable, setAlertVisable] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const checkUsernameDup = () => {
        console.log("checking user")
        fetch("http://localhost:8080/User/CheckUsername/" + username)
      .then((res) => {
        if (!res.ok) {
          throw Error("Failed to get data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        let valid = data
        createUser(valid)
      })
      .catch((err) => {
        console.log(err)
      });
        
    }

  

  const onSubmit = (e: any) => {
    e.preventDefault();
    checkUsernameDup()
   
  };

  const createUser = (valid: any) => {
    let deleted = false;
    const user = { username, email, password, deleted };

    if (valid == true) {
        console.log("Invalid user")
        setAlertVisable(true)
    } else {
        console.log("You valid bro")
        fetch("http://localhost:8080/User/AddUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error("Failed to get data");
            }
            return res.json();
          })
          .then((data) => {
            console.log("User Added");
            sessionStorage.setItem("UserCred", data.userId);
            navigate("/yourPage");
          })
          .catch((err) => {
            if (err.name == "AbortError") {
              console.log("fetch Aborted");
            } else {
              setIsLoading(false);
              setError(err.message);
              console.log(error)
            }
          });
    }
    //console.log(user);

    
  }

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="username"
            className="form-control"
            id="username1"
            aria-describedby="emailHelp"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {alertVisable && <Alert children="This Username Is taken" onClose={() => setAlertVisable(false)}></Alert>}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email1"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
