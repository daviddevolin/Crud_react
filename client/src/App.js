import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [museuName, setMuseuName] = useState("");
  const [museuReview, setMuseuReview] = useState("");
  const [museuReviewList, setMuseuList] = useState([]);
  const [newReview, setNewReview] = useState("");


  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((Response)=>{
      setMuseuList(Response.data)
    });
  }, []);

  const submitReview = ()=>{
    Axios.post('http://localhost:3001/api/insert',{
      museuName:museuName,
      museuReview:museuReview
    });

    setMuseuList([
      ...museuReviewList,
      { museuName : museuName ,museuReview: museuReview},
    ]);
  };

  const deleteReview = (museuName)=> {
    Axios.delete(`http://localhost:3001/api/delete/${museuName}`);
  };

  const updateReview = (museuName)=> {
    Axios.put("http://localhost:3001/api/update",{
      museuName:museuName,
      review: newReview
    });
    setNewReview("")
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

        <button onClick={submitReview}>Submit</button>
        {museuReviewList.map((val)=>{
          return <div  className='card'>
            <h1>{val.museuName}</h1>  
            <p>{val.museuReview}</p>
            <button onClick={() => deleteReview(val.museuName)}> delete </button>
            <input type="text"  id="updateInput" onChange={(e) =>{
              setNewReview (e.target.value)
            }}/>
            <button onClick={()=>{updateReview(val.museuName)}}>update</button>
          </div>
        })}

      </div>
    </div>
  );
}

export default App;
