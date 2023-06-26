import { Link } from 'react-router-dom';
import './index.scss';
import axios from "../../utils/axiosConfig";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

function CommonPagwView(){
    const [commonPage, setCommonPage] = useState({});
    const params = useParams();
    useEffect(() => {
        const res = axios.get(`/pages/${params.page}`).then(response => {
            setCommonPage(response.data);
        })
    }, []); 

return(
    <div className="home">
         <h3>Page Title: {commonPage?.title}</h3>
        <p><b>  Description: </b> {commonPage?.description}</p>
        <p><b>  Page slug: </b> {commonPage?.slug}</p>
        <p><b> Meta Title:</b> {commonPage?.title}</p>
        <p> <b> Meta Descriptions: </b>  {commonPage?.meta_description}</p>
        <p><b>  Meta Keywords: </b> {commonPage?.meta_keyword}</p>
        <p><b>  Meta Robots: </b> {commonPage?.meta_robots}</p>
    
        <Link class="create-button" to="/pages/home/edit">Update this page information</Link>
    </div>
)
}

export default CommonPagwView;