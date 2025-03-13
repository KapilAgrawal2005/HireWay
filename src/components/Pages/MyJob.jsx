import { useUser } from "@clerk/clerk-react";
import React from "react";
import { ClipLoader } from "react-spinners";
import AppliedJobs from "../MyJob Components/AppliedJobs";
import CreatedJobs from "../MyJob Components/CreatedJobs";

const MyJob = () => {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return (
      <ClipLoader
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        color="#155DFC"
      />
    );
  }
  return (
    <div className="mx-20">
      <h1 className="font-extrabold text-6xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <AppliedJobs />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJob;
