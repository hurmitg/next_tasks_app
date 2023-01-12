import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import authImage from "../utils/auth1.svg";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-nextjs-toast";

export default function Signup() {
  const [creds, setCreds] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/auth/signup`, creds).then((res) => {
        setLoading(false);
        localStorage.setItem("tasksUser", JSON.stringify(res.data));
      });
      setLoading(false);
      router.push("/");
    } catch (e) {
      setLoading(false);
      toast.notify(e.response.data, {
        duration: 5,
        type: "error",
      });
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Signup | Tasks App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,600;1,700&family=DM+Sans:wght@400;500&family=Poppins:ital,wght@0,100;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ToastContainer align={"right"} position={"top"} />

      <div className="flex h-full w-screen py-5 m-auto items-center justify-around">
        <div className="h-auto flex flex-col items-start justify-around w-11/12 sm:1/2 border border-gray-300 shadow-xl rounded max-w-sm px-8 py-10">
          <p className="text-gray-700 font-normal tracking-wide text-xl mb-5">
            Welcome !
          </p>
          <p className="text-gray-700 text-3xl font-semibold mb-2">
            Sign up to
          </p>
          <p className="text-gray-700 text-md font-semibold mb-5">
            World of Planning
          </p>
          <form className="bg-white w-full h-full mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Your email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                placeholder="Enter Your Username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  text-xs leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 text-xs leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="confirmpassword"
                placeholder="Confirm Your Password"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <button
                className="bg-gray-900 w-full hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                disabled={loading}
                onClick={handleSignup}
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-gray-400 text-md font-semibold mx-auto">
            Already have an account ?{" "}
            <Link href="/login" className="text-gray-700 ">
              Login
            </Link>
          </p>
        </div>
        <Image
          className="w-1/2 hidden sm:block"
          src={authImage}
          alt="Auth Image"
        />
      </div>
    </>
  );
}