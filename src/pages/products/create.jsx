import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import {useNavigate} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import Spinner from "../../components/spinner";
const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [ppoints, setPpoints] = useState('');
  const [pfeatures, setPfeatures] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();
  const {register,formState: { errors },handleSubmit} = useForm();
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
      formData.append("active", data.active);
      formData.append("is_homepage", data.is_homepage);
      const response = await axios.post("/products", formData, {
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
  
    return (
      <>
         {loading ? <div className="overlay-spinner"><Spinner /></div> : null}
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form__control">
        <label className="form__label">Product Title</label>
        <input className="input__form" placeholder="Exaple: Abc product" {...register("title", { required: true })}/>
        {errors.title?.type === "required" && (
            <p className="font__error">* Porduct Title is required</p>
          )}
      </div>

      <div className="form__control">
          <label className="form__label">Porduct Photo</label>
          <input className="file__form" type="file" {...register("image", { required: true })}/>
          {errors.image?.type === "required" && (
            <p className="font__error">* Porduct Photo is required</p>
          )}
        </div>

      <div className="form__control">
        <label className="form__label">Description</label>
        <textarea className="input__text-area" placeholder="Example: product description" {...register("description")}/>
      </div>

      <div className="form__control">
        <label className="form__label">Key points</label>
        <ReactQuill theme="snow" value={ppoints} onChange={setPpoints} />
      </div>

      <div className="form__control">
        <label className="form__label">Features</label>
        <ReactQuill theme="snow"  value={pfeatures}  onChange={setPfeatures} />
      </div>

      <div className="form__control">
        <label className="form__label">Applications</label>
        <textarea className="input__text-area" {...register("application")} />
      </div>

    
    <div className="form__control">
       <label className="form__label">Is active?</label>
       <select defaultValue="Yes" {...register("active")}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      </div>
    
      <div className="form__control">
       <label className="form__label">Is This product will be visible in home page?</label>
       <select defaultValue="Yes" {...register("is_homepage")}>
       <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      </div>


      <input type="submit" className="submit__bitton" value="Submit Product"/>
    </form>
    </>
    )
}

export default CreateProduct;