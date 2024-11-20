
import styles from "../pages/components.module.css"

interface postProps {
    item: { postImage: any, postDescription: any, postLikes: any, postShares: any, postText: any, username: any}
}

function PostComp({item}: postProps) {
    return (
        <div>
            <div className="card mx-auto" style={{width: "18rem"}}>
                <div className="card-body">
                    <p className="card-text">{item.username}</p>
                </div>
                <img src={item.postImage} className="card-img-top"></img>
                <div className="card-body">
                    <p className="card-text">{item.postDescription}</p>
                </div>
                <div>
                    <p>Comment Section</p>
                </div>
            </div>
        </div>
    );
}

export default PostComp;