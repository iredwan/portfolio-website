import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty, validateEmail } from "../helper/helper";
import { login } from "../apiRequest/api";
import Loading from "./Loading";

const LoginForm = () => {
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  let [data, setData] = useState({email: "", password: "",})

  let submitData =  async () => {
    if (IsEmpty(data.email)) {
      ErrorToast("Email is required.");
    }else if(!validateEmail(data.email)){
      ErrorToast("Please enter a valid email address.");
    } else if (IsEmpty(data.password)) {
      ErrorToast("Password is required.");
    } else {
      let result = await login(data);
      if(result){
        navigate("/dashboard")
        setLoading(false);
      }else{
        setLoading(false);
      }
  }
}
  return (
    <section className='bg-gray-100 min-h-screen flex justify-center items-center'>
      {
        loading === true && <Loading />
      }
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10'>
          <div className='max-w-md mx-auto'>
            <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div>
                <label
                  className='font-semibold text-sm text-gray-600 pb-1 block'
                  htmlFor='fullname'
                >
                  Email
                </label>
                <input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                  type='email'
                />
              </div>
              <div>
                <label className='font-semibold text-sm text-gray-600 pb-1 block'>
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                  type='password'
                />
              </div>
            </div>

            <div className='mt-5'>
              <button 
              onClick={submitData}
              className='py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
