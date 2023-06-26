import {useEffect, useState, useRef} from 'react';
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Spinner from "../../components/spinner";
import { modules, formats } from "../../components/editor/index";
const EditBlog = () => {
  const [loading, setLoading]=useState(false);
    const [value, setValue] = useState('');
    const [blog, setBlog] = useState({});
    const params = useParams();
    const { token } = useAuth();
    const { register,watch, formState: { errors }, handleSubmit} = useForm();
    const navigate = useNavigate();
    const isActive = watch('is_visable');
    const blogDetails=useRef();


    const handleEditorChange = (content) => {
      setValue(content);
      console.log(content);
    };


    
    const onSubmit = async (data) => {
      setLoading(true);
      try{
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("alt_tag", data.alt_tag);
        formData.append("feature_photo", data.feature_photo[0]);
        formData.append("description", value);
        formData.append("meta_title", data.meta_title);
        formData.append("meta_keywords", data.meta_keywords);
        formData.append("meta_description", data.meta_description);
        formData.append("meta_index", data.meta_index);
        formData.append("is_visable",isActive);
        
        const response = await axios.post(`/blogs/${params.blogid}?_method=PATCH`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        navigate('/blog');
      }catch(err){
      

        if(err.response.status ==401)
        {
          localStorage.removeItem("bjitToken");
          navigate("/login");
        }

      }
    }

    useEffect(() => {
      const res = axios.get(`/blogs/${params.blogid}`).then(response => {
        setBlog(response.data);
        setValue(response.data.description);
      })  
    }, []);

    return (
      <>
          {loading ? <div className="overlay-spinner"><Spinner /></div> : null}
   
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__control">
          <label className="form__label">Blog Title</label>
          <input className="input__form" defaultValue={blog.title} {...register("title")} />
        </div>

        <div className="form__control">
          <label className="form__label">Feature photo</label>
          <input className="input__file" type="file" {...register("feature_photo")} />
        </div>

        <div className="form__control">
          <label className="form__label">Descriptions</label>
    
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />

        </div>
        <div className="form__control"><h3>SEO Section</h3></div>
        <div className="form__control">
          <label className="form__label">Meta title</label>
          <input className="input__form" defaultValue={blog.meta_title} {...register("meta_title")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta description</label>
          <input className="input__form"  defaultValue={blog.meta_description} {...register("meta_description")} />
        </div>

        <div className="form__control">
          <label className="form__label">Meta Keywords</label>
          <input className="input__form"  defaultValue={blog.meta_keywords} {...register("meta_keywords")} />
        </div>
    
        <div className="form__control">
          <label className="form__label">Meta Robots</label>
          <input className="input__form"  defaultValue={blog.meta_index} {...register("meta_index")} />
        </div>

        <div className="form__control">
        <label className="form__label">Is this blog will be visable?</label>
       <select value={blog.is_visable} {...register("is_visable")}>
        <option value='Yes' >Yes</option>
        <option value='No'>No</option>
      </select>
        </div>

        <input type="submit" className="submit__bitton" value="Update Blog Info"/>
      </form>
      </>
    )
}

export default EditBlog;