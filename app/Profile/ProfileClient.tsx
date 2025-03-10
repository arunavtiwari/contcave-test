"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import ImageUpload from "@/components/inputs/ImageUpload";
import useRentModal from "@/hook/useRentModal";
import useLoginModel from "@/hook/useLoginModal";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Heading from "@/components/Heading";
import { toast } from "react-toastify";
import Select from "react-select";

const ProfileClient = ({ profile }) => {
  const router = useRouter();
  const rentModel = useRentModal();
  const loginModel = useLoginModel();
  const [currentUser, setCurrentUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");


  // Custom Styles Select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#000000" : "#e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 1px #000000" : null,
      "&:hover": {
        borderColor: state.isFocused ? "#000000" : "#cbd5e0",
      },
      borderRadius: "9999px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#000000",
      borderRadius: "9999px",
      padding: "0 10px"
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      fontSize: "0.875rem",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#000000",
        color: "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#a0aec0",
    }),
  };


  // Languages
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Italian", label: "Italian" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
    { value: "Arabic", label: "Arabic" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Russian", label: "Russian" },
  ];

  // Titles
  const titleOptions = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Ms", label: "Ms" },
    { value: "Dr", label: "Dr" },
    { value: "Prof", label: "Prof" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const user = profile;
      if (user) {
        setCurrentUser(user);
        setIsVerified(user.is_verified || false);
      }
    };

    fetchUser();
  }, []);

  const [userData, setUserData] = useState<{
    name: string;
    description: string;
    location: string;
    languages: string[];
    title: string;
    email: string;
    phone: string;
    profileImage: string;
    isVerified: boolean;
  }>({
    name: "",
    description: "",
    location: "",
    languages: [],
    title: "",
    email: "",
    phone: "",
    profileImage: "",
    isVerified,
  });

  const onRent = useCallback(() => {
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = profile;
      if (user) {
        setCurrentUser(user);
        setUserData({
          name: user.name || "",
          description: user.description || "",
          location: user.location || "",
          languages: user.languages || [],
          title: user.title || "",
          email: user.email || "",
          phone: user.phone || "",
          profileImage: user.profileImage || user.image || "/assets/default-profile.svg",
          isVerified: user.is_verified,
        });
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    const newLanguages = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUserData({ ...userData, languages: newLanguages });
  };

  const handleTitleChange = (selectedOption) => {
    setUserData({ ...userData, title: selectedOption ? selectedOption.value : "" });
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/user", userData);
      setEditMode(false);
      toast.success("User data updated successfully!");
    } catch (error) {
      console.error("Failed to update user data", error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const selectedLanguageOptions = languageOptions.filter(option =>
    userData.languages.includes(option.value)
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menuType="profile" />

      <div className="flex flex-col sm:p-8 sm:pt-12 w-full gap-5 sm:border-l-2 border-gray-200">
        <Heading title="User Profile" />
        <div className="xl:grid lg:grid xl:grid-cols-2 lg:grid-cols-2 md:flex gap-10">
          {/* Left */}
          <div className="relative">
            <div className="shadow-solid-6 p-6 rounded-xl xl:flex lg:flex md:flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap flex-wrap items-start">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 relative overflow-hidden rounded-full border-4 shadow-solid-6 border-white mx-auto z-[1]">
                  <div className="w-full h-full">
                    {!editMode && (
                      <Image src={userData.profileImage} width={110} height={125} alt="" className="object-cover" />
                    )}
                    {editMode && (
                      <ImageUpload
                        onChange={(value) =>
                          setUserData({ ...userData, profileImage: value[value.length - 1] })
                        }
                        values={[userData.profileImage]}
                        circle={true}
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 flex mx-auto right-0 w-full h-6 overflow-hidden shadow bg-gray-500">
                    <input
                      type="file"
                      className="absolute top-0 right-0 w-full h-full z-10 opacity-0 cursor-pointer"
                      accept="image/png, image/gif, image/jpeg"
                      disabled
                    />
                    <div className="w-full h-full text-xl text-gray-400 flex justify-center items-center">
                      <span className="text-white w-4 h-4 text-md">
                        <Image src="/assets/faCamera.svg" alt="" width={25} height={25} className="object-contain" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Description */}
              <form className="xl:w-[calc(100%-96px)] lg:w-[calc(100%-96px)] md:w-full w-full xl:pl-5 lg:pl-5 md:pl-0 md:pt-5 space-y-4">
                {/* Name */}
                <div className="flex w-full h-10 bg-white border border-slate-400 items-center px-2 rounded-xl">
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Name"
                    className="w-[calc(100%-16px)] h-10 border-0 bg-transparent focus:ring-0"
                  />
                  <div className="w-4 h-4" onClick={() => setEditMode(!editMode)}>
                    <Image src="/assets/edit.svg" width={16} height={16} alt="Edit" className="w-full h-full object-contain cursor-pointer" />
                  </div>
                </div>
                {/* Description */}
                <div className="flex w-full bg-white border border-slate-400 items-end px-2 py-2 rounded-xl">
                  <textarea
                    name="description"
                    value={userData.description}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Tell Everyone About Yourself"
                    className="w-[calc(100%-16px)] h-60 resize-none border-0 bg-transparent focus:ring-0"
                  />
                  <div className="w-4 h-4" onClick={() => setEditMode(!editMode)}>
                    <Image src="/assets/edit.svg" width={16} height={16} alt="Edit" className="w-full h-full object-contain cursor-pointer" />
                  </div>
                </div>
              </form>
            </div>

            {/* Personal Details */}
            <div className="relative mt-10">
              <div className="text-lg font-bold mb-5">Personal Details</div>
              <div className="relative space-y-3 shadow-solid-6 p-6 rounded-xl">
                {/* Title */}
                <div className="flex justify-between items-center">
                  <div className="font-bold text-slate-950">Title</div>
                  {editMode ? (
                    <Select
                      name="title"
                      options={titleOptions}
                      value={titleOptions.find(option => option.value === userData.title)}
                      onChange={handleTitleChange}
                      isDisabled={!editMode}
                      placeholder="Select Title"
                      styles={customStyles}
                    />
                  ) : (
                    <div className="text-slate-600 bg-transparent border-0 focus:ring-0 xl:text-right lg:text-right text-left px-0">
                      {userData.title}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="flex justify-between items-center">
                  <div className="font-bold text-slate-950">Email</div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled
                    className="text-slate-600 bg-transparent border-0 focus:ring-0 xl:text-right lg:text-right text-left px-0 w-full"
                  />
                </div>

                {/* Phone */}
                <div className="flex justify-between items-center">
                  <div className="font-bold text-slate-950">Phone</div>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    placeholder="+91 99xxxxxx21"
                    onChange={handleChange}
                    disabled={!editMode}
                    className="text-slate-600 bg-transparent border-0 focus:ring-0 xl:text-right lg:text-right text-left px-0"
                  />
                </div>

                {/* Languages */}
                <div className="flex justify-between items-center">
                  <div className="font-bold text-slate-950">Languages</div>
                  {editMode ? (
                    <div className="w-1/2">
                      <Select
                        options={languageOptions}
                        value={selectedLanguageOptions}
                        onChange={handleMultiSelectChange}
                        isMulti
                        placeholder="Select languages"
                        styles={customStyles}
                        isOptionDisabled={(option) =>
                          selectedLanguageOptions.length >= 2 &&
                          !selectedLanguageOptions.some(selected => selected.value === option.value)
                        }
                      />
                    </div>
                  ) : (
                    <div className="text-slate-600 bg-transparent border-0 focus:ring-0 xl:text-right lg:text-right text-left px-0">
                      {userData.languages.length > 0
                        ? userData.languages.join(", ")
                        : "No languages selected"}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="flex justify-between items-center">
                  <div className="font-bold text-slate-950">Location</div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter the location"
                    value={userData.location}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="text-slate-600 bg-transparent border-0 focus:ring-0 xl:text-right lg:text-right text-left px-0"
                  />
                </div>
              </div>
            </div>
            {editMode && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-black flex items-center justify-center mx-auto mt-4 text-white px-6 py-2.5 font-semibold shadow-lg rounded-full text-center hover:opacity-85"
                >
                  Save Changes
                </button>
              </div>
            )}
            {!editMode && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setEditMode(!editMode)}
                  className="bg-black flex items-center justify-center mx-auto mt-4 text-white px-6 py-2.5 font-semibold shadow-solid-6 rounded-full text-center hover:opacity-85"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="relative">
            {!isVerified && (
              <div className="border border-x-slate-300 p-6 rounded-2xl">
                <div className="text-center space-y-5">
                  <div className="text-xl font-bold text-slate-950">Are you a space owner?</div>
                  <p className="text-base leading-tight">
                    Let us know if you are a space owner by verifying your identity and submitting required documents.
                  </p>
                </div>
              </div>
            )}

            {isVerified && (
              <div className="border border-x-slate-300 p-6 rounded-2xl">
                <div className="text-center space-y-5">
                  <div className="text-xl font-bold text-slate-950">User Verified</div>
                  <p className="text-base leading-tight">
                    Your profile is verified. You can now list your space and add payment details.
                  </p>
                  <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap flex-wrap space-x-4">
                    <button
                      type="button"
                      onClick={onRent}
                      className="bg-black text-white px-6 py-2.5 font-semibold shadow-lg rounded-full text-center hover:opacity-85"
                    >
                      List Your Space
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/payment-details")}
                      className="bg-black text-white px-6 py-2.5 font-semibold shadow-lg rounded-full text-center hover:opacity-85"
                    >
                      Add Payment Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;