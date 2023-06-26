import React, {useState, useEffect} from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import EditIcon from '../../assets/icons/edit.svg';
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import DelteIcon from '../../assets/icons/delete.svg';
import ReactPaginate from 'react-paginate';

const ProductPage = () => {
  const [products, setProducts]=useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const res = axios.get("/products", { headers: {Authorization: `Bearer ${token}`}}).then(response => {
      setProducts(response.data);
      console.log(response.data);
   })
}, []);

const deleteRequest=(id)=>{
  const confirmation= window.confirm("Are you sure you want to delete this product?");
  if(!confirmation) return;
  const res=axios.delete(`/products/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    console.log(response);
    const newProducts=products.data.filter((product)=>product.id!==id);
    setProducts({...products, data:newProducts});
  })
}

const handlePageClick=(e)=>{
  const selectedPage = e.selected;
  const res = axios.get(`/products?page=${selectedPage+1}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    setProducts(response.data);
    console.log(response.data);
  })
}


  return (
    <>
    <Link to="/products/create" className="create-button" >Add new Product</Link>

 <table className="table">
    <tr className="table__head__block">
    <th className="table_head">SL</th>
    <th className="table_head">Name</th>
    <th className="table_head">Photo</th>
    <th className="table_head">Action</th>
  </tr>


{products?.data?.map((product) => {
return (
  <tr className="table__data__block">
  <td className="table__data">{product.id}</td>
  <td className="table__data">{product.title}</td>
  <td className="table__data">
  <img className="table__img" src={`${import.meta.env.VITE_IMAGE_ROOT}/images/product/small/${product.image}`}/>
  </td>
  <td className="table__data table__action">
  <Link to={`/products/edit/${product.id}`} className="table__edit"> <img src={EditIcon}/> </Link>  
  <span onClick={()=>{deleteRequest(product.id)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
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
        pageCount={ Math.ceil(products.total / products.per_page)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
  </div>


    </>

  );
};

export default ProductPage;