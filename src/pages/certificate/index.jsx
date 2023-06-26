import React, {useState, useEffect} from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import DelteIcon from '../../assets/icons/delete.svg';
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
const CertificatePage = () => {
  const [certificates, setCertificates] = React.useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const res = axios.get("/certificates").then(response => {
      setCertificates(response.data);
   })
}, []);


const deleteRequest=(id)=>{
  const confirmation= window.confirm("Are you sure you want to delete this certificate?");
  if(!confirmation) return;
  const res = axios.delete(`/certificates/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    
    const newCertificates=certificates.data.filter((certificate)=>certificate.id!==id);
    setCertificates({...certificates, data:newCertificates});
  })
}


  return (
    <>
    <Link to="/certificate/create" className="create-button" >Add new certificate</Link>

 <table className="table">
    <tr className="table__head__block">
    <th className="table_head">ID</th>
    <th className="table_head">Name</th>
    <th className="table_head">Photo</th>
    <th className="table_head">Action</th>
  </tr>

{certificates?.data?.map((certificate) => {
return (
  <tr className="table__data__block">
  <td className="table__data">{certificate.id}</td>
  <td className="table__data">{certificate.alt_tag}</td>
  <td className="table__data">
  <img className="table__img" src={`${import.meta.env.VITE_IMAGE_ROOT}/images/certificate/${certificate.photo}`}/>
  </td>
  <td className="table__data table__action">
  <span onClick={()=>{deleteRequest(certificate.id)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
  </td>
</tr>
)})}



    </table>
    </>

  );
};

export default CertificatePage;