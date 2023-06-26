import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
const EditGallery = () => {
    const [gallery, setGallery] = useState({});
    const [loading, setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit} = useForm();
    const { token } = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = async (data) => {
      setLoading(true);
      console.log(data);
    try{
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("description", data.description);
        formData.append("alt_tag", data.alt_tag);


      const response = await axios.post(`/gallerys/${params.galleryid}?_method=PATCH`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    setLoading(false);
    navigate("/gallerys");
  }
    catch(err){
      
      if(err.response.status ==401)
      {
        localStorage.removeItem("bjitToken");
        navigate("/login");
      }
      
    }
    }
    useEffect(() => {
      const res = axios.get(`/gallerys/${params.galleryid}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } ).then(response => {
        setGallery(response.data);
      })
    }, []);


  
    return ( 
      <>
      {loading ? <div className="overlay-spinner"><Spinner /></div> : null}
    <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__control">
            <label className="form__label">Gellary Photo</label>
            <input className="file__form" type="file" {...register("image")} />
          </div>
     

        <div className="form__control">
          <label className="form__label">Description</label>
          <textarea className="input__text-area" defaultValue={gallery.description} {...register("description")} />
        </div>
  
        <div className="form__control">
          <label className="form__label">Alt tag</label>
          <input className="input__form" defaultValue={gallery.alt_tag} {...register("alt_tag")} />
        </div>

        <input type="submit" className="submit__bitton" value="Upadate this Gallery Information"/>
      </form>
      </>
      )
}

export default EditGallery;