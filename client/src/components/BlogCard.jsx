import React, { useEffect, useState } from 'react';
import { getAllBlog, } from '../apiRequest/api';

const BlogCard = () => {
    const baseURL = "http://localhost:5000/upload-file/";
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        (async () => {
            let result = await getAllBlog();
            setBlog(result);
        })();
    }, []);

  return (
    <div className="container mx-auto py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
      {blog?.map((item, index) => (
                    <div key={index} className="p-4 md:my-10"> 
        <div className="col-span-1"> 
          <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-full"> 
            <div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
              <img
                src={baseURL + item?.image}
                alt="profile-picture"
                className="object-cover w-full h-48" 
              />
            </div>
            <div className="p-6 flex flex-col flex-grow"> 
              <h4 className="text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {item?.title || "Title"} 
              </h4>
              {
                item?.content?.length > 50
                 ? item?.content?.slice(0, 60) + "..."
                  : item?.content || "Description"
              }
              <div className="mt-auto"> 
                <p className="font-sans text-end text-base font-normal leading-relaxed text-inherit antialiased">
                {item?.author || "Designation"}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

))}
      </div>
    </div>
  );
};

export default BlogCard;