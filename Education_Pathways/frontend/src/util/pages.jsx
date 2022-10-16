import CourseDescriptionPage from "../components/CourseDescription";
import SearchResultDisplay from "../components/ResultDisplay";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage/HomePage";
import Page404 from "../pages/Page404";

export const pages = {
  404: {
    label: "404",
    component: <Page404 />,
  },
  main: [
    {
      label: "Home",
      component: <HomePage />,
      path: "/",
    },
    {
      label: "About",
      component: <AboutPage />,
      path: "/about",
    },
    {
      label: "Search",
      component: <SearchResultDisplay />,
      path: "/search",
    },
    {
      label: "Course Details",
      component: <CourseDescriptionPage />,
      path: "/courseDetails/:code",
    },
  ],
};
