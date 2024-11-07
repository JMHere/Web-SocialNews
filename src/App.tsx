import Alert from "./components/Alert";
import Button from "./components/Button";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import YourUserPage from "./pages/YourUserPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ForYou from "./pages/ForYou";
import UserPage from "./pages/UserPage";
import Post from "./pages/Post";
import Update from "./pages/Update";

function App() {
  let items = ["New York", "Los Angeles", "Tokyo", "London"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <Router>
      <>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/yourPage" element={<YourUserPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/fyp" element={<ForYou />} />
            <Route path="/userPage/:id" element={<UserPage />} />
            <Route path="/createPost" element={<Post />} />
            <Route path="/updatePage" element={<Update />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;

//<ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>

{
  /* <Navbar />
          <Alert dismiss="alert-dismissable fade show" pRole="alert">
            Alert!
          </Alert>
          <Button classString="btn btn-primary" dismiss="alert" buttonText="Click Me!!"></Button> */
}
