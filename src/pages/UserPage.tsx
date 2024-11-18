import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

function UserPage() {

    const { id } = useParams()

    const [message, setMessage] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [posts, setPosts] = useState(null);

    fetch("http://localhost:8080/UserPage/UID/" + id)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to get data");
          }
          return res.json();
        })
        .then((data) => {
          console.log("User Recieved");
          //console.log(data)
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

export default UserPage;