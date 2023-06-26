import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../components/spinner";
import { useState } from "react";
const CreateSlider = () => {
  const [loading, setLoading]=useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit} = useForm();
    const onSubmit = async (data) => {
      setLoading(true);
      console.log(data);
      try{
        const formData = new FormData();
        formData.append("Heading", data.Heading);
        formData.append("Description", data.Description);
        formData.append("slide_for", data.slide_for);
        formData.append("image", data.image[0]);
        const response = await axios.post("/sliders", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
      navigate("/slider");
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
          <label className="form__label">Heading</label>
          <input className="input__form" {...register("Heading")} />
        </div>

        <div className="form__control">
          <label className="form__label">Description</label>
          <textarea className="input__text-area" {...register("Description")} />
        </div>

        <div className="form__control">
          <label className="form__label">Slide For</label>
          <select className="option-selector" {...register("slide_for")}>
        <option value='Home' >Home</option>
        <option value='Contact'>Contact</option>
      </select>
      
        </div>

          <div className="form__control">
            <label className="form__label">Slider Photo</label>
            <input className="file__form" type="file" {...register("image")} />
          </div>

        <input type="submit" className="submit__bitton" value="Submit Slider"/>
      </form>
      </>
      )
}

export default CreateSlider;