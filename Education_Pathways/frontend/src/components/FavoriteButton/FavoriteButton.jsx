import React, { useEffect, useState } from "react";
import "./FavoriteButton.scss";
import HeartEmpty from "../../components/img/heart-regular.svg";
import HeartFilled from "../../components/img/heart-solid.svg";

export default function FavoriteButton({ courseCode }) {
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  // To get favorites just get the keys returned from favorites localstorage item
  useEffect(() => {
    const favorites = getFavorites();
    if (favorites[courseCode] === true) {
      setFavoriteStatus(true);
    }
  }, []);
  const getFavorites = () => {
    const favoritesRaw = localStorage.getItem("favorites");
    const favorites = JSON.parse(favoritesRaw === null ? "{}" : favoritesRaw);
    return favorites;
  };
  const setLiked = (status) => {
    const favorites = getFavorites();
    favorites[courseCode] = status;
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavoriteStatus(status);
  };

  return (
    <img
      src={favoriteStatus ? HeartFilled : HeartEmpty}
      className="favorite-button"
      onClick={() => setLiked(!favoriteStatus)}
    ></img>
  );
}
