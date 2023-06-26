import React, {useState, useEffect} from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import "./index.scss";
import { Link } from "react-router-dom";
import EditIcon from '../../assets/icons/edit.svg';
import DelteIcon from '../../assets/icons/delete.svg';

function Testmonial() {
  const [testmonials, setTestmonials]=useState([]);
  const { token } = useAuth();
  useEffect(() => {
    const res = axios.get("/testimonials", { headers: {Authorization: `Bearer ${token}`}}).then(response => {
      setTestmonials(response.data);
    })
  }, []);

  const deleteRequest=(id)=>{
    const confirmation= window.confirm("Are you sure you want to delete this Testmonial?");
    if(!confirmation) return;
    const res = axios.delete(`/testimonials/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
      console.log(response);
      const newTestmonials=testmonials.data.filter((testmonial)=>testmonial.id!==id);
      setTestmonials({...testmonials, data:newTestmonials});
    })
  }

  return (
    <div>
          <a href="https://zulkar.me/api/feedback" target="_blank" className="create-button" >Testmonial submission Link </a>

 <table className="table">
    <tr className="testmonial__head__block">
    <th className="table_head">SL</th>
    <th className="table_head">Name</th>
    <th className="table_head">Description</th>
    <th className="table_head">Image</th>
    <th className="table_head">Action</th>
  </tr>
    {
      testmonials.data && testmonials.data.map((testmonial, index) => {
        return (
          <tr className="testmonial__body__block">
            <td className="table_body">{index+1}</td>
            <td className="table_body">{testmonial.name}</td>
            <td className="table_body">{testmonial.content}</td>
            <td className="table_body"> 
            <img className="testmonial__img" src={`${import.meta.env.VITE_IMAGE_ROOT}/images/testimonial/${testmonial.image}`}/>
            </td>
            <td className="table_body">
              <Link to={`/testmonial/edit/${testmonial.id}`} className="edit-button" ><img src={EditIcon} alt="edit"/></Link>
              <button className="delete-button" onClick={()=>deleteRequest(testmonial.id)}> <img  src={DelteIcon} alt="delete" /></button>
            </td>
          </tr>
        )
      }
      )
    }
</table>
    </div>
  );
}

export default Testmonial;