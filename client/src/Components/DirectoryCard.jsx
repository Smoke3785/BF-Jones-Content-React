import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { FaFolder } from "react-icons/fa";
import {useEffect} from 'react'
import axios from 'axios'
let serverLoc = `http://localhost:5000/api/v1`
const cleanString =(str)=> {
    let clean1 = str.replaceAll('/', '%2F')
    let clean2 = clean1.replaceAll('\\','%2F')
    return clean2
}
const DirectoryCard =({...props})=> {
    let data = props.data
    let collectionRoute = props.collectionRoute
    return (
        <Link className="link-bf" to={`/${cleanString(data.path)}`}>
        <div style={{backgroundImage: `url(${serverLoc}/getDirImage/${cleanString(data.path)})`}} className="card">
        <div>
            <div><p>{data?.children?.length}</p></div>

            </div>
            <div><h3>{data?.name}</h3></div>

        </div>
        </Link>
    )
}
export default DirectoryCard;