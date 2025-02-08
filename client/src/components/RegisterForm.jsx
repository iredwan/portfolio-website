import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileImport } from "react-icons/fa";
import { ErrorToast, IsEmpty, validateEmail } from "../helper/helper";
import { fileUpload, register } from "../apiRequest/api";
const RegisterForm = () => {
  const [file, setFile] = useState(null);
  let navigate = useNavigate();
  let [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    img: "",
  });

  let fileUploadFun = async (e) => {
    e.preventDefault();
    if (!file) {
      ErrorToast("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const result = await fileUpload(formData);
    setData({ ...data, img: result?.data?.file?.[0]?.filename });
  };



  let submitData = async () => {
    if (IsEmpty(data.email)) {
      ErrorToast("Email is required.");
    }else if(!validateEmail(data.email)){
      ErrorToast("Please enter a valid email address.");
    }else if (IsEmpty(data.password)) {
      ErrorToast("Password is required.");
    } else if (IsEmpty(data.firstName)) {
      ErrorToast("First Name is required.");
    } else if (IsEmpty(data.lastName)) {
      ErrorToast("Last Name is required.");
    } else if (IsEmpty(data.phone)) {
      ErrorToast("Phone is required.");
    } else if (IsEmpty(data.img)) {
      ErrorToast("Image is required.");
    } else {
      let result = await register(data);

      if (result) {
        // window.location.href = "/";
        navigate("/dashboard-login");
      }
    }
  };

  return (
    <section className='bg-gray-100 min-h-screen flex justify-center items-center'>
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
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
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
              <div>
                <label className='font-semibold text-sm text-gray-600 pb-1 block'>
                  First Name
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                  type='text'
                />
              </div>
              <div>
                <label className='font-semibold text-sm text-gray-600 pb-1 block'>
                  Last Name
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                  type='text'
                />
              </div>
              <div>
                <label className='font-semibold text-sm text-gray-600 pb-1 block'>
                  Phone
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...data, phone: e.target.value })
                  }
                  className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                  type='text'
                />
              </div>
              <form onSubmit={fileUploadFun}>
                  <div className="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center ">
                    <div class="absolute">
                      <div class="flex flex-col items-center">
                        <FaFileImport className="size-14 text-blue-600" />
                        <span class="block text-gray-400 font-normal">
                          Attach you files here
                        </span>
                      </div>
                    </div>

                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      class="h-full w-full opacity-0 cursor-pointer"
                      name=""
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="p-1 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white mt-2 text-white w-full rounded-lg"
                      type="submit"
                    >
                      Upload
                    </button>
                  </div>
                  {/* <div className='relative'>
                      <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type='file'
                      />
                      <button type='submit'>Upload</button>
                    </div> */}
                </form>
            </div>

            <div className='mt-5'>
              <button
                onClick={submitData}
                className='py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
