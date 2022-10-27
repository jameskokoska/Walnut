import HomePage from "../pages/HomePage/HomePage";
import Page404 from "../pages/Page404";
import AboutPage from "../pages/AboutPage";
import Favorites from "../pages/Favorites/Favorites";
import SearchResults from "../pages/SearchResults/SearchResults";

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
      component: <SearchResults />,
      path: "/search",
    },
    {
      label: "Favorites",
      component: <Favorites />,
      path: "/favorites",
    },
  ],
};
