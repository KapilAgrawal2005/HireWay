import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/postjobs" : "/joblist");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(
    (role) => {
      if (user?.unsafeMetadata?.role) {
        navigate(role === "recruiter" ? "/postjobs" : "/joblist");
      }
    },
    [user]
  );
  if (!isLoaded) {
    return (
      <ClipLoader
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        color="#155DFC"
      />
    );
  }
  return (
    <div className="flex flex-col item-center justify-center mt-32">
      <h2 className="gradiant-title font-extrabold text-7xl sm:text-8xl tracking-tighter text-center">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 md:px-56">
        <Button
          variant="blue"
          className="h-28 text-2xl"
          onClick={() => {
            handleRoleSelection("candidate");
          }}
        >
          Candidate
        </Button>
        <Button
          variant="red"
          className="h-28 text-2xl"
          onClick={() => {
            handleRoleSelection("recruiter");
          }}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
