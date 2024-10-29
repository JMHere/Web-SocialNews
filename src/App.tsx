import Alert from "./components/Alert";
import Button from "./components/Button";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import YourUserPage from "./pages/YourUserPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
