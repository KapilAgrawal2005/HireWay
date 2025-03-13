import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import AppLayout from "./components/Pages/AppLayout";
import OnBoarding from "./components/Pages/OnBoarding";
import JobLists from "./components/Pages/JobLists";
import Job from "./components/Pages/Job";
import MyJob from "./components/Pages/MyJob";
import SavedJobs from "./components/Pages/SavedJobs";
import PostJobs from "./components/Pages/PostJobs";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./components/Pages/Home";
import Footer from "./components/Footer";
function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoutes>
              <OnBoarding />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/joblist",
          element: (
            <ProtectedRoutes>
              <JobLists />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/joblist/:id",
          element: (
            <ProtectedRoutes>
              <Job />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/myjobs",
          element: (
            <ProtectedRoutes>
              <MyJob />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/savedjobs",
          element: (
            <ProtectedRoutes>
              <SavedJobs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/postjobs",
          element: (
            <ProtectedRoutes>
              <PostJobs />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <div>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={router} />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
