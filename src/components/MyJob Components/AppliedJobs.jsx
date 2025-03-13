import { getApplications } from "@/Api/applicationsapi";
import useFetch from "@/Hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import ApplicationCard from "../Job Components/ApplicationCard";

const AppliedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    fxn: fetchApplication,
    data: applications,
  } = useFetch(getApplications, { user_id: user.id });

  useEffect(() => {
    fetchApplication();
  }, []);

  if (loadingApplications) {
    return (
      <ClipLoader
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        color="#155DFC"
      />
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default AppliedJobs;
