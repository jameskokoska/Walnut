import React, { useEffect, useState } from "react";
import FavoriteContainer from "../../components/FavoriteContainer/FavoriteContainer";
import "./Favorites.css";

export default function Favorites() {
  const getFavorites = () => {
    const favoritesRaw = localStorage.getItem("favorites");
    const favorites = JSON.parse(favoritesRaw === null ? "{}" : favoritesRaw);
    const output = [];
    for (let favorite of Object.keys(favorites)) {
      if (favorites[favorite] === true) {
        output.push(favorite);
      }
    }
    return output;
  };
  const favorites = getFavorites();
  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      <h3>
        {favorites.length === 1
          ? `There is ${favorites.length} course saved.`
          : `There are ${favorites.length} courses saved.`}
      </h3>
      <div className="favorites-list">
        {favorites.map((favorite) => {
          return <FavoriteContainer courseCode={favorite} />;
        })}
      </div>
    </div>
  );
}
