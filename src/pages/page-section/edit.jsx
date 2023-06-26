import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import { useEffect , useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Spinner from "../../components/spinner";
const EditPageSection = () => {
  const [pagesection, setPagesection] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { register, formState: { errors }, handleSubmit} = useForm();
  useEffect(() => {
    const res = axios.get(`/pages/${params.slug}`).then(response => {
      setPagesection(response.data);
      setValue(response.data.description);
      //console.log(response.data.slug);
    })
  }, []); 

  const onSubmit = async (data) => {
    setLoading(true);
    try{
      const response = await axios.post(`/pages/${params.slug}?_method=PATCH`,data, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
       console.log(response.status);
        setLoading(false);
      navigate("/pages");
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
            <label className="form__label">Page Title</label>
            <input className="input__form" defaultValue={pagesection.title} {...register("title")} />
          </div>
  
          <div className="form__control">
          <label className="form__label">Page Slug</label>
            <input  className="input__form" defaultValue={pagesection.slug} {...register("slug")} />
          </div>

        <div className="form__control">
          <label className="form__label">Contents</label>
          <textarea className="input__text-area" defaultValue={pagesection.description} {...register("description",{ required: true })} />
                  {errors.description?.type === "required" && (
                    <p className="font__error">* Description is required</p>
                  )}
        </div>
        <div className="form__control"><h3>SEO Section</h3></div>
        <div className="form__control">
          <label className="form__label">Meta Title</label>
          <input className="input__form"  defaultValue={pagesection.meta_title} {...register("meta_title")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Descriptions</label>
          <input className="input__form"  defaultValue={pagesection.meta_description} {...register("meta_description")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Keyword</label>
          <input className="input__form"  defaultValue={pagesection.meta_keyword} {...register("meta_keyword")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Robots</label>
          <input className="input__form"  defaultValue={pagesection.meta_robots} {...register("meta_robots")} />
        </div>
  
        <input type="submit" className="submit__bitton" value="Update This Information"/>
      </form>
      </>
      )
}

export default EditPageSection;