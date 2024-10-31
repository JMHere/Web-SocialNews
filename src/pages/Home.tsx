import Login from "./Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

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
