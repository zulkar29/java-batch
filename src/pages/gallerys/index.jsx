import React, {useState, useEffect} from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import "./index.scss";
import { Link } from "react-router-dom";
import EditIcon from '../../assets/icons/edit.svg';
import DelteIcon from '../../assets/icons/delete.svg';
import ReactPaginate from 'react-paginate';

const GalleryPage = () => {
  const [gallerys, setGallerys]=useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const res = axios.get("/gallerys", { headers: {Authorization: `Bearer ${token}`}}).then(response => {
      setGallerys(response.data);
   })
}, []);

const deleteRequest=(id)=>{
  const confirmation= window.confirm("Are you sure you want to delete this gallery?");
  if(!confirmation) return;
  const res=axios.delete(`/gallerys/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    console.log(response);

    const newGallerys=gallerys.data.filter((gallery)=>gallery.id!==id);
    setGallerys({...gallerys, data:newGallerys});
  })
}

const handlePageClick=(e)=>{
  const selectedPage = e.selected;
  const res = axios.get(`/gallerys?page=${selectedPage+1}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    setGallerys(response.data);
    console.log(response.data);
  })
}


  return (
    <>
    <Link to="/gallerys/create" className="create-button" >Add new Photo</Link>

 <table className="table">
    <tr className="gallery__head__block">
    <th className="table_head">SL</th>
    <th className="table_head">Description</th>
    <th className="table_head">Photo</th>
    <th className="table_head">Action</th>
  </tr>

{gallerys?.data?.map((gallery) => {
return (
  <tr className="gallery__data__block">
  <td className="table__data">{gallery.id}</td>
  <td className="table__data">{gallery.description}</td>
  <td className="table__data">
  <img className="table__img" src={`${import.meta.env.VITE_IMAGE_ROOT}/images/gallery/${gallery.image}`}/>
  </td>
  <td className="table__data table__action">
  <Link to={`/gallerys/edit/${gallery.id}`} className="table__edit"> <img src={EditIcon}/> </Link>  
  <span onClick={()=>{deleteRequest(gallery.id)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
  </td>
  </tr>
  )
})}
    </table>

    <div className="paginations">
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={ Math.ceil(gallerys.total / gallerys.per_page)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
  </div>

    </>

  );
};

export default GalleryPage;