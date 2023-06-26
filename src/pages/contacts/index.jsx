import React, {useEffect, useState} from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import ViewIcon from '../../assets/icons/view.svg';
import DelteIcon from '../../assets/icons/delete.svg';
import {useNavigate} from 'react-router-dom';
const ContactPage = () => {
  const [constcts, setContacts]=useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
    useEffect(() => {
    const res = axios.get("/contacts", { headers: {Authorization: `Bearer ${token}`}}).then(response => {
      setContacts(response.data);
   })
}, []);

const deleteRequest=(id)=>{
  const confirmation= window.confirm("Are you sure you want to delete this contact?");
  if(!confirmation) return;
  const res= axios.delete(`/contacts/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    console.log(response);
    const newDatas=constcts.data.filter((data)=>data.id!==id);
    setContacts({...constcts, data:newDatas});
  })

}

  return (
    <>
 <table className="table">
    <tr className="table__head__block">
    <th className="table_head">Name</th>
    <th className="table_head">Email</th>
    <th className="table_head">Phone</th>
    <th className="table_head">Action</th>
  </tr>
{constcts?.data?.map((contact, index) => {
return (
  <tr key={contact.id} className="table__data__block">
    <td className="table__data">{contact.name}</td>
    <td className="table__data">{contact.email}</td>
    <td className="table__data">{contact.phone}</td>
    <td className="table__data table__action">
    <Link to={`/contact/view/${contact.id}`} className="table__view"> <img src={ViewIcon}/> </Link>   
    <span onClick={()=>{deleteRequest(contact.id)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
    </td>
  </tr>
)
})}


    </table>
    </>
  );
};

export default ContactPage;