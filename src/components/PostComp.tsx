
import styles from "../pages/components.module.css"
import Popup from "reactjs-popup"
import PostPopUp from "./PostPopUp"
import { useRef, useState } from "react"
interface postProps {
    item: { postImage: any, postDescription: any, postLikes: any, postShares: any, postText: any, username: any}
}

function PostComp({item}: postProps) {

    const [isVisible, setIsVisible] = useState(false)

    const showDesc = () => {
        setIsVisible(true)
        console.log(item.postDescription)
    }

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
                    {/* <p>Comment Section</p> */}
                </div>
            </div>
            </div>
        </div>
    );
}

export default PostComp;