import React from "react";

import './AboutPage.css';


export default function AboutPage() {
  return (
    /*<div style={{display: 'flex', flexDirection: 'column', height: '982px'}} className="Canvas">
      <div style={{flexGrow: 1, display: 'flex'}} className="Canvas Body">*/
        <div style={{
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          position: 'relative', 
          justifyContent: 'center', 
          boxSizing: 'border-box'
          }} className="Canvas Placeholder for About Page">
        
        <p className="slogan">
          Course Selection Made Easy
        </p>

        <p className="intro">
          Walnut is a web application for current and future students at the University of Toronto to efficiently search and select
          courses all in one place. Within Walnut, you can find helpful information and features such as side-by-side course
          comparison. Walnut can help me make more informed decisions and make the course selection process much more efficient and
          interactive!<br />
          <br />Fun Fact: The application is called Walnut to fit the theme of “tree nuts” often used by the
          university (Acorn website and Chestnut Residence).<br /></p>
          <img src="https://firebasestorage.googleapis.com/v0/b/codeless-app.appspot.com/o/projects%2FQay1zSJfS8ysAs7pMqG6%2Ff6b8c833e97a167854ac713be6cb5b70?alt=media&token=c979b54d-c2da-43a8-b344-09f43661ab68" 
          className="underline"/>
          <img src="https://firebasestorage.googleapis.com/v0/b/codeless-app.appspot.com/o/projects%2FQay1zSJfS8ysAs7pMqG6%2F065cec9d7fe456a06cb81cc0a8fe4541?alt=media&token=28abafad-0097-4124-9b26-0b6b17313f85" 
          className="img1"/>
          
          
          <p className='meettheteam'>
            Meet The Team
          </p>
          <p className="member-name">
            James
          </p>
          <p className="member-intro">
            James likes watermelons
          </p>
          <p className="member-name">
            Kevin
          </p>
          <p className="member-intro">
            Kevin also likes watermelons
          </p>
          <p className="member-name">
            Mohammad
          </p>
          <p className="member-intro">
            Mohammad also likes watermelons
          </p>
        </div>
      /*</div>
    </div>*/
  );
}

