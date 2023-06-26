import React, { useEffect ,useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import DelteIcon from '../../assets/icons/delete.svg';
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import ReactPaginate from 'react-paginate';


const SubscribePage = () => {
const [datas, setDatas] = useState([]);
const { token } = useAuth();
const [pageNo, setPageNo] = useState(1);

useEffect(() => {
  const res = axios.get(`subscribes?page=${pageNo}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    setDatas(response.data);
    console.log(response.data);

    console.log( Math.ceil(datas.total / datas.per_page))
 })
}, []);

const handlePageClick=(e)=>{
  const selectedPage = e.selected;
  setPageNo(selectedPage+1);
  const res = axios.get(`subscribes?page=${selectedPage+1}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
    setDatas(response.data);
    console.log(response.data);
  })
}


const deleteRequest=(id)=>{
const confirmation= window.confirm("Are you sure you want to delete this Subscriber?");
if(!confirmation) return;
const res= axios.delete(`/subscribes/${id}`, { headers: {Authorization: `Bearer ${token}`}}).then(response => {
  console.log(response);
 const newDatas=datas.data.filter((data)=>data.id!==id);
  setDatas({...datas, data:newDatas});

})
}
  return (
    <>
 <table className="table">
    <tr className="table__head__block">
    <th className="table_head">SL</th>
    <th className="table_head">Email</th>
    <th className="table_head">Date</th>
    <th className="table_head">Action</th>
  </tr>

{datas.data?.map((item ,index) => {
return(
<tr className="table__data__block">
<td className="table__data">{item.id}</td>
<td className="table__data">{item.email}</td>
<td className="table__data">{item.created_at}</td>
<td className="table__data table__action">
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
        pageCount={ Math.ceil(datas.total / datas.per_page)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
  </div>

    </>
  );
};

export default SubscribePage;