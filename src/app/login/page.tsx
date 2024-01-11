"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef } from "react";
const LoginPage = () => {
  const login = () => {
    console.log("login");
  };
   const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="mx-auto mt-8 flex w-fit bg-white">
      <div className="flex w-80 flex-col justify-between  bg-blue-600 px-8 py-8">
        <div className="flex flex-col">
          <span className="text-2xl font-medium text-white">Login</span>
          <span className="text-white/45">
            Get access to your Orders, Wishlist and Recommendations
          </span>
        </div>
        <div className="mx-auto mt-52">
          <Image
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
            alt="login image"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="flex w-96 flex-col justify-between px-8 py-8">
        <div>
          <input
            type="text"
            name=""
            placeholder="Enter Email/Mobile number"
            id=""
            className="w-64 min-w-max border-b  py-1 outline-none" ref={inputRef}
          />
          <div className="mt-2 text-sm text-zinc-500">
            By continuing, you agree to{" "}
            <span className="text-blue-600"> Terms</span> of Use and
            <span className="text-blue-600"> Privacy Policy.</span>
          </div>
          <button className="mt-4 w-full rounded bg-orange-500 py-2 font-medium text-white shadow-md">
            Request OTP
          </button>
        </div>
        <Link href="/signup" className="text-center font-medium text-blue-600">
          New to Flipkart? Create an account
        </Link>
        <button
          onClick={() => signIn("email", { email: inputRef.current?.value })}
        >
          sign in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
