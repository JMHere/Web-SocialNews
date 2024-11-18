import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListGroup from "../components/ListGroup";

function SearchPage() {

    const intUrl = "http://localhost:8080/UserPage/GetByUserName/";
    const [userSearch, setUserSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState("");
    const [users, setUsers] = useState(null);

    const search = (e: any) => {
        setUrl(intUrl + e.target.value)
        //console.log(url)
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
            setUsers(data)
            //sessionStorage.setItem("UserCred", data.userId);
            //navigate("/yourPage")
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



    return (
        <div>
            <Navbar />
            <h1>Search</h1>
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={search}/>
            </div>
            {users != null && <ListGroup items={users}></ListGroup>}
        </div>
    );
}

export default SearchPage;