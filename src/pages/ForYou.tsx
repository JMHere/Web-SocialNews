import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./components.module.css"

function ForYou() {

    const [pic, setPic] = useState("")
    const [username, setUsername] = useState("")
    const [textArea, setTextArea] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")



    fetch("http://localhost:8080/Post/GetAllPosts")
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to get data");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Posts Recieved");
          console.log(data)
          setPic(data[0].postImage)
          setUsername(data.username);
          console.log(pic)

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
            <h1>For You Page</h1>
            <img src={pic} className={styles.postImage}></img>
        </div>
    );
}

export default ForYou;