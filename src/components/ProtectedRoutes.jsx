import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  // useUser hook hume clerk se milta hai jo ki hume user ki details provide karta hai
  // agar user login nahi hai to hum ise redirect kar sakte hai login page pe
  const { isSignedIn, user, isLoaded } = useUser();
  // useLocation hook bhi hume react-router-dom se milta hai jo ki hume current location provide karta hai
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }

  // agar koi user apna role select nhi karta hai or directly kisi jobslist ya postjobs wale route pe jata hai to hum use rediect kar sakte hai onboarding page pe janga wo apna role select karega

  if (
    user !== undefined &&
    !user.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default ProtectedRoutes;
