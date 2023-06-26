import { Link } from 'react-router-dom';
import './index.scss';
import axios from "../../../utils/axiosConfig";
import {useEffect, useState} from "react";
function DownloadPage(){
    const [downloadPage, setDownloadPage] = useState({});
    useEffect(() => {
        const res = axios.get("/pages/download").then(response => {
            setDownloadPage(response.data);
        })
    }, []);

return(
    <div className="download-page">
        <h3>Page Title: {downloadPage?.option1}</h3>
        <p><b>  Description: </b> {downloadPage?.description}</p>
        <p><b>  Page slug: </b> {downloadPage?.slug}</p>
        <p><b> Download URL:  </b> {downloadPage?.option2}</p>
        <p><b> Meta Title:</b> {downloadPage?.title}</p>
        <p><b> Meta Descriptions: </b>  {downloadPage?.meta_description}</p>
        <p><b>  Meta Keywords: </b> {downloadPage?.meta_keyword}</p>
        <p><b>  Meta Robots: </b> {downloadPage?.meta_robots}</p>
    
        <Link class="create-button" to="/pages/download/edit">Update this page information</Link>
    </div>
)
}

export default DownloadPage;