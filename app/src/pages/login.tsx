import React, { useState } from "react";
import { api } from "@/utils/api";


function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = api.user.login.useMutation({
    onSuccess:(data)=>{
        if(data.code){
            console.log(data.message);
        }
    }
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Show loading state
    setIsLoading(true);

    // Simulate API request (replace with actual API call)
    try {
      // Your API call logic here
      console.log("Logging in...");
      console.log("Username:", username);
      console.log("Password:", password);

      await login.mutate({username, password});

      // Reset form fields
      setUsername("");
      setPassword("");

      localStorage.setItem("username", username);
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      // Handle error here
      // Hide loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-slate-500 to-slate-800">
      <section
        id="login"
        className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-4"
      >
        <div className="rounded bg-slate-400 p-6">
          <div className="m-3 flex items-center justify-center text-4xl font-black text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
            <h1 className="tracking-wide">
              SyncUp<span className="font-mono">™</span>
            </h1>
          </div>
          <form
            id="login_form"
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            <label className="text-sm font-medium">Username</label>
            <input
              className="mb-3 mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
              type="text"
              name="username"
              placeholder="wahyusa"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="text-sm font-medium">Password</label>
            <input
              className="mb-3 mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="block rounded-md bg-slate-900 px-4 py-1.5 font-medium text-gray-100 shadow-lg transition duration-300 hover:bg-slate-700"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span id="login_process_state">Checking ...</span>
              ) : (
                <span id="login_default_state">Login</span>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
