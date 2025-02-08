import React, { useEffect, useState } from 'react';
import { getAllTeamMembers } from '../apiRequest/api';

const TeamMemberCard = () => {
    const baseURL = "http://localhost:5000/upload-file/";
    const [member, setMember] = useState([]);

    useEffect(() => {
        (async () => {
            let result = await getAllTeamMembers();
            setMember(result);
        })();
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {member?.map((item, index) => (
                    <div key={index} className="p-4 md:my-10"> 
                        <div className="rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="relative mx-4 mt-4 h-48 md:h-72 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"> {/* Adjusted image height */}
                                <img
                                    src={baseURL + item?.image}
                                    className="object-cover w-full h-full"
                                    alt="profile-picture"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h4 className="mb-2 block font-sans text-xl md:text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    {item?.name || "Member Name"} 
                                </h4>
                                <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                                    {item?.role || "Designation"} {/* Display member's designation or a default */}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamMemberCard;