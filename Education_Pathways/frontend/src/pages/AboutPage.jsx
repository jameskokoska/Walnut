import React from "react";

import './AboutPage.css';

const teamintro = [
  {
    name: "James",
    description: "James says hi",
  },
  {
    name: "Kevin",
    description: "Kevin says hi",
  },
  {
    name: "Markus",
    description: "Markus says hi",
  },
  {
    name: "Mohammad",
    description: "Mohammad says hi",
  },
  {
    name: "Sam",
    description: "Sam says hi",
  },
];

export default function AboutPage() {
  return (
    <div style = {{marginTop: "30px"}} className="about-page">
      <p className="slogan">
        Course Selection Made Easy
      </p>
      
      <p className="intro">
      <br />Walnut is a web application for current and future students at the University of Toronto to efficiently search and select
        courses all in one place. Within Walnut, you can find helpful information and features such as side-by-side course
        comparison. Walnut can help me make more informed decisions and make the course selection process much more efficient and
        interactive!<br />
        <br />Fun Fact: The application is called Walnut to fit the theme of “tree nuts” often used by the
        university (Acorn website and Chestnut Residence).<br /><br /><br /></p>
        <img src="https://firebasestorage.googleapis.com/v0/b/codeless-app.appspot.com/o/projects%2FQay1zSJfS8ysAs7pMqG6%2F065cec9d7fe456a06cb81cc0a8fe4541?alt=media&token=28abafad-0097-4124-9b26-0b6b17313f85" 
        className="img1"/>
  
      <h1 className="meettheteam">Meet The Team</h1>
      <div style = {{marginTop: "30px"}} className="team">
        {teamintro.map((member) => {
          return (
            <div>
              <h2 style = {{marginTop: "30px"}} className="member-name">{member.name}</h2>
              <p className="member-intro">{member.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

