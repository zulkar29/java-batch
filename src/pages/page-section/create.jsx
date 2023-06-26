import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../components/spinner";
import { useState } from "react";
const CreatePageSection = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
        try{
            const res= axios.post("/pages", data, {
                headers:{
                    Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setLoading(false);
            navigate("/pages");
        })
    
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
                <label className="form__label">Page  Title</label>
                <input className="input__form" {...register("title",{ required: true })} />
                {errors.name?.type === "required" && (
                <p className="font__error">* Name is required field</p>
            )}
            </div>

            <div className="form__control">
                <label className="form__label">Page Slug</label>
                <input className="input__form" placeholder="Please do not use blank space in slug" {...register("slug",{ required: true })} />
                {errors.name?.type === "required" && (
                <p className="font__error">* Slug is required field</p>
            )}
            </div>

            <div className="form__control">
                <label className="form__label">Contents</label>
                <textarea className="input__text-area" {...register("description",{ required: true })} />
                  {errors.description?.type === "required" && (
                    <p className="font__error">* Description is required</p>
                  )}
            </div>
            <div className="form__control"><h3>SEO Section</h3></div>
            <div className="form__control">
                <label className="form__label">Meta Title</label>
                <input className="input__form" {...register("meta_title")} />
            </div>

            <div className="form__control">
                <label className="form__label">Meta Description</label>
                <input className="input__form" {...register("meta_description")} />
            </div>

            <div className="form__control">
                <label className="form__label">Meta keyword</label>
                <input className="input__form" {...register("meta_keyword")} />
            </div>

            <div className="form__control">
                <label className="form__label">Meta Robots</label>
                <input className="input__form" {...register("meta_robots")} />
            </div>

            <input type="submit" className="submit__bitton" value="Add this Page"/>
        </form>
        </>
    )
}
export default CreatePageSection;
