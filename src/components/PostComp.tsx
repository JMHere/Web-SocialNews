import styles from "../pages/components.module.css"
import { useRef, useState } from "react"
interface postProps {
    item: { postId:any, postImage: any, postDescription: any, postLikes: any, postShares: any, postText: any, username: any}
}

function PostComp({item}: postProps) {

    const [isVisible, setIsVisible] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    const [isLiked, setIsLiked] = useState("Like");

    let pageId = sessionStorage.getItem("pageId");

    const showDesc = () => {
        setIsVisible(true)
        console.log(item.postDescription)
    }

    const likePost = () => {
        
    }

    fetch("http://localhost:8080/Post/" + pageId + "/liked/" + item.postId)
            .then((res) => {
            if (!res.ok) {
                throw Error("Failed to get data");
            }
            return res.json();
            })
            .then((data) => {
            console.log("Like Check");
            console.log(data)
            setPostLiked(data)
            if (data == true) {
                setIsLiked("Liked")
            }
            })
            .catch((err) => {
            if (err.name == "AbortError") {
                console.log("fetch Aborted");
            } else {
                console.log(err)
            }
            })

    return (
        <div>
            {/* <Popup trigger={<button hidden ref={popUpRef}></button>}> {<div><button onClick={close} >Close</button></div>}</Popup> */}
            {isVisible && <div className={styles.popUp}>
                <button onClick={() => setIsVisible(false)}>Close</button>
                <div className={styles.postDiv}> 
                    
                    <img src={item.postImage} className={styles.imagePopUp}></img>
                    <div className={styles.status}>Status Bar</div>
                    
                </div>
            </div>}
            <div className={styles.postCard} onClick={showDesc}>
            <div className="card mx-auto" style={{width: "18rem", margin: "1%"}}>
                <div className="card-body">
                    <p className="card-text">{item.username}</p>
                </div>
                <img src={item.postImage} className={styles.postImage}></img>
                <div className="card-body">
                    <p className="card-text text-center">  {item.postDescription != null && <b>{item.username}:</b>} {item.postDescription}</p>
                </div>
                <div>
                    <button>{isLiked}</button>
                    <p>Likes: {item.postLikes}</p>
                    {/* <p>Comment Section</p> */}
                </div>
            </div>
            </div>
        </div>
    );
}

export default PostComp;