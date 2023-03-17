import React from 'react';
import './title-item.css';

const TitleItem = () => (
  <section className="title-item">

    <h1 className="itemTitle">Hey there</h1>
    <div className="itemContent">
      <p> Welcome to my personal website, I hope you stay a while.
        <br /><br />
      </p>
      <div className="wrapper">
        <div className="static-text"> Allow me to introduce myself, my name is Chase, and among a few other things, I
          like
          to call myself </div>
        <ul className="dynamic-list">
          <li><span id="Interactive Developer">an Interactive Developer. </span></li>
          <li><span id="User Experience Architect">a User Experience Architect. </span></li>
          <li><span id="Thrill-Seeker">a Thrill-Seeker. </span></li>
          <li><span id="Immersion Curator">an Immersion Curator. </span></li>
          <li><span id="User Interface Designer">a User-Interface Designer. </span></li>
          <li><span id="JavaScript Wizard">a JavaScript Wizard. </span></li>
          <li><span id="Climber of Rocks">a Climber of Rocks. </span></li>
          <li><span id="Problem-Solver">a Problem-Solver. </span></li>
          <li><span id="SurelyNotChase"> <a href="https://observablehq.com/@surelynotchase?tab=profile">@SurelyNotChase. </a> </span></li>
          <li><span id="Zelda Main">a Zelda Main. </span></li>
          <li><span id="Martial Artist">a Martial Artist. </span></li>
          <li><span id="Vibeologist"> a Vibeologist. </span></li>
          <li><span id="Flower Tea Enthusiast">a Flower Tea Enthusiast. </span></li>
          <li><span id="Undercover Philosopher">an Undercover Philosopher. </span></li>
          <li><span id="when-nobody">when nobody else answers the phone.</span></li>
          <li><span id="Bo Staff Expert">a Bo Staff Expert.</span></li>
          <li><span id="Rick Roll"> <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">An Easter Egg Master.</a>
          </span></li>
        </ul>
      </div>
    </div>
  </section>
);

TitleItem.propTypes = {};

TitleItem.defaultProps = {};

export default TitleItem;
