import { useRef, useState } from "react";
import useFetch from "../components/UseFetch";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./components.module.css"

function YourUserPage() {
    const [message, setMessage] = useState("")
    const [url, setUrl] = useState("")
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
    const [ updatePFP, setUpdatePFP] = useState(false)

    let intel = sessionStorage.getItem("UserCred")
    let pfp = sessionStorage.getItem("image")
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
          //setPic(data.profilePicture);
          setUsername(data.username);
          setBio(data.bio)
          setFollowers(data.numberOfFollowers)
          setPosts(data.numberOfPosts)
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
        });


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
  
          const cachedURL = URL.createObjectURL(uploadedFile);
  
          setImageUrl(cachedURL);
      }

      const updatePicture = () => {
        uploadImage()
        //setUpdatePFP(false);
      }

      const showUpdatePFPArea = () => {
        setUpdatePFP(true)
        if (pic == "" && pfp != null) {
          setPic(pfp)
        }
        console.log(pic)
        console.log(pfp)
      }
    
    
    

  return (
    <div>
      <Navbar />
      <div className={styles.div}>
        <h1>Your Page</h1>
        { pic != ""? <img className={styles.proPic} src={pic} alt="Profile Picture"></img> :
          <img className={styles.proPic} src={defualImage} alt="ProFile Picture" />}
          <br />
          {updatePFP == false && <button onClick={showUpdatePFPArea}>Update PFP</button>}
          {updatePFP == true && <button onClick={updatePicture}>Update</button>}
          {updatePFP == true && <button onClick={() => {setUpdatePFP(false)}}>Cancel</button>}
          <input type="file" hidden accept="image/*" ref={uploadImageRef} onChange={changePostImage}></input>
        <h1>{username}</h1>
        {/* <input type="file" accept="image/*"></input> */}
        <p>Bio:</p>
        <p>{(bio != null && editBio != true) && bio}</p>
        {editBio == true && <textarea>{bio}</textarea>}
        <br />
        { editBio == false && <button onClick={showTextArea}>EditBio</button>}
        { editBio == true && <button onClick={showTextArea}>Cancel</button>}
        { editBio == true && <button>Update Bio</button>}
        <p> Followers: {followers != null && followers}</p>
        <p> Posts: {posts != null && posts}</p>
      </div>
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
          <div className="col">
            One of three columns
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourUserPage;
