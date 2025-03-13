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
  job, // the data of a particular job
  isMyJob = false, // this is fo recruiter, if recruiter create a job then tht will be inside the isMyjob
  savedInit = false, //for candidate, it's will be used when a cndidate saves or wishlists a job
  onJobSave = () => {}, //function for saving the jobs, will we used when the candidate will click on save job
}) => {
  const [saved, setSaved] = useState(savedInit);

  //   this useFetch will fetch the details of the jobs of the savedJobs page from the saveJobs function
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

  const { user } = useUser(); //useUser provide the detail of user

  //handleSavedJobs function will call the saveJobs function which is written in the jobsapi.js with passing of user_id and job_id

  const handleSavedJobs = async () => {
    await saveJob({ user_id: user.id, job_id: job.id });
    onJobSave();
  };

  //   this useEffect is used to prevent the rerendering it mean the saved jabs page will only rerender when the candidate click on the heart icon
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

          {/* firstly we will check if the recruiter is checking the joblists page:
         -> if yes then don't need to show the heart/wishlist icon because recruiter will not any job then  
         -> if no it means candidate is seeing the joblists page then we will show the heart icon */}

          {!isMyJob && (
            <Button
              className="rounded-full h-[32px] w-[30px] cursor-pointer"
              variant="outline"
              onClick={handleSavedJobs}
              disabled={loadingSavedJobs}
            >
              {/* now will check whether the job is already saved :
            -> if yes then we will show the filled heart icon 
            -> if not then we will show the empty heart icon */}

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
