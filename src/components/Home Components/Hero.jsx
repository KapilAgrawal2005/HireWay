import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const Hero = () => {
  return (
    <>
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter">
          Find Your Dream Jobs{" "}
          <span className="flex items-center gap-2 sm:gap-6 pb-4">
            and get Hired
          </span>
        </h1>
        <p className="text-xs text-gray-300 sm:mt-4 sm:text-xl">
          Explore thousands of jobs listing or find the perfect candidate
        </p>
      </section>

      <div className="flex justify-center gap-6">
        {/* buttons */}
        <Link to="/joblist">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/postjobs">
          <Button size="xl" variant="red">
            Post a Job
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Hero;
