import './index.scss';
import {Link} from 'react-router-dom';
import EditIcon from '../../assets/icons/edit.svg';
import ViewIcon from '../../assets/icons/view.svg';
import { useState, useEffect } from 'react';
import axios from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import DelteIcon from '../../assets/icons/delete.svg';

function PageSection() {
    const [pages, setPages] = useState([]);
    const { token } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("bjitToken") === null) {
            navigate("/login");
        }
        const res = axios.get("/pages", { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            setPages(response.data);
        })
    }, []);

    const deleteRequest=(slug)=>{
        const confirmation= window.confirm("Are you sure you want to delete this Page?");
        if(!confirmation) return;
        const res = axios.delete(`/pages/${slug}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
            console.log(response);
            const newFaqs=pages.data.filter((page)=>page.slug!==slug);
            setPages({...pages, data:newFaqs});
          })
        }    

    console.log(pages);

  return (
    <section>
        <div className='pages-header'>
            <h2 className='pages-title' align="left">All Pages</h2>
            <Link to='/pages/create' className='create-button'>Add new page</Link>
        </div>

        <table className='pages-table table'>
            <thead>
                <tr className="table__head__block">
                    <th className="table_head">Page Title</th>
                    <th className="table_head">Page Slug</th>
                    <th className="table_head">Action</th>
                </tr>
            </thead>
            <tbody className='pages-table-body'>      
            {pages?.data?.map((page, index) => {
                return(
         <tr>
         <td>{page.title}</td>
         <td>{page.slug}</td>
         <td className='table-action'>
         <Link to={`${page?.slug}/edit`} className="table__edit"> <img src={EditIcon}/> </Link>  
         <Link to={page?.slug} className="table__view"> <img src={ViewIcon}/> </Link> 
         <span onClick={()=>{deleteRequest(page.slug)}} className="table__delete" > <img  src={DelteIcon} alt="delete" /> </span>
         </td>
     </tr>
            ) }
            )}
            </tbody> 
        </table>
    </section>
  );
}

export default PageSection;