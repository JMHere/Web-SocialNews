import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import useFetch from "../components/UseFetch";


function Update() {

    let intel = sessionStorage.getItem("UserCred")
    const url = "http://localhost:8080/UserPage/UID/" + intel;
    const userUrl = "http://localhost:8080/User/" + intel;
    const intUpdateUrl = "http://localhost:8080/User/UpdateUser/" + intel;

    const [bio, setBio] = useState("No Bio")
    const [password, setPassword] = useState("")
    //const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const [isPending, setIsLoading] = useState(false)
    const [er, setError] = useState("")
    const [updateUrl, setUpdateUrl] = useState("")

    const changePassword = (event: any) => {
        setPassword(event.target.value)
    };

    const changeEmail = (event: any) => {
        setEmail(event.target.value)
    }

    const setUrl = () => {
        setUpdateUrl(intUpdateUrl)

        const user = { email, password }
        console.log(intUpdateUrl)

        fetch(intUpdateUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            })
            .then((res) => {
            if (!res.ok) {
                throw Error("Failed to get data");
            }
            return res.json();
            })
            .then((data) => {
            console.log("User Cred Updated");
            console.log(data)
            })
            .catch((err) => {
            if (err.name == "AbortError") {
                console.log("fetch Aborted");
            } else {
                setIsLoading(false);
                setError(err.message);
                console.log(er)
            }
            });
    }

        useEffect(() => {
            fetch(userUrl)
                .then((res) => {
                if (!res.ok) {
                    throw Error("Failed to get data");
                }
                return res.json();
                })
                .then((data) => {
                console.log("User Cred Recieved");
                console.log(data)
                setEmail(data.email)
                setPassword(data.password)
                })
                .catch((err) => {
                if (err.name == "AbortError") {
                    console.log("fetch Aborted");
                } else {
                    setIsLoading(false);
                    setError(err.message);
                    console.log(er)
                }
                });
            }, [userUrl]);

        

    return (
        <div>
            <Navbar />
            <h1>Update Page</h1>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="name@example.com" value={password} onChange={changePassword}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="name@example.com" value={email} onChange={changeEmail}/>
            </div>
            <button onClick={setUrl}>Update User Credentials</button>
        </div>
    );
}

export default Update;