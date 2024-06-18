import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import About from "../Assests/Images/AboutUs.jpg";
import Apj from "../Assests/Images/apj.jpg";
import Einstein from "../Assests/Images/einstein.jpg";
import Nelson from "../Assests/Images/nelson.jpg";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-red-400 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-yellow-300 font-semibold ">
              Our goal is to provide the afoordable and quality education to the
              world. we are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind
            </p>
          </section>

          <div className="w-1/2 ">
            <img
              id="test1"
              style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
              className="drop-shadow-2xl"
              src={About}
              alt="AboutImage"
            />
          </div>
        </div>

        <div className="carousel w-1/2 my-12 m-auto">
          <div id="slide1" className="carousel-item relative w-full">
            
            <div className="carousel-item relative w-full">
             
              <img
                src={Nelson}
                className="w-full border-2 border-green-400 rounded-full"
              />

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
             
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src={Einstein}
              className="w-full border-2 border-green-400 rounded-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src={Apj}
              className="w-full border-2 border-green-400 rounded-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
