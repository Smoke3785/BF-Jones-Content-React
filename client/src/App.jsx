import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DirectoryViewer from './Components/DirectoryViewer'
import { useParams } from "react-router-dom";

import DirectoryCard from './Components/DirectoryCard'
let serverLoc = `http://localhost:5000/api/v1`

const cleanString =(str)=> {
  let clean1 = str.replaceAll('/', '%2F')
  let clean2 = clean1.replaceAll('\\','%2F')
  return clean2
}
const keysrt =(key)=> {
  return (a,b) => {
   if (a[key] > b[key]) return 1;
   if (a[key] < b[key]) return -1;
   return 0;
  }
}
const CollectionViewer =()=>{
  const {collectionRoute} = useParams()
  const [collection, setCollection] = useState()

  useEffect(()=> {
    axios.get(`${serverLoc}/getArchiveDirectory/${cleanString(collectionRoute)}`).then(res => {
      setCollection(res.data)
    })
  },[])
  useEffect(()=> {
    console.log(`${serverLoc}/getArchiveDirectory/${cleanString(collectionRoute)}`)
    axios.get(`${serverLoc}/getArchiveDirectory/${cleanString(collectionRoute)}`).then(res => {
      setCollection(res.data)
    })
  },[collectionRoute])

  return (
    <div className="mainDiv">
          <h4>Collection viewer!</h4>
          {!collection? <p>Loading...</p> : 
     <div className="collectionDiv">
       {collection.children.sort(keysrt('type')).map((data)=> {
         return (
          <div>
            {data.type == 'directory'? 
              <DirectoryCard collectionRoute={collectionRoute} data={data}/>
              :
              <div className="fileCont">
                <h5>{data.name}</h5>
                <div className="bannerimg" style={{ backgroundImage: `url(${data.imageLink})`}}></div>
                <p className="test">{data.uploadDate}</p>
              </div>
          }
          </div>
         )
       })}
     </div>
    }
    </div>
  )

}

const ItemViewer =()=>{
  const { collectionId } = useParams();
  const [collection, setCollection] = useState()

  useEffect(() => {
    axios.get(`${serverLoc}/getManifest`).then(res => {
      console.log(res.data)
      setCollection(res.data)
    })

  }, [])

  return (
    <div>
      
    </div>
  )

}

const RootViewer =()=> {
  const [collection, setCollection] = useState()

  useEffect(() => {
    axios.get(`${serverLoc}/getManifest`).then(res => {
      console.log(res.data)
      setCollection(res.data)
    })

  }, [])

  return (
    <div className="mainDiv">
        {!collection? <p>Loading...</p> : 
     <div className="collectionDiv">
       {collection.children.map((data)=> {
         return (
          <div className="">
            {data.type == 'directory'? 
              <Link to={`/${cleanString(data.path)}`}>
                <div className="collectionCont">
                <h5>{data.name}</h5>
                <div className="bannerimg" style={{ backgroundImage: `url(${data.imageLink})`}}></div>
                <p className="test">{data.uploadDate}</p>
              </div>
              </Link>
              :
              <div className="fileCont">
                <h5>{data.name}</h5>
                <div className="bannerimg" style={{ backgroundImage: `url(${data.imageLink})`}}></div>
                <p className="test">{data.uploadDate}</p>
              </div>
          }
          </div>
         )
       })}
     </div>
    }
    </div>
  )
}
const App =()=> {
  const [collection, setCollection] = useState()

  return (
    <div className="App">
      <h1>BF Jones Memorial Library Archive web portal</h1>
      <Route exact path="/Collections/" component={RootViewer}></Route>
      <Route path="/:collectionRoute" component={CollectionViewer} />
      <Route path="/items/:collectionID" component={ItemViewer}></Route>
    </div>
  );
}

export default App;
