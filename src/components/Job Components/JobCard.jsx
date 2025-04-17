import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import useFetch from "../../Hooks/useFetch";
import { deleteJob, saveJobs } from "../../Api/jobsapi";
import { ClipLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSave = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fxn: saveJob,
    data: savedJobs,
    loadingSavedJobs,
  } = useFetch(saveJobs, { alreadySaved: saved });

  const { loading: loadingDeletJob, fxn: fxndeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    fxndeleteJob();
    onJobSave();
  };

  const { user } = useUser();

  const handleSavedJobs = async () => {
    await saveJob({ user_id: user.id, job_id: job.id });
    onJobSave();
  };

  useEffect(() => {
    if (savedJobs !== undefined) {
      setSaved(savedJobs?.length > 0);
    }
  }, [savedJobs]);

  return (
    <Card className="flex flex-col justify-between">
      <div>
        {loadingDeletJob && (
          <ClipLoader
            className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            color="#155DFC"
          />
        )}
        <CardHeader>
          <CardTitle className="flex justify-between items-center font-bold">
            {job.title}
            {isMyJob && (
              <Trash2Icon
                onClick={handleDeleteJob}
                size={35}
                fil="red"
                className="border text-red-600 cursor-pointer p-2 mt-1 hover:bg-[#262626] rounded-full"
              />
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between pb-4">
            {job.company && <img src={job.company.logo_url} className="h-6" />}
            <div className="flex gap-1 item-center">
              <MapPinIcon size={18} className="mt-1" />
              {job.location}
            </div>
          </div>
          <hr />
          <div className="pt-4">{job.description}</div>
        </CardContent>
      </div>

      <div>
        <CardFooter className="flex justify-between">
          <Link to={`/joblist/${job.id}`}>
            <Button variant="secondary" className="w-full cursor-pointer">
              More Details
            </Button>
          </Link>

          {!isMyJob && (
            <Button
              className="rounded-full h-[32px] w-[30px] cursor-pointer"
              variant="outline"
              onClick={handleSavedJobs}
              disabled={loadingSavedJobs}
            >
              {saved ? (
                <Heart size={35} stroke="red" fill="red" />
              ) : (
                <Heart size={35} />
              )}
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default JobCard;
