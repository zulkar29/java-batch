import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
function PopupCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("image", data.image[0]);
      formData.append("url", data.url);
      formData.append("status", data.status);

      const res = await axios.post("/popups", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      navigate("/popup");

    } catch (err) {
      console.log("error is " + err);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="overlay-spinner">
          <Spinner />
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__control">
          <label className="form__label">Popup Title</label>
          <input className="input__form"{...register("title")} />
        </div>

        <div className="form__control">
            <label className="form__label">Popup Descriptions</label>
            <input className="input__form"{...register("content")} />
        </div>


        <div className="form__control">
          <label className="form__label">Popup photo</label>
          <input className="input__file" type="file" {...register("image")} />
        </div>

        <div className="form__control">
            <label className="form__label">Popup URL</label>
            <input className="input__form"{...register("url")} />
        </div>

   <div className="form__control">
       <label className="form__label">Is this popup will be visiable?</label>
       <select value="Yes" {...register("status")}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      </div>
        
        <input type="submit" className="submit__bitton" value="Create this Popup" />
      </form>
    </div>
  );
}

export default PopupCreate;