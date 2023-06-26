import React, {useEffect, useState} from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
const ViewContact = () => {
    const [contact, setContact]=useState({});
    const { token } = useAuth();
    const params = useParams();

    console.log(params);
    useEffect(() => {
        const res = axios.get(`/contacts/${params.contactid}`,
         { headers: {Authorization: `Bearer ${token}`}})
         .then(response => {
            setContact(response.data);
        })
    }, []);

    console.log(contact);

    return (        
        <div className="contact__details">
        <h2>Details information from  {contact.name} </h2>
         <div className="contact__details__block">
        <p><b>Phone: </b>{contact.phone}</p>
        <p><b>Email: </b>{contact.email}</p>
        <p><b>Country: </b>{contact.country}</p>
        </div>
        <p><b>Message: </b>{contact.message}</p>   

        <Link to="/contacts" className="btn__back">Back </Link>
        </div>
    );
};

export default ViewContact;