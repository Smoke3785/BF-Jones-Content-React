import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, useRef, useHook } from 'react'
import DirectoryViewer from './Components/DirectoryViewer'
import FileCard from './Components/FileCard'
import { useParams } from "react-router-dom";
import DirectoryCard from './Components/DirectoryCard'
let serverLoc = process.env.REACT_APP_SERVER
// 23572
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
  const frameRef = useRef()
  const [collection, setCollection] = useState()
  const [limitPage, setLimitPage] = useState(1)
  const onScreen = useOnScreen(frameRef, '0px');
  // useEffect(()=> {
  //   if (!typeof window) return
  //   window.onscroll =()=> {
  //     if (onScreen) {
  //       setLimitPage(prev => prev + 1)
  //       console.log(onScreen)
  //     }
  //   }
  // },[])
  useEffect(() => {
    window.onscroll =()=> {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setLimitPage(prev => prev + 1)
      }
    }
  }, [])
  useEffect(()=> {
    setLimitPage(1)
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
          {/* <h4>Collection viewer!</h4> */}
          {!collection? <p>Loading...</p> : 
     <div className="collectionDiv">
       {collection.children.sort(keysrt('type')).slice(0, limitPage * 10).map((data, idx)=> {
         return (
          <>
            {data.type == 'directory'? 
              <DirectoryCard idx={idx} collectionRoute={collectionRoute} data={data}/>
              :
              <FileCard data={data}/>
          }
          </>
         )
       })}

       {/* <div ref={frameRef} className="loadMoreBtn" style={limitPage * 10 >= collection?.children?.length? {display: 'none'} : {}}onClick={()=> {
            setLimitPage(prev => prev + 1)
          }}>
          <h6>Load More</h6>
       </div> */}
     </div>
    }
    </div>
  )
}
const useOnScreen =(ref, rootMargin = "-0px") => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  useEffect(()=>{
      const observer = new IntersectionObserver(
          ([entry]) => {
              setIsIntersecting(entry.isIntersecting)
          },
          {rootMargin}
      );
      if (ref.current) {
          observer.observe(ref.current)
      }
      return ()=> {
          if (ref.current) observer.unobserve(ref.current)
      }
  },[])
  return isIntersecting;
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
  const collectionRoute = useParams;
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
            <FileCard />
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
      {/* <Route exact path="/Collections/" component={RootViewer}></Route> */}
      <Route path="/:collectionRoute" component={CollectionViewer} />
      <Route path="/items/:collectionID" component={ItemViewer}></Route>
    </div>
  );
}

export default App;



