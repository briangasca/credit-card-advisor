import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}`)
      .then(res => setMessage(res.data.message))
      .catch(err => console.log(err));
  }, []);

  const addCard = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/cards", {
        name: "Chase Sapphire Preferred",
        issuer: "Chase",
        annualFee: 95,
        rewards: [
          { category: "Travel", rate: "2x" },
          { category: "Dining", rate: "3x" },
        ],
      });
      console.log("Card added:", res.data);
      alert("Card added! Check MongoDB Atlas.");
    } catch (err) {
      console.error(err);
      alert("Error adding card");
    }
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={addCard}>Add Card</button>
    </div>
  );
}

export default App;
