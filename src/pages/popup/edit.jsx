import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../components/spinner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function PopupEdit()
{
const [loading, setLoading]=useState(false);
const [Popup, setPopup] = useState({});
const [visiblity, setVisiblity] = useState();
const params = useParams();
const { token } = useAuth();
const { register,watch, formState: { errors }, handleSubmit} = useForm();
const navigate = useNavigate();

const onSubmit = async (data) => {
    setLoading(true);
    try{
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image[0]);
    formData.append("url", data.url);
    formData.append("status", visiblity);

    const res = await axios.post(`/popups/${params.popupid}?_method=PATCH`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setLoading(false);
    navigate("/popup");
}catch(err){
    setLoading(false);
    console.log("error is " + err);
}



};

useEffect(() => {
    const res = axios.get(`/popups/${params.popupid}`).then(response => {
        setPopup(response.data);
    })
}, []);

const handleVisiblity = (e) => {
    setVisiblity(e.target.value);
}


    return (
        <div>
        {loading ? ( <div className="overlay-spinner"> <Spinner /> </div> ) : null}

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__control">
          <label className="form__label">Popup Title</label>
          <input className="input__form"{...register("title")} defaultValue={Popup.title}/>
        </div>

        <div className="form__control">
            <label className="form__label">Popup Descriptions</label>
            <input className="input__form"{...register("content")} defaultValue={Popup.content} />
        </div>


        <div className="form__control">
          <label className="form__label">Popup photo</label>
          <input className="input__file" type="file" {...register("image")} />
        </div>

        <div className="form__control">
            <label className="form__label">Popup URL</label>
            <input className="input__form"{...register("url")}  defaultValue={Popup.url} />
        </div>

        <div className="form__control">
       <label className="form__label">Is This popUp will be visible?</label>
       <select value={visiblity}  onChange={handleVisiblity}>
       <option value='Yes'>Yes</option>
        <option value='No'>No</option>
      </select>
      </div>

        
        <input type="submit" className="submit__bitton" value="Update this Popup" />
      </form>

        </div>
    )

}

export default PopupEdit;