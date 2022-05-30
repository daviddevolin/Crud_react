import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [museuName, setMuseuName] = useState("");
  const [museuReview, setMuseuReview] = useState("");
  const [museuReviewList, setMuseuList] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((Response)=>{
      setMuseuList(Response.data)
    })
  }, [])

  const SubmitReview = ()=>{
    Axios.post('http://localhost:3001/api/insert',{
      museuName:museuName,
      museuReview:museuReview
    }).then(()=>{
      alert ('inserido');
    });

  };

  return (
    <div className="App">
      <h1>Museu</h1>
      <div className="home" >
        <label>Museu Name:</label>
        <input type="text" name="museuName" onChange={(e)=>{
          setMuseuName(e.target.value)
        }} />
        <label>Museu Rivew:</label>
        <input type="text" name="museuReview" onChange={(e)=>{
          setMuseuReview(e.target.value)
        }} />
        <button onClick={SubmitReview}>Submit</button>
        {museuReviewList.map((val)=>{
          return <h1>
            Museu Name: {val.museuName} | Museu Review: {val.museuReview}
          </h1>
        })}

      </div>
    </div>
  );
}

export default App;
