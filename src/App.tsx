import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  let items = ["New York", "Los Angeles", "Tokyo", "London"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  }

  

  return (
    <div>
      <Alert dismiss="alert-dismissable fade show" pRole="alert">
        Alert!
      </Alert>
      <Button classString="btn btn-primary" dismiss="alert" buttonText="Click Me!!"></Button>
    </div>
  );
}

export default App;


//<ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>