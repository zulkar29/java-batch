import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from '../../assets/icons/edit.svg';
import DelteIcon from '../../assets/icons/delete.svg';
import "./index.scss";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import ReactPaginate from 'react-paginate';

const BlogPage = () => {
  const [blogs, setBlogs] = React.useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const res = axios.get("/blogs").then(response => {
      setBlogs(response.data);
   })
}, []);

const deleteRequest=(id)=>{
  const confirmation= window.confirm("Are you sure you want to delete this blog?");
  if(!confirmation) return;
  const res = axios.delete(`/blogs/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    console.log(response);
    const newBlogs=blogs.data.filter((blog)=>blog.id!==id);
    setBlogs({...blogs, data:newBlogs});
  })
}

const handlePageClick = (e) => {
  const selectedPage = e.selected;
  const res = axios.get(`/blogs?page=${selectedPage+1}`).then(response => {
    setBlogs(response.data);
  })
  

};
  return (
    <>
    <Link to="/blog/create" className="create-button" >Create new blog</Link>

 <table className="table">
    <tr className="table__head__block">
    <th className="table_head">Sl</th>
    <th className="table_head">Blog Title</th>
    <th className="table_head">Photo</th>
    <th className="table_head">Action</th>
  </tr>

{blogs?.data?.map((item) => {
return(
  <tr className="table__data__block">
    <td className="table__data">{item.id}</td>
    <td className="table__data">{item.title}</td>
    <td className="table__data">
      <img className="blog__img" src={`${import.meta.env.VITE_IMAGE_ROOT}/images/blog/small/${item.feature_photo}`}/>
    </td>
    <td className="table__data table__action">
    <Link to={`/blog/edit/${item.slug}`} className="table__edit"> <img src={EditIcon}/> </Link>  
    <span onClick={()=>{deleteRequest(item.id)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
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
        pageCount={ Math.ceil(blogs.total / blogs.per_page)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
  </div>
    </>

  );
};

export default BlogPage;