import { Link } from 'react-router-dom';
import './index.scss';
import axios from "../../../utils/axiosConfig";
import {useEffect, useState} from "react";
function HomepPage(){
    const [downloadPage, setDownloadPage] = useState({});
    useEffect(() => {
        const res = axios.get("/pages/home").then(response => {
            setDownloadPage(response.data);
        })
    }, []); 

return(
    <div className="home">
        <h3>Page Title: {downloadPage?.title}</h3>
        <p><b>  Description: </b> {downloadPage?.description}</p>
        <p><b>  Page slug: </b> {downloadPage?.slug}</p>
        <p> <b> Download URL:  </b> {downloadPage?.option2}</p>
        <p><b> Meta Title:</b> {downloadPage?.title}</p>
        <p> <b> Meta Descriptions: </b>  {downloadPage?.meta_description}</p>
        <p><b>  Meta Keywords: </b> {downloadPage?.meta_keyword}</p>
        <p><b>  Meta Robots: </b> {downloadPage?.meta_robots}</p>
    
        <Link class="create-button" to="/pages/home/edit">Update this page information</Link>
    </div>
)
}

export default HomepPage;