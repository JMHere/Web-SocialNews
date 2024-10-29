import Login from "./Login";
import { useEffect } from "react";

function Home() {
  // useEffect(() => {
  //     fetch('http://localhost:8080/Post/GetAllPosts')
  //     .then(res => {
  //         return res.json();
  //     })
  //     .then(data => {
  //         console.log(data)
  //     })
  // }, []);

  return (
    <div>
      <h1>Home page</h1>
      <div style={{ maxWidth: 1000 }}>
        <Login />
      </div>
    </div>
  );
}

export default Home;
