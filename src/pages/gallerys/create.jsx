import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../components/spinner";
import { useState } from "react";
const CreateGallery = () => {
  const [loading, setLoading]=useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit} = useForm();
    const onSubmit = async (data) => {
      setLoading(true);
      console.log(data);
      try{
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("description", data.description);
        formData.append("alt_tag", data.alt_tag);
        const response = await axios.post("/gallerys", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
      navigate("/gallerys");
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
    <form  onSubmit={handleSubmit(onSubmit)}>
  
          <div className="form__control">
            <label className="form__label">Gellary Photo</label>
            <input className="file__form" type="file" {...register("image")} />
          </div>
        
        <div className="form__control">
          <label className="form__label">Description</label>
          <textarea className="input__text-area" {...register("description")} />
        </div>
  
        <div className="form__control">
          <label className="form__label">Alt tag</label>
          <input className="input__form" {...register("alt_tag")} />
        </div>
        <input type="submit" className="submit__bitton" value="Submit Gallary"/>
      </form>
      </>
      )
}

export default CreateGallery;