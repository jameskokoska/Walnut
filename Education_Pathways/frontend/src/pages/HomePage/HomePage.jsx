import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./HomePage.css"

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Walnut</h1>
      <h2>University of Toronto’s Detailed Course Database and Comparison Tool</h2>
      <div style={{height:"20px"}}/>
      <SearchbarHome/>
      <div style={{height:"10px"}}/>
      <Button label={"Search"} isSecondary/>
    </div>
  );
}

const SearchbarHome = () => {
  const placeholders = ["course code","course name", "description", "keyword"]
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderSwitch, setPlaceholderSwitch] = useState(false);
  useEffect(()=>{
    const interval = setInterval(async () => {
        setPlaceholderSwitch(true)
        await setTimeout(()=>{
          setPlaceholderSwitch(false)
          setPlaceholderIndex(
            (prevPlaceholderIndex) => {
              if(prevPlaceholderIndex < placeholders.length-1)
                return prevPlaceholderIndex+1
              else
                setPlaceholderIndex(0)
            }
          )
        }, 350)
    }, 3100);
    return () => clearInterval(interval);
  },[])
  return <Searchbar style={{width:"80%", maxWidth:"650px"}} placeholder={"Search by " + placeholders[placeholderIndex] + "..."} className={placeholderSwitch?"text-input-search-placeholder-transition":""}></Searchbar>
}