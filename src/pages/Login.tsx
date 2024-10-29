import { ChangeEvent, useState } from "react";
import Button from "../components/Button";
import { Navigate, redirect, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword ] = useState("")
  const navigate = useNavigate();

  const changePassword = (event: any) => {
    setPassword(event.target.value);
  }


  const changeUser = (event: any) => {
    setUsername(event.target.value)
  }

  const loginAcc = () => {
    //navigate("/yourPage")
    

  };

  return (
    <div>
        <div style={{maxWidth: 1500} }>
        <div className="row g-3">
            <div className="col">
                <input type="text" className="form-control" placeholder="UserName" aria-label="UserName" onChange={changeUser}/>
            </div>
            <div className="col">
                <input type="text" className="form-control" placeholder="PassWord" aria-label="PassWord" onChange={changePassword}/>
            </div>
        </div>
        <p>{username}</p>
        <Button classString={"btn btn-primary"} clicked={loginAcc} buttonText="Login"/>
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
