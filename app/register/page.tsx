"use client";

import { useState } from "react";
import { axiosInstance } from "../features/axios.instance";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [formState, setFormState] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formState.password !== formState.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const checkResponse = await axiosInstance.get("/register", { params: { username: formState.username } });
      const user = checkResponse.data;
      console.log(user);

      if (user) {
        setError("Username already exists");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post("/register", {
        username: formState.username,
        password: formState.password,
      });

      if (response.status === 201) {
        alert("User registered successfully!");
        setLoading(false);
        // Redirect or reset form here if needed
        router.push("/login");
      } else {
        console.log("Failed to register user!");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="min-w-[400px] min-h-[450px] shadow-lg flex flex-col justify-center items-center rounded-lg border border-fuchsia-400">
        <div>{error && <p className="text-red-500 mt-4 px-5 mb-2">{error}</p>}</div>
        <h1 className="mb-5 text-5xl">Form Register</h1>
        <form onSubmit={formAction}>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="username">
              Username
            </label>
            <input className="border mb-1 pl-1" name="username" id="username" type="text" placeholder="username" required value={formState.username} onChange={handleChange} />
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input className="border mb-1 pl-1" name="password" id="password" type="password" placeholder="********" required value={formState.password} onChange={handleChange} />
            <label className="text-lg" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input className="border mb-1 pl-1" name="confirmPassword" id="confirmPassword" type="password" placeholder="********" required value={formState.confirmPassword} onChange={handleChange} />
            <button className="mt-4 bg-fuchsia-400 text-lg py-1" type="submit">
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
