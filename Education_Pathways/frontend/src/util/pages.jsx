import CourseDescriptionPage from "../components/CourseDescription";
import SearchResultDisplay from "../components/ResultDisplay";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage/HomePage";
import Page404 from "../pages/Page404/Page404";
import CourseInfoPage from "../pages/CourseInfoPage/CourseInfoPage";

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
      label: "Course Information",
      component: <CourseInfoPage />,
      path: "/CourseInfo/:code",
    },
    {
      label: "Search",
      component: <SearchResultDisplay />,
      path: "/search",
    },
  ],
};
