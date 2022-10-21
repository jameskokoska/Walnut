import ConHall from "../components/img/ConHall.png";

const HomePageStyles = {
  bg: {
    backgroundImage: `url(${ConHall})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },

  btn: {
    boxShadow: "0px 0px 6px 2px #2e2e2e6a",
  },
};

export { HomePageStyles };
