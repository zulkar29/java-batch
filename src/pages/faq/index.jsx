import React, {useState, useEffect} from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import "./index.scss";
import { Link } from "react-router-dom";
import EditIcon from '../../assets/icons/edit.svg';
import DelteIcon from '../../assets/icons/delete.svg';
import ReactPaginate from 'react-paginate';

const FaqPage = () => {

  const [faqs, setFaqs]=useState([]);
  const { token } = useAuth();

    useEffect(() => {
    const res = axios.get("/faqs", { headers: {Authorization: `Bearer ${token}`}}).then(response => {
      setFaqs(response.data);
   })
}, []);

const deleteRequest=(id)=>{
  const confirmation= window.confirm("Are you sure you want to delete this Faq?");
  if(!confirmation) return;
  const res = axios.delete(`/faqs/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    console.log(response);
    const newFaqs=faqs.data.filter((faq)=>faq.id!==id);
    setFaqs({...faqs, data:newFaqs});
  })
}

const handlePageClick=(e)=>{
  const selectedPage = e.selected;
  const res = axios.get(`/faqs?page=${selectedPage+1}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    setFaqs(response.data);
  })
}

  return (
    <>
    <Link to="/faq/create" className="create-button" >Add new Faq</Link>

 <table className="table">
    <tr className="faq__head__block">
    <th className="table_head">SL</th>
    <th className="table_head">Title</th>
    <th className="table_head">Description</th>
    <th className="table_head">Action</th>
  </tr>

{faqs?.data?.map((faq) => {
return (
  <tr className="faq__data__block">
  <td className="table__data">{faq.id}</td>
  <td className="table__data">{faq.question}</td>
  <td className="table__data">{faq.answer}</td>
  <td className="table__data table__action">
  <Link to={`/faq/edit/${faq.id}`} className="table__edit"> <img src={EditIcon}/> </Link>  
  <span onClick={()=>{deleteRequest(faq.id)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
  </td>
  </tr>
  )
}
)}
    </table>
    <div className="paginations">
    <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageCount={ Math.ceil(faqs.total / faqs.per_page)}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
      />
      
  </div>

    </>
  );
};

export default FaqPage;