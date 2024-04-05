import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    techstack: "",
    description: "",
  });

  const router = useRouter();
  

  const create = api.room.create.useMutation({
    onSuccess: (data) => {
      if (data.code) {
        console.log("message : ", data.message);
        router.push("/");
      }
    },
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const techstack2 = formData.techstack.split(",");

    create.mutate({
      techstack: JSON.stringify(techstack2),
      name: formData.name,
      description: formData.description,
      username: localStorage.getItem("username") as string,
    });
  };

  return (
    <div className="h-screen w-full bg-gray-800">
      <div className="h-96 bg-gradient-to-b from-blue-800 to-blue-600"></div>
      <div className="mx-auto mb-12 max-w-5xl px-6 sm:px-6 lg:px-8">
        <div className="-mt-72 w-full rounded bg-gray-900 p-8 shadow sm:p-12">
          <p className="text-center text-3xl font-bold leading-7 text-white">
            Create New Room
          </p>
          <form action="" onSubmit={handleSubmit}>
            <div className="mt-12 items-center md:flex">
              <div className="flex w-full flex-col md:w-1/2">
                <label className="font-semibold leading-none text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-4 rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-8 items-center md:flex">
              <div className="flex w-full flex-col">
                <label className="font-semibold leading-none text-gray-300">
                  Tech Stack(separate by comma)
                </label>
                <input
                  type="text"
                  name="techstack"
                  onChange={handleChange}
                  className="mt-4 rounded border-0 bg-gray-800 p-3 leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="mt-8 flex w-full flex-col">
                <label className="font-semibold leading-none text-gray-300">
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  className="mt-4 h-40 rounded border-0 bg-gray-800 p-3 text-base leading-none text-gray-50 focus:border-blue-700 focus:outline-none"
                ></textarea>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <button className="mt-9 rounded bg-blue-700 px-10 py-4 font-semibold leading-none text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
