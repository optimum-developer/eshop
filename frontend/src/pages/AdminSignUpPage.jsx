import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signup from "../components/Admin/Signup";

const AdminSignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/admin/dashboard");
    }
  }, [])
  return (
    <div>
        <Signup />
    </div>
  )
}

export default AdminSignupPage