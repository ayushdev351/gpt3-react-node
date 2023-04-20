import './App.css';
import {useState} from "react";

function App() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });
    const data = await response.json();
    setResponse(data.result);
    setMessage("");
  };

  return(
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='userinput'>Ask Something</label>
          <input type ="text" id="userinput" value = {message} onChange={(e) => setMessage(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
        <div>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
