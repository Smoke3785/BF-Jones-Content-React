import { useEffect, useState } from "react"
import axios from "axios"
const cleanString =(str)=> {
    if (!str) return
    let clean1 = str.replaceAll('/', '%2F')
    let clean2 = clean1.replaceAll('\\','%2F')
    return clean2
  }
  const keysrt =(key)=> {
    if (!key) return
    return (a,b) => {
     if (a[key] > b[key]) return 1;
     if (a[key] < b[key]) return -1;
     return 0;
    }
  }
let serverLoc = `http://localhost:5000/api/v1`

const FileCard =({...props})=> {
    let data = props.data
    useEffect(() => {
        // setCardData(props.data)
    }, [])

return (
  <div className="card fileCard" style={{ 
    backgroundImage: `url(${serverLoc}/getImageFile/${cleanString(data?.path)})`
    }}>
    <div>
      <div><p>{data?.children?.length}</p></div>

    </div>
    <div><h3>{data?.name}</h3></div>
  </div>
)
}
export default FileCard;