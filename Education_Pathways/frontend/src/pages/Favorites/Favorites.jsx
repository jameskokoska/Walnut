import React, { useEffect, useState } from "react";
import FavoriteContainer from "../../components/FavoriteContainer/FavoriteContainer";
import "./Favorites.scss";

export default function Favorites() {
  const getFavorites = () => {
    const favoritesRaw = localStorage.getItem("favorites");
    const favorites = JSON.parse(favoritesRaw === null ? "{}" : favoritesRaw);
    return Object.keys(favorites);
  };
  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      <h3>
        {getFavorites().length === 1
          ? `There is ${getFavorites().length} course saved.`
          : `There are ${getFavorites().length} courses saved.`}
      </h3>
      <div className="favorites-list">
        {getFavorites().map((favorite) => {
          return <FavoriteContainer courseCode={favorite} />;
        })}
      </div>
    </div>
  );
}
