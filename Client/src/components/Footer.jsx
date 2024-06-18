import React from "react";
import { BsLinkedin, BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] py-5  flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20">
        <section className="text-lg">
          copyright {year} &copy; All rights reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https:wwww.linkedin.com"
            target="_blank"
          >
            <BsLinkedin />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https:wwww.instagram.com"
            target="_blank"
          >
            <BsInstagram />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https:wwww.twitter.com"
            target="_blank"
          >
            <BsTwitter />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https:wwww.facbook.com"
            target="_blank"
          >
            <BsFacebook />
          </a>
        </section>
      </footer>
    </>
  );
}

export default Footer;
