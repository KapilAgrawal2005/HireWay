import { getSavedJobs } from "@/Api/jobsapi";
import useFetch from "@/Hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import JobCard from "../Job Components/JobCard";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fxn: handleSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      handleSavedJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
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
        Saved Jobs
      </h1>
      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs?.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobSaved={handleSavedJobs}
                  savedInit={true}
                />
              );
            })
          ) : (
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              No Saved Jobs 👀
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
