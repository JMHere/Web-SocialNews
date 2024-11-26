import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./components.module.css"
import MultiPosts from "../components/MultiPosts";

function YourUserPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pic, setPic] = useState("");
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [posts, setPosts] = useState(null);
    const [editBio, setEditBio] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const defualImage = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    const uploadImageRef = useRef<any>(null);
    const [ updatePFPSec, setUpdatePFPSec] = useState(false)
    const [changingBio, setChangingBio] = useState("");
    const [usersPosts, setUsersPosts] = useState("");
    const [gotAllPosts, setGotAllPosts] = useState(false);
    const [allPosts, setAllPosts] = useState<any>([])
    let allPostsArray: any[] | null = []

    let intel = sessionStorage.getItem("UserCred")
    let pfp = sessionStorage.getItem("image")
    //setUrl(url + "UID" + "/" + intel)

    let pageId = sessionStorage.getItem("pageId")

    interface PostType {
      postId: any, postImage: any, postDescription: any, postLikes: any, postShares: any, postText: any, username: any
    }

  useEffect(() => {
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
          //setPic(data.profilePicture);
          setUsername(data.username);
          setBio(data.bio)
          setFollowers(data.numberOfFollowers)
          setPosts(data.numberOfPosts)
          setPic(data.profilePicture)
          sessionStorage.setItem("username", data.username);
          sessionStorage.setItem("pageId", data.pageId);

        })
        .catch((err) => {
          if (err.name == "AbortError") {
            console.log("fetch Aborted");
          } else {
            setIsLoading(false);
            setError(err.message);
            console.log(error)
          }
        })}, [intel])


        const showTextArea = () => {
          if (editBio == false) {
            setEditBio(true)
          }  else {
            setEditBio(false)
          }
          
        }

        const uploadImage = () => {
          uploadImageRef.current.click()
      }
  
      const changePostImage = () => {
          const uploadedFile = uploadImageRef.current.files[0];
  
          const reader = new FileReader()

        reader.onload = (e) => {
            let img = new Image()
            img.src = e.target?.result
            console.log(e?.target?.result)
            console.log(img.src)
            setImageUrl(img.src)
            //let pfp = sessionStorage.setItem("image", img.src)
        }
        reader.readAsDataURL(uploadedFile);
  
          //setImageUrl(cachedURL);
      }

      const updatePicture = () => {
        updatePFP()
        //setUpdatePFP(false);
      }

      const showUpdatePFPArea = () => {
        setUpdatePFPSec(true)
        uploadImage()
      }
    

      const updateBio = () => {
        console.log(changingBio)

        let bio = changingBio

        const userPage = {bio}

        fetch("http://localhost:8080/UserPage/UpdateBio/" + pageId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userPage),
          })
          .catch((err) => {
          if (err.name == "AbortError") {
              console.log("fetch Aborted");
          } else {
              setIsLoading(false);
              setError(err.message);
              console.log(err.message)
          }
          });
          setEditBio(false);
      }

      const updatePFP = () => {
        let profilePicture = imageUrl

        const userPage = {profilePicture}

        console.log(userPage)

        fetch("http://localhost:8080/UserPage/ChangePFP/" + pageId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userPage),
          })
          .catch((err) => {
          if (err.name == "AbortError") {
              console.log("fetch Aborted");
          } else {
              setIsLoading(false);
              setError(err.message);
              console.log(err.message)
          }
          });
          setUpdatePFPSec(false);
      }

    
    useEffect( () => {
      fetch("http://localhost:8080/Post/GetPostsByPageId/" + pageId)
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
              let post: PostType = { 
                postId: data[i].postId,
                postImage: data[i].postImage, 
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
        })}, [pageId])

    
    

  return (
    <div>
      <Navbar />
      <div className={styles.div}>
        <h1>Your Page</h1>
        { pic != ""? <img className={styles.proPic} src={pic} alt="Profile Picture"></img> :
          <img className={styles.proPic} src={defualImage} alt="ProFile Picture" />}
          <br />
          {/* Functions for updating pfp */}
          {updatePFPSec == false && <button onClick={showUpdatePFPArea}>Update PFP</button>}
          {updatePFPSec == true && <button onClick={updatePicture}>Update</button>}
          {updatePFPSec == true && <button onClick={() => {setUpdatePFPSec(false)}}>Cancel</button>}
          <input type="file" hidden accept="image/*" ref={uploadImageRef} onChange={changePostImage}></input>
        <h1>{username}</h1>
        {/* <input type="file" accept="image/*"></input> */}
        <p>Bio:</p>
        {/* Functions for updateing bio */}
        <p>{(bio != null && editBio != true) && bio}</p>
        {editBio == true && <textarea onChange={(e) => setChangingBio(e.target.value)}>{bio}</textarea>}
        <br />
        { editBio == false && <button onClick={showTextArea}>EditBio</button>}
        { editBio == true && <button onClick={showTextArea}>Cancel</button>}
        { editBio == true && <button onClick={updateBio}>Update Bio</button>}
        <p> Followers: {followers != null && followers}</p>
        <p> Posts: {posts != null && posts}</p>
      </div>
      {<MultiPosts items={allPosts}></MultiPosts>}
    </div>
  );
}

export default YourUserPage;
