"use client";

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import { parsePhoneNumberFromString } from 'libphonenumber-js';



const UpdateProfile = () => {
  const { user, error, loading, updateProfile, clearErrors } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default.png");

  

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNo(user.phoneNo || "");
      setDob(user.dob ? user.dob.split('T')[0] : ""); // Assuming dob is stored in ISO format
      setGender(user.gender || "");
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [user, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phoneNo", phoneNo);
    formData.set("dob", dob);
    formData.set("gender", gender);
    formData.set("image", avatar);

    updateProfile(formData);
  };

  

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };

    setAvatar(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

 

  

  return (
    <div style={{ maxWidth: "480px" }} className="mt-1 mb-20 p-4 md:p-7 mx-auto border rounded-2xl border-gray-300">
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Edit Profile Details</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            className="appearance-none border border-gray-200  rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            className="appearance-none border border-gray-200  rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="email"
            placeholder="Type your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input
            className="appearance-none border border-gray-200  rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="tel"
            placeholder="Type your phone number"
            value={phoneNo}
            pattern="^\+?\d{0,10}"
            title="Phone number must be up to 10 digits"
            onChange={(e) => {setPhoneNo(e.target.value)}}
          />
        </div>

        {/* Date of Birth Input */}
        <div className="mb-4">
          <label className="block mb-1">Date of Birth</label>
          <input
            className="appearance-none border border-gray-200  rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Gender Select */}
        <div className="mb-4">
          <label className="block mb-1">Gender</label>
          <select
            className="appearance-none border border-gray-200  rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Avatar Upload */}
        <div className="mb-4">
          <label className="block mb-1">Avatar</label>
          <div className="flex flex-col md:flex-row">
            <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
              <img src={avatarPreview} className="w-14 h-14 rounded-full" alt="Avatar Preview" />
            </div>
            <div className="md:w-2/3 lg:w-80">
              <input
                className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="formFile"
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block hover:text-white bg-green-400 border text-black border-transparent rounded-2xl hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
