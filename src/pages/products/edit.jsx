import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import {useNavigate, useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from "../../components/spinner";

const EditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [ppoints, setPpoints] = useState('');
  const [pfeatures, setPfeatures] = useState('');

  const [isHomePage, setIsHomePage] = useState();
  const [isActive, setIsActive] = useState();

  const [product, setProduct] = useState({});
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const {register, formState: { errors },handleSubmit} = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image[0]);
      formData.append("description", data.description);
      formData.append("key_points", ppoints);
      formData.append("features", pfeatures);
      formData.append("application", data.application);
      formData.append("active",isActive);
      formData.append("is_homepage", isHomePage);
      
      const response = await axios.post(`/products/${params.productid}?_method=PATCH`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      navigate("/products");
    }catch(err){
      if(err.response.status ==401)
      {
        localStorage.removeItem("bjitToken");
        navigate("/login");
      }
    }
  }

  const handleHomeStatus = (e) => {
    setIsHomePage(e.target.value);
    console.log(e.target.value);
  }
  
  const hadleProductStatus = (e) => {
  setIsActive(e.target.value);
  }

  useEffect(() => {
    const res = axios.get(`/products/${params.productid}`).then(response => {
      setProduct(response.data);
      setPpoints(response.data.key_points);
      setPfeatures(response.data.features);
      setIsActive(response.data.active);
      setIsHomePage(response.data.is_homepage);
   })
}, []);

    return (
      <>
          {loading ? <div className="overlay-spinner"><Spinner /></div> : null}
     
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form__control">
        <label className="form__label">Product Title</label>
        <input className="input__form" defaultValue={product.title} placeholder="Exaple: Abc product" {...register("title")}/>
      </div>

      <div className="form__control">
          <label className="form__label">Porduct Photo</label>
          <input className="file__form" type="file" {...register("image")}/>
        </div>

      <div className="form__control">
        <label className="form__label">Description</label>
        <textarea defaultValue={product.description} className="input__text-area" placeholder="Example: product description" {...register("description")}/>
      </div>


      <div className="form__control">
        <label className="form__label">Key points</label>
        <ReactQuill theme="snow" value={ppoints} onChange={setPpoints}/>
      </div>

      <div className="form__control">
        <label className="form__label">Features</label>
        <ReactQuill theme="snow" value={pfeatures}  onChange={setPfeatures}  defaultValue={product.features} />
      </div>

      <div className="form__control">
        <label className="form__label">application</label>
        <textarea className="input__text-area" defaultValue={product.application} {...register("application")} />
      </div>



    
    <div className="form__control">
       <label className="form__label">Is This product will be visible?</label>
       <select value={product.active}  onChange={hadleProductStatus}>
        <option value='Yes'>Yes</option>
        <option value='No'>No</option>
      </select>
      </div>

      <div className="form__control">
       <label className="form__label">Is This product will be visible in home page?</label>
       <select value={isHomePage}  onChange={handleHomeStatus}>
       <option value='Yes'>Yes</option>
        <option value='No'>No</option>
      </select>
      </div>
    

      <input type="submit" className="submit__bitton" value="Update this product info"/>
    </form>
    </>
    )
}

export default EditProduct;