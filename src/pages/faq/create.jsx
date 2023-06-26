import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../components/spinner";
import { useState } from "react";
const CreateFaq = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit} = useForm();
    const onSubmit = async (data) => {
      setLoading(true);

      console.log(data);
    try{
      const response = await axios.post("/faqs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    setLoading(false);
    navigate("/faq");
  }
    catch(err){
    
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
            <label className="form__label">Faq Question</label>
            <input className="input__form" {...register("question",{ required: true })} />
            {errors.question?.type === "required" && (
            <p className="font__error">* Question is required field</p>
          )}
          </div>


        <div className="form__control">
          <label className="form__label">Faq answer</label>
          <textarea className="input__text-area" {...register("answer",{ required: true })} />
          {errors.answer?.type === "required" && (
            <p className="font__error">* Answer is required</p>
          )}
        </div>
  
        <input type="submit" className="submit__bitton" value="Submit FAQ"/>
      </form>
      </>
      )
}

export default CreateFaq;