import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [array,setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI()
  },[]);

  return (
    <>
    <h1>
      <p>
        {
          array.map((user, index) => (
            <div key={index}>
            <span>{user}</span>
            <br />
            </div>
          ))
        }
      </p>
    </h1>
    </>
  )
}

export default App
