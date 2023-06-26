import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../components/spinner/index";
import { useState } from "react";
const CreateCertificate = () => {
  const [loading, setLoading]=useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit} = useForm();

    const onSubmit = async (data) => {
      setLoading(true);
      console.log(data);
      try{
        const formData = new FormData();
        formData.append("photo", data.photo[0]);
        formData.append("alt_tag", data.alt_tag);
        const response = await axios.post("/certificates", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        navigate("/certificate");
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
            <label className="form__label">Certificate Photo</label>
            <input className="file__form" type="file" {...register("photo")} />
          </div>
    
  
        <div className="form__control">
          <label className="form__label">Alt tag</label>
          <input className="input__form" {...register("alt_tag", { required: true })} />
          {errors.alt_tag?.type === "required" && (
            <p className="font__error">* Alt tag is required</p>
          )}
        </div>
  
    
        <input type="submit" className="submit__bitton" value="Submit Certificate"/>
      </form>
      </>
    )
}

export default CreateCertificate;