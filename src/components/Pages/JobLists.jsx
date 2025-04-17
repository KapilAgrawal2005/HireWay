import useFetch from "../../Hooks/useFetch";
import { getJobs } from "../../Api/jobsapi";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";
import JobCard from "../Job Components/JobCard";
import { getCompanies } from "../../Api/companiesapi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { State } from "country-state-city";

const JobLists = () => {

  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    fxn: fetchJobs,
    data: jobs,
    loading,
    error,
  } = useFetch(getJobs, { location, searchQuery, company_id });

  const { fxn: fetchCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fetchCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      fetchJobs();
    }
  }, [isLoaded, location, searchQuery, company_id]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  };
  const handleClear = () => {
    setCompany_id("");
    setLocation("");
    setSearchQuery("");
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
    <div className="flex flex-col items-center justify-center mx-5 sm:mx-10 md:mx-15">
      <h2 className="font-extrabold gradient-tite text-6xl sm:text7xl text-center pb-8 mx-auto">
        Latest Jobs
      </h2>

      <form
        onSubmit={handleSearch}
        className="h-10 flex w-full gap-4 mb-5 items-center"
      >
        <Input
          type="text"
          name="search-query"
          placeholder="Search for Jobs by Title..."
          className="h-full text-md px-4 flex-1"
        />
        <Button
          type="submit"
          className="h-full sm:w-28 cursor-pointer"
          variant="blue"
        >
          Search
        </Button>
      </form>

      <div className="w-full flex flex-col sm:flex-row gap-2 mb-5">
        <Select
          value={location}
          onValueChange={(value) => {
            setLocation(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map((state) => {
                return (
                  <SelectItem value={state.name} key={state.name}>
                    {state.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => {
            setCompany_id(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Companies..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem value={id} key={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="red" onClick={handleClear}>
          Clear Filters
        </Button>
      </div>

      {loading && <ClipLoader className="mb-4" color="#155DFC" />}
      {loading === false && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job.saved.length > 0}
                />
              );
            })
          ) : (
            <div className="fixed top-1/2 left-1/2">No Jobs Found 🥺</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobLists;
