import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { getSingleJob, updateHiringStatus } from "../../Api/jobsapi";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ApplyJobDrawer from "../Job Components/ApplyJobDrawer";
import ApplicationCard from "../Job Components/ApplicationCard";
const Job = () => {
  const { isLoaded, user } = useUser();

  // useParams hook is used for getting the id from the url
  const { id } = useParams();

  const {
    loadingJob,
    data: job,
    fxn: singleJob,
  } = useFetch(getSingleJob, { job_id: id });

  const { loadingStatus, fxn: updateStatus } = useFetch(updateHiringStatus, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) {
      singleJob();
    }
  }, [isLoaded]);

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    updateStatus(isOpen).then(() => singleJob());
  };

  if (!isLoaded) {
    return (
      <ClipLoader
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        color="#155DFC"
      />
    );
  }
  return (
    <div className="flex flex-col mx-20 mt-5 gap-6">
      <div className="flex flex-col-reverse gap-6 items-center justify-between sm:flex-row">
        <h2 className="gradiant-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h2>
        <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {/* hiring status */}
      {loadingStatus && (
        <ClipLoader
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          color="#155DFC"
        />
      )}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status" + (job.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p>{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="sm:text-lg rounded-2xl"
      />

      {/* render the applications */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          singleJob={singleJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}

      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard application={application} key={application.id} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Job;
