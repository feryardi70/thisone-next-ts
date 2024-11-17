"use client";

import { useState, useEffect } from "react";
import { signInCredentials } from "../action/signin";
import getSession from "../session";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const result = await getSession();

      setSession(result ? true : false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session === true) {
      router.push("/");
    }
  }, [session, router]);

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInCredentials(formState);
      //console.log("Response from signInCredentials:", result);

      if (result === "Invalid username or password") {
        setError("Authentication failed, wrong username and password combination");
      } else if (typeof result == "string") {
        setError("An error occurred during login");
      } else {
        setError("");
        router.push("/");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Error:", error);
    }

    setLoading(false);
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
        <h1 className="mb-5 text-5xl">Form Login</h1>
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
            <button className="mt-4 bg-fuchsia-400 text-lg py-1" type="submit" disabled={loading}>
              {loading ? "Authenticating..." : "Login"} {/* Show loading text */}
            </button>
          </div>
        </form>
        <div className="mt-2">
          Forgot password?{" "}
          <Link href="/forgot" className="text-blue-600">
            click here
          </Link>
        </div>
      </div>
    </div>
  );
}
