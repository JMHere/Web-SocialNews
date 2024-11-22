import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
//import ListGroup from "../components/ListGroup";
import SearchComp from "../components/SearchComp";

function SearchPage() {

    const intUrl = "http://localhost:8080/UserPage/GetByUserName/";
    const [userSearch, setUserSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState("");

    const [gotAllUsers, setGotAllUsers] = useState(false);
    const [allUsers, setAllUsers] = useState<any>([])
    let allUsersArray: any[] | null = []

    const search = (e: any) => {
        setUrl(intUrl + e.target.value)
        console.log(allUsersArray)
    }

    interface userCard {
      pageId: any, profilePicture: any, username: any
    }

    useEffect(() => {
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw Error("Failed to get data");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
              let user: userCard = {
                pageId: data[i].pageId,
                profilePicture: data[i].profilePicture,
                username: data[i].username
              }
              allUsersArray.push(user)
            }
            console.log(allUsersArray)
            setAllUsers(allUsersArray)
            setGotAllUsers(true)
          })
          .catch((err) => {
            if (err.name == "AbortError") {
              console.log("fetch Aborted");
            } else {
              setIsLoading(false);
              setError(err.message);
            }
          });
      }, [url]);

        console.log(allUsers)

    return (
        <div>
            <Navbar />
            <h1>Search</h1>
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={search}/>
            </div>
            {gotAllUsers != false && allUsers.map((user: userCard, index: any) => (
              <SearchComp user={user} key={index}></SearchComp>
            ))}
        </div>
    );
}

export default SearchPage;