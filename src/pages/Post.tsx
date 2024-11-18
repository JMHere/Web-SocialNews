import Select from "react-select";
import Navbar from "../components/Navbar";
import styles from "./components.module.css"
import { useRef, useState } from "react";
import defaultImage from "../assets/missingImagejpg.jpg"
import { useNavigate } from "react-router-dom";

function Post() {

    const [post, setPost] = useState("true")
    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [postImage, setPostImage] = useState(defaultImage)
    const uploadImageRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    let SesUsername = sessionStorage.getItem("username")
    let intel = sessionStorage.getItem("UserCred")
    let pageId = sessionStorage.getItem("pageId")
    

    const postTypes = [
        { value: "true", label: "Image Post"},
        { value: "false", label: "Text Post"}
    ]

    const changePostType = (event: any) => {
        setPost(event.target.value)
        console.log()
    }

    const changeTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const changeDescription = (event: any) => {
        setPostDescription(event.target.value)
    }

    const getTextArea = (event: any) => {
        setPostText(event.target.value)
    }

    const postThis = () => {
        let validPost = false;
        console.log(title)
        console.log(postText)
        if (title == "" || (post == "false" && postText == "")) {
            validPost = false
        } else {
            validPost = true
        }
        createPost(validPost)
    }


    const createPost = (valid: any) => {
        let deleted = false;
        const post = { title, postDescription, deleted, postImage};
    
        if (valid == false) {
            console.log("Invalid Post")
            //setAlertVisable(true)
        } else {
            console.log("valid Post")
            fetch("http://localhost:8080/Post/AddPost/" + pageId + "/" + SesUsername, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(post),
            })
              .then((res) => {
                if (!res.ok) {
                  throw Error("Failed to get data");
                }
                return res.json();
              })
              .then((data) => {
                console.log("Post Added");
                //sessionStorage.setItem("UserCred", data.userId);
                navigate("/yourPage");
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
        }
    }

    const uploadImage = () => {
        if (uploadImageRef != null) {
            uploadImageRef?.current?.click()
        }
    }

    const changePostImage = () => {
        const uploadedFile = uploadImageRef.current.files[0];

        const cachedURL = URL.createObjectURL(uploadedFile);
        const reader = new FileReader()

        reader.onload = (e) => {
            let img = new Image()
            img.src = e.target?.result
            console.log(e?.target?.result)
            console.log(img.src)
            setPostImage(img.src)
            //let pfp = sessionStorage.setItem("image", img.src)
        }
        reader.readAsDataURL(uploadedFile);

        //setImageUrl();
        console.log(postImage)
    }

    return (
        <div>
            <Navbar />
            <div className={styles.div} >
                <input placeholder="Post Title" className={styles.inputs} onChange={changeTitle}></input>
                <br />
                <select defaultValue={"Hello"} onChange={changePostType}>
                    {postTypes.map((type, index) => (
                        <option key={index} value={type.value}>{type.label}</option>
                    ))}
                </select>
                <br />
                {post != "true" && <textarea placeholder="What's on your mind" className={styles.inputs} onChange={getTextArea}></textarea>}
                <br />
                {post == "true" && <img src={postImage} className={styles.postImage}></img>}
                <button onClick={uploadImage}>Upload Image</button>
                <br/>
                <input type="file" hidden ref={uploadImageRef} accept="image/*" onChange={changePostImage}></input>
                <br/>
                <textarea placeholder="Description" className={styles.inputs} onChange={changeDescription}></textarea>
                <br />
                <button onClick={postThis}> Post </button>
            </div>
        </div>
    );
}

export default Post;