"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e:any) => {

    e.preventDefault();

    const res = await fetch(
      "/api/auth/register",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    if(res.ok){

      alert("Registered successfully");

      router.push("/login");

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80"
      >

        <h2 className="text-xl font-bold mb-4">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded"
        >
          Register
        </button>
<p className="text-sm text-center mt-4">

  Already have an account?{" "}

  <a
    href="/login"
    className="text-blue-500 hover:underline font-medium"
  >
    Login
  </a>

</p>
      </form>

    </div>

  );

}