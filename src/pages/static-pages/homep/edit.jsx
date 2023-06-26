import { useForm } from "react-hook-form";
import axios from "../../../utils/axiosConfig";
import { useAuth } from "../../../context/AuthProvider";
import { useEffect , useState} from "react";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../../components/spinner";

const EditpHome = () => {
  const [homep, setHomep] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { register, formState: { errors }, handleSubmit} = useForm();
  useEffect(() => {
    const res = axios.get("/pages/home").then(response => {
      setHomep(response.data);
      console.log(response.data.title);
    })
  }, []);
 
  const onSubmit = async (data) => {
    setLoading(true);
    try{
      const response = await axios.post("/pages/home?_method=PATCH",data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        setLoading(false);
        navigate("/pages");
      })

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
      {loading && <div className="overlay-spinner"><Spinner /></div>}
    <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__control">
            <label className="form__label">Home Page Title</label>
            <input className="input__form" defaultValue={homep.title} {...register("title")} />
          </div>
          
          <input {...register('slug')} type="hidden" value="home"/>

        <div className="form__control">
          <label className="form__label">About Section</label>
          <textarea className="input__text-area" defaultValue={homep.description} {...register("description",{ required: true })} />
                  {errors.description?.type === "required" && (
                    <p className="font__error">* Description is required</p>
                  )}
        </div>

        <div className="form__control"> 
          <label className="form__label">Choose Us Section</label>
          <textarea className="input__text-area" defaultValue={homep.option1} {...register("option1",{ required: true })} />
                  {errors.option1?.type === "required" && (
                    <p className="font__error">* Description is required</p>
                  )}
        </div>

        <div className="form__control">
          <label className="form__label">Faq Section</label>
          <textarea className="input__text-area" defaultValue={homep.option2} {...register("option2",{ required: true })} />
                  {errors.option2?.type === "required" && (
                    <p className="font__error">* Description is required</p>
                  )}
        </div>

        <div className="form__control"><h3>SEO Section</h3></div>
        <div className="form__control">
          <label className="form__label">Meta Title</label>
          <input className="input__form"  defaultValue={homep.meta_title} {...register("meta_title")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Descriptions</label>
          <input className="input__form"  defaultValue={homep.meta_description} {...register("meta_description")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Keyword</label>
          <input className="input__form"  defaultValue={homep.meta_keyword} {...register("meta_keyword")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Robots</label>
          <input className="input__form"  defaultValue={homep.meta_robots} {...register("meta_robots")} />
        </div>
  
        <input type="submit" className="submit__bitton" value="Update This Information"/>
      </form>
      </>
      );   
}

export default EditpHome;