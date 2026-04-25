"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e:any) => {

    e.preventDefault();

    const res = await fetch(
      "/api/auth/login", 
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await res.json();

    if(res.ok){

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      router.push("/");

    }else{

      alert(data.error);

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80"
      >

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-sm text-center mt-4">

          Don't have an account?{" "}

          <a
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </a>

        </p>

      </form>

    </div>

  );

}