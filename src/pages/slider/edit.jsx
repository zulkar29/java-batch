import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
const EditSlider = () => {
    const [slider, setSlider] = useState({});
    const [loading, setLoading] = useState(false);
    const { register, watch, formState: { errors }, handleSubmit} = useForm();
    const { token } = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const slideFor = watch('slide_for');
    const onSubmit = async (data) => {
      setLoading(true);
      console.log(data);
    try{
        const formData = new FormData();
        formData.append("Heading", data.Heading);
        formData.append("Description", data.Description);
        formData.append("slide_for", slideFor);
        formData.append("image", data.image[0]);

      const response = await axios.post(`/sliders/${params.sliderid}?_method=PATCH`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    setLoading(false);
    navigate("/slider");
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
      const res = axios.get(`/sliders/${params.sliderid}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } ).then(response => {
        setSlider(response.data);
        console.log(response.data);
      })
    }, []);


  
    return ( 
      <>
      {loading ? <div className="overlay-spinner"><Spinner /></div> : null}
    <form onSubmit={handleSubmit(onSubmit)}>


    <div className="form__control">
          <label className="form__label">Heading</label>
          <input className="input__form" defaultValue={slider.Heading} {...register("Heading")} />
        </div>

        <div className="form__control">
          <label className="form__label">Description</label>
          <textarea className="input__text-area" defaultValue={slider.Description} {...register("Description")} />
        </div>

        <div className="form__control">
          <label className="form__label">Slide For</label>
          <select className="option-selector" {...register("slide_for")} value={slider.slide_for}>
        <option value='Home' >Home</option>
        <option value='Contact'>Contact</option>
      </select>
      
        </div>

          <div className="form__control">
            <label className="form__label">Slider Photo</label>
            <input className="file__form" type="file" {...register("image")} />
          </div>

        <input type="submit" className="submit__bitton" value="Upadate this Slider Information"/>
      </form>
      </>
      )
}

export default EditSlider;