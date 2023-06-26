import { useForm } from "react-hook-form";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthProvider";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useEffect , useState} from "react";
import Spinner from "../../components/spinner";
const EditFaq = () => {
  const [loading, setLoading] = useState(false);
  const [faq, setFaq] = useState({});
  const { token } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
    const { register, formState: { errors }, handleSubmit} = useForm();
    const onSubmit = async (data) => {
      setLoading(true);
    try{
        const formData = new FormData();
        formData.append("question", data.question);
        formData.append("answer", data.answer);

      const response = await axios.post(`/faqs/${params.faqid}?_method=PATCH`, formData, {
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

    useEffect(() => {
      const res = axios.get(`/faqs/${params.faqid}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } ).then(response => {
        setFaq(response.data);
      })
    }, []);
    return ( 
      <>

      {loading ? <div className="overlay-spinner"><Spinner /></div> : null}

     
    <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__control">
            <label className="form__label">Faq Question</label>
            <input className="input__form" defaultValue={faq.question} {...register("question")} />
          </div>


        <div className="form__control">
          <label className="form__label">Faq answer</label>
          <input className="input__form"  defaultValue={faq.answer} {...register("answer")} />
        </div>
  
        <input type="submit" className="submit__bitton" value="Update This Faq"/>
      </form>
      </>
      )
}

export default EditFaq;