import { useState } from "react";
import useFetch from "../components/UseFetch";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function YourUserPage() {
    const [message, setMessage] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate();

    let intel = sessionStorage.getItem("UserCred")
    //setUrl(url + "UID" + "/" + intel)


    const {data, isLoading, error} = useFetch("http://localhost:8080/UserPage/UID/" + intel)

    //console.log(data)
    //

    const logOut = () => {
        sessionStorage.removeItem("UserCred")
        navigate("/")
    }



  return (
    <div>
      <h1>Your Page</h1>
      <p>{intel}</p>
      <Button classString={"btn btn-primary"} clicked={logOut} buttonText="Log Out"/>
    </div>
  );
}

export default YourUserPage;
