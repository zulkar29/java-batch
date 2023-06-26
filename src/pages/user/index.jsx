import './index.scss';
import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
function UserProfile(){
const [user, setUser] = useState({});
const { token } = useAuth();
useEffect(() => {
    try{
        const res= axios.get('/v1/users', { headers: {Authorization: `Bearer ${token}`}}).then(response => {
            setUser(response.data);
        })
    }catch(err){
        
        if(err.response.status === 401){

            localStorage.removeItem("bjitToken");
            navigate("/login");
        }
    }




}, []);

    return(
<>
<h3 className='user-header'>User profile info</h3>
<div className="user-profile">
<p>Name: {user?.name} </p>
<p>Email: {user?.email} </p> 
 </div>
  </>
  
    )
};

export default UserProfile;