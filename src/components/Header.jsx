import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  // yanha maine ek route banaya hai like "sign-in" name se. ye isiliye hai agar manlo koi user login nhi karta hai or kisi doosre page per jane ki try karta hai by direct give the path then wo sidha pehle login page pe aa jaayega

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <div>
      <nav className="flex justify-between items-center py-4 ">
        <Link to="/">
          <img src={logo} className="h-15" />
        </Link>

        <div className="flex gap-8">
          <SignedOut className="z-10">
            <Button
              variant="outline"
              onClick={() => {
                setShowSignIn(true);
              }}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/postjobs">
                <Button variant="red" className="rounded-full">
                  <PenBox className="mr-2" size={20} />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href="myjobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="savedjobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
