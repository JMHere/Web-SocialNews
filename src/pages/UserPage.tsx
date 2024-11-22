import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./components.module.css"
import MultiPosts from "../components/MultiPosts";

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
    const [pic, setPic] = useState("");


    const [gotAllPosts, setGotAllPosts] = useState(false);
    const [allPosts, setAllPosts] = useState<any>([])
    let allPostsArray: any[] | null = []

    interface PostType {
      postImage: any, postDescription: any, postLikes: any, postShares: any, postText: any, username: any
    }

    const defualtImage = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
 

    fetch("http://localhost:8080/UserPage/UID/" + id)
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
          setPic(data.profilePicture)
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

        useEffect( () => {
          fetch("http://localhost:8080/Post/GetPostsByPageId/" + id)
            .then((res) => {
              if (!res.ok) {
                throw Error("Failed to get data");
              }
              return res.json();
            })
            .then((data) => {
              console.log("Posts Recieved");
              console.log(data)
              //setUsersPosts(data)
              if (gotAllPosts == false) {
                for (let i = 0; i < data.length; i++) {
                  let post: PostType = { postImage: data[i].postImage, 
                    postDescription: data[i].postDescription, 
                    postLikes: data[i].postLikes, 
                    postShares: data[i].postShares, 
                    postText: data[i].postText, 
                    username: data[i].username}
      
                  allPostsArray.push(post)
                }
                console.log(gotAllPosts)
                console.log(gotAllPosts)
                setAllPosts(allPostsArray)
                setGotAllPosts(true)
              }
              
              console.log(allPosts)
              //setPic(data.profilePicture);
            })
            .catch((err) => {
              if (err.name == "AbortError") {
                console.log("fetch Aborted");
              } else {
                setIsLoading(false);
                setError(err.message);
                console.log(error)
              }
            })}, [id])



    return (
        <div>
                <Navbar />
            <div className={styles.div}>
              <h1>{username}</h1>
              { pic != ""? <img className={styles.proPic} src={pic} alt="Profile Picture"></img> :
              <img className={styles.proPic} src={defualtImage} alt="ProFile Picture" />}
              <p>Bio:</p>
              <p>{bio != null && bio}</p>
              <p>Followers:</p><p>{followers != null && followers}</p>
              <p>Posts:</p>
              <p>{posts != null && posts}</p>
            </div>
            {<MultiPosts items={allPosts}></MultiPosts>}
        </div>
    );
}

export default UserPage;