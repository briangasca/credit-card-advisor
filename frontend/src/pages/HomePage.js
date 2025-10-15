import {useEffect, useState} from 'react'
import axios from 'axios'
import '../styles/HomePage.css'
import StatementInput from '../components/StatementInput';

export default function HomePage() {
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}`)
        .then((res) => setMessage(res.data.message))
        .catch((err) => console.log(err));
    }, []);
  
    return (
      <div>
        <h1>{message}</h1>
        <div className='homepage-container'>
          <h1 className="main-header">Credit Card Advisor</h1>
          <p className="header-footer">Credit card recommendations based on your purchases.</p>
          <StatementInput></StatementInput>
        </div>
        


      </div>
    );
  }