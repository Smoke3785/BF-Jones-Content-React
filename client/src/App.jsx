import logo from './logo.svg';
import './App.css';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
let serverLoc = `http://localhost:5000/api/v1`

const CollectionViewer =()=>{

  const [collection, setCollection] = useState()

  useEffect(() => {
    axios.get(`${serverLoc}/getManifest`).then(res => {
      console.log(res.data)
      setCollection(res.data)
    })

  }, [])

  return (
    <div className="">
          <h4>Collection viewer!</h4>
    {!collection? <p>Loading...</p> : 
     <div className="collectionDiv">
       {collection.map((data)=> {
         return (
          <div className="collectionCont">
          <h5>{data.name}</h5>
          <div className="bannerimg" style={{ backgroundImage: `url(${data.imageLink})`}}></div>
          <p className="test">{data.uploadDate}</p>
        </div>
         )
       })}
     </div>
    }
    </div>
  )

}

const ItemViewer =()=>{


  return (
    <h4>Item viewer!</h4>
  )

}

const App =()=> {
  return (
    <div className="App">
      <h1>BF Jones Memorial Library Archive web portal</h1>
      <Route exact path="/" component={CollectionViewer} />
      <Route path="/items/:collectionID" component={ItemViewer}></Route>
    </div>
  );
}

export default App;
