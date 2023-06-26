import { useForm } from "react-hook-form";
import axios from "../../../utils/axiosConfig";
import { useAuth } from "../../../context/AuthProvider";
import { useEffect , useState} from "react";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../../components/spinner";
const EditDownload = () => {
  const [loading, setLoading] = useState(false);
  const [donwload, setDownload] = useState({});
  const navigate = useNavigate();
  const { token } = useAuth();
  const { register, formState: { errors }, handleSubmit} = useForm();
  useEffect(() => {
    const res = axios.get("/pages/download").then(response => {
      setDownload(response.data);
      console.log(response.data.title);
    })
  }, []);
  
  const onSubmit = async (data) => {
    setLoading(true);
    try{
      const response = await axios.post("/pages/download?_method=PATCH",data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        setLoading(false);
        navigate("/pages");
      })
    
      // console.log(response.status);
    }catch(err){
      setLoading(false);
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
            <label className="form__label">Page Title</label>
            <input className="input__form" defaultValue={donwload.title} {...register("title")} />
          </div>
          
          <input {...register('slug')} type="hidden" value="download"/>
  
       

        <div className="form__control">
          <label className="form__label">Download page headline</label>
            <input  className="input__form" defaultValue={donwload.option1} {...register("option1")} />
        </div>

        <div className="form__control">
          <label className="form__label">Contents</label>
          <textarea className="input__text-area" defaultValue={donwload.description} {...register("description",{ required: true })} />
                  {errors.description?.type === "required" && (
                    <p className="font__error">* Description is required</p>
                  )}
        </div>

        <div className="form__control"> 
          <label className="form__label">Download URL</label>
          <input className="input__form"  defaultValue={donwload.option2} {...register("option2")} />
        </div>

        <div className="form__control">
          <label className="form__label">Iframe URL</label>
          <input className="input__form"  defaultValue={donwload.option3} {...register("option3")} />
        </div>
        
        <div className="form__control"><h3>SEO Section</h3></div>

        <div className="form__control">
          <label className="form__label">Meta Title</label>
          <input className="input__form"  defaultValue={donwload.meta_title} {...register("meta_title")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Descriptions</label>
          <input className="input__form"  defaultValue={donwload.meta_description} {...register("meta_description")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Keyword</label>
          <input className="input__form"  defaultValue={donwload.meta_keyword} {...register("meta_keyword")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Robots</label>
          <input className="input__form"  defaultValue={donwload.meta_robots} {...register("meta_robots")} />
        </div>
  
        <input type="submit" className="submit__bitton" value="Update This Information"/>
      </form>
      </>
      );
}

export default EditDownload;