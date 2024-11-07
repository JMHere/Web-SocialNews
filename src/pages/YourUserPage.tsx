import { useState } from "react";
import useFetch from "../components/UseFetch";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function YourUserPage() {
    const [message, setMessage] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [posts, setPosts] = useState(null);

    let intel = sessionStorage.getItem("UserCred")
    //setUrl(url + "UID" + "/" + intel)


    fetch("http://localhost:8080/UserPage/UID/" + intel)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to get data");
          }
          return res.json();
        })
        .then((data) => {
          console.log("User Recieved");
          console.log(data)
          setUsername(data.username);
          setBio(data.bio)
          setFollowers(data.numberOfFollowers)
          setPosts(data.numberOfPosts)

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
    
    
    

  return (
    <div>
        <Navbar />
      <h1>Your Page</h1>
      <h1>{username}</h1>
      <p>Bio:</p>
      <p>{bio != null && bio}</p>
      <p>Followers:</p>
      <p>{followers != null && followers}</p>
      <p>Posts:</p>
      <p>{posts != null && posts}</p>
    </div>
  );
}

export default YourUserPage;
