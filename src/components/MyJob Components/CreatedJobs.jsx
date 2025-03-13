import { getMyJobs } from "@/Api/jobsapi";
import useFetch from "@/Hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import JobCard from "../Job Components/JobCard";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fxn: fetchCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fetchCreatedJobs();
  }, []);

  if (loadingCreatedJobs) {
    return (
      <ClipLoader
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        color="#155DFC"
      />
    );
  }

  return (
    <div>
      {loadingCreatedJobs ? (
        <ClipLoader
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          color="#155DFC"
        />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobAction={fetchCreatedJobs}
                  isMyJob={true}
                />
              );
            })
          ) : (
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              No Jobs Found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
