import supabaseClient from "@/utils/supabase";

// api for getting the list of jobs from the supabase
export async function getJobs(token,{location, company_id, searchQuery}){
    const supabase = await supabaseClient(token);

    // hum is file me query likhenge to get the data through the api from the supabase 
    // yanha pe humne ek async function banaya hai jisme humne ek token pass kiya hai jo ki same token hai jo supabase.js me likha hua hai or location, company_id and searchQuery pass kiya hai for filtering purpose

    let query = supabase.from("jobs").select("*, company:companies(name,logo_url), saved:saved_jobs(id)"); //command(query)

    if(location){
        query = query.eq("location" , location);
    }
    if(company_id){
        query = query.eq("company_id" , company_id);
    }
    if(searchQuery){
        query = query.ilike("title" , `%${searchQuery}%`);
    }

    const {data,error} = await query;
    if(error){
        console.error("Error while fetching the details : ",error);
        return null;
    }
    return data;    
}


// function for saving and wishlisting the jobs
export async function saveJobs(token,{alreadySaved}, saveData){
    const supabase = await supabaseClient(token);

    // firstly we will check whether this job tis already saved or not if yes then we will delete it first and if not then we will save this job in the saved_jobs table in supabase

    if(alreadySaved){
        const {data,error} = await supabase
        .from("saved_jobs").delete().eq("job_id",saveData.job_id);

        if(error){
            console.error("Error while deleting the saved jobs : ",error);
            return null;
        }
        return data;
    }else{
        const {data,error} = await supabase
        .from("saved_jobs").insert([saveData]).select();

        if(error){
            console.error("Error while insering the jobs into the saved jobs : ",error);
            return null;
        }
        return data;   
    }
}


export async function getSingleJob(token,{job_id}){
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase.from("jobs").select("*, company:companies(name,logo_url), applications:applications(*)").eq("id",job_id).single();
    if(error){
        console.error("Error while fetching the Job : ",error);
        return null;
    }
    return data;
 
}


export async function updateHiringStatus(token, {job_id}, isOpen){
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase.from("jobs").update({isOpen}).eq("id",job_id).select();

    if(error){
        console.error("Error while updating the hiring status : ",error);
        return null;
    }
    return data;
 
}



export async function addNewJob(token, _, jobData){
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase.from("jobs").insert([jobData]).select();

    if(error){
        console.error("Error while creating the job : ",error);
        return null;
    }
    return data;
 
}


export async function getSavedJobs(token){
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name,logo_url))");

    if(error){
        console.error("Error while fetching the Saved jobs : ",error);
        return null;
    }
    return data;
 
}


export async function getMyJobs(token, {recruiter_id}){
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id)

    if(error){
        console.error("Error while fetching the created jobs : ",error);
        return null;
    }
    return data;
 
}


export async function deleteJob(token, {job_id}){
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id).select();

    if(error){
        console.error("Error while Deleting the job : ",error);
        return null;
    }
    return data;
 
}