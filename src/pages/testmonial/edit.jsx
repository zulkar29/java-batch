import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function TestmonialEdit() {
  const [loading, setLoading] = useState(false);
  const [testmonial, setTestmonial] = useState({});
  const [visiblity, setVisiblity] = useState();
  const params = useParams();
  const { token } = useAuth();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const res = axios
      .get(`/testimonials/${params.testmonialid}`)
      .then((response) => {
        setTestmonial(response.data);
        setVisiblity(response.data.is_active);
      });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try{
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image[0]);
    formData.append("status", visiblity);
    const res=await axios.post(`/testimonials/${params.testmonialid}?_method=PATCH`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
    navigate("/testmonial");

    }catch(err){
      console.log("error is " + err);
      setLoading(false);
    }


    
  };

  
const handleVisiblity = (e) => {
    setVisiblity(e.target.value);
}

  return (
    <div>
      {loading ? (
        <div className="overlay-spinner">
          <Spinner />
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>

      <div className="form__control">
          <label className="form__label">User Name</label>
          <input className="input__form" {...register("name")} defaultValue={testmonial.name} />
        </div>

        <div className="form__control">
          <label className="form__label">User Title</label>
          <input className="input__form" {...register("title")} defaultValue={testmonial.title} />
        </div>

        <div className="form__control">
          <label className="form__label">User Testimonial</label>
          <input className="input__form" {...register("content")} defaultValue={testmonial.content} />
        </div>

        <div className="form__control">
            <label className="form__label">User Photo</label>
            <input className="file__form" type="file" {...register("image")} />
          </div>

        <div className="form__control">
       <label className="form__label">Is This Testimonial will be visible?</label>
       <select value={visiblity}  onChange={handleVisiblity}>
       <option value='Yes'>Yes</option>
        <option value='No'>No</option>
      </select>
      </div>

        <input type="submit" className="submit__bitton" value="Update this Testimonial" />
      </form>
    </div>
  );
}

export default TestmonialEdit;
