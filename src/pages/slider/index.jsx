import React, {useState, useEffect} from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import "./index.scss";
import { Link } from "react-router-dom";
import EditIcon from '../../assets/icons/edit.svg';
import DelteIcon from '../../assets/icons/delete.svg';
import ReactPaginate from 'react-paginate';

const SliderPage = () => {
  const [sliders, setSliders]=useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const res = axios.get("/sliders", { headers: {Authorization: `Bearer ${token}`}}).then(response => {
      setSliders(response.data);
   })
}, []);

const deleteRequest=(id)=>{
  const confirmation= window.confirm("Are you sure you want to delete this Slider?");
  if(!confirmation) return;
  const res=axios.delete(`/sliders/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    console.log(response);

    const newSlider=sliders.data.filter((slider)=>slider.id!==id);
    setSliders({...sliders, data:newSlider});
  })
}

const handlePageClick=(e)=>{
  const selectedPage = e.selected;
  const res = axios.get(`/sliders?page=${selectedPage+1}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    setSliders(response.data);
    console.log(response.data);
  })
}


  return (
    <>
    <Link to="/slider/create" className="create-button" >Add new Slider</Link>

 <table className="table">
    <tr className="table__head__block">
    <th className="table_head">SL</th>
    <th className="table_head">Heading</th>
    <th className="table_head">Category</th>
    <th className="table_head">Photo</th>
    <th className="table_head">Action</th>
  </tr>

{sliders?.data?.map((slider) => {
return (
  <tr className="table__data__block">
  <td className="table__data">{slider.id}</td>
  <td className="table__data">{slider.Heading}</td>
  <td className="table__data">{slider.slide_for}</td>
  <td className="table__data">
  <img className="table__img" src={`${import.meta.env.VITE_IMAGE_ROOT}/images/slider/${slider.image}`}/>
  </td>
  <td className="table__data table__action">
  <Link to={`/slider/edit/${slider.id}`} className="table__edit"> <img src={EditIcon}/> </Link>  
  <span onClick={()=>{deleteRequest(slider.id)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
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
        pageCount={ Math.ceil(sliders.total / sliders.per_page)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
  </div>

    </>

  );
};

export default SliderPage;