import { Link } from "react-router-dom";
import styles from "../pages/components.module.css"

interface searchProps {
    user: { pageId: any, profilePicture: any, username: any}
}

function SearchComp({user}: searchProps) {
    return (
        <div>
            <Link style={{textDecoration: "none", color: "black"}} to={"/userPage/" + user.pageId}>
            <div className={styles.searchDiv}>
            <p className="searchUsername">
                <img src={user.profilePicture} alt="User Image" className={styles.searchPFP}></img> 
                &nbsp;{user.username}</p>
                
            </div>
            </Link>
        </div>
    );
}

export default SearchComp;