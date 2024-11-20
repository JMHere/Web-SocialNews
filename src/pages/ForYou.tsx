import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./components.module.css"
import PostComp from "../components/PostComp";

function ForYou() {

    const [pic, setPic] = useState("")
    const [username, setUsername] = useState("")
    const [textArea, setTextArea] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    interface PostType {
      postImage: any, PostDescription: any, postLikes: any, postShares: any, postText: any, username: any
    }

    let post: PostType = { postImage: pic, PostDescription: "", postLikes: 0, postShares: 0, postText: "", username: username} 

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
          for (let i = 0; i < data.length; i++) {
            console.log(i)
            // setPic(data[i].postImage);
            // //console.log(post.postImage)
            // setUsername(data[i].username);
          }
          
          //console.log(pic)

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
            <h1 className={styles.titleText}>For You</h1>
            {/* <img src={pic} className={styles.postImage}></img> */}
            <PostComp item={post}></PostComp>
        </div>
    );
}

export default ForYou;