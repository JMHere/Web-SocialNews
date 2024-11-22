import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./components.module.css"
import PostComp from "../components/PostComp";
import useFetch from "../components/UseFetch";

function ForYou() {

    const [pic, setPic] = useState("")
    const [username, setUsername] = useState("")
    const [textArea, setTextArea] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const [gotAllPosts, setGotAllPosts] = useState(false);
    const [allPosts, setAllPosts] = useState<any>([])
    const allPostsArray: any[] | null = []

    interface PostType {
      postImage: any, postDescription: any, postLikes: any, postShares: any, postText: any, username: any
    }

    let post: PostType = { postImage: pic, postDescription: "", postLikes: 0, postShares: 0, postText: "", username: username} 

  useEffect(() => {
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
            let post: PostType = { postImage: data[i].postImage, 
              postDescription: data[i].postDescription, 
              postLikes: data[i].postLikes, 
              postShares: data[i].postShares, 
              postText: data[i].postText, 
              username: data[i].username}

            allPostsArray.push(post)
          }
          setAllPosts(allPostsArray)
          setGotAllPosts(true)
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
        })}, [])

    return (
        <div>
            <Navbar />
            <h1 className={styles.titleText}>For You</h1>
            {gotAllPosts != false && allPosts.map((post: PostType, index: any) => (
              <PostComp item={post}></PostComp>
            ))}
            {/* <PostComp item={post}></PostComp> */}
        </div>
    );
}

export default ForYou;