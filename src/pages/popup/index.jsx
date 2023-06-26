import {useState, useEffect} from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import "./index.scss";
import { Link } from "react-router-dom";
import EditIcon from '../../assets/icons/edit.svg';
import DelteIcon from '../../assets/icons/delete.svg';

function Popup(){
    const [popups, setPopups]=useState([]);
    const { token } = useAuth();
    useEffect(() => {
        const res = axios.get("/dpopups", { headers: {Authorization: `Bearer ${token}`}}).then(response => {
            setPopups(response.data);
        })
    }, []);

    const deleteRequest=(id)=>{
        const confirmation= window.confirm("Are you sure you want to delete this Popup?");
        if(!confirmation) return;
        const res = axios.delete(`/popups/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
            console.log(response);
            const newPopups=popups.data.filter((popup)=>popup.id!==id);
            setPopups({...popups, data:newPopups});
        })
    }

    return(
        <div>
      {popups?.data?.length<1 && (<Link to="/popup/create" className="create-button" >Add new PopUp</Link>)}      
    
    <table className="table">
    <tr className="popup__head__block">
    <th className="table_head">SL</th>
    <th className="table_head">Title</th>
    <th className="table_head">Description</th>
    <th className="table_head">Image</th>
    <th className="table_head">Action</th>
  </tr>

{popups?.data?.map((popup) => {
return (
    <tr className="popup__data__block">
    <td className="table__data">{popup.id}</td>
    <td className="table__data">{popup.title}</td>
    <td className="table__data">{popup.content}</td>
    <td className="table__data  popup-image"><img src={`${import.meta.env.VITE_IMAGE_ROOT}/images/popup/${popup.image}`} alt="no image"/> </td>
    <td className="table__data">
    <Link to={`/popup/edit/${popup.id}`} className="edit-button" > <img src={EditIcon} alt="edit"/> </Link>
    <button className="delete-button" onClick={()=>deleteRequest(popup.id)}> <img  src={DelteIcon} alt="delete" /></button>
    </td>
    </tr>
)
})}

</table>
        </div>

    )
}

export default Popup;