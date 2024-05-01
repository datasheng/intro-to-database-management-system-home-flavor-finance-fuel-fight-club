import React from "react";
import "../styles/FurssanFC.css";
import header1 from "../pictures/header1.jpg";
import header2 from "../pictures/header2.jpg";
import header3 from "../pictures/header3.jpg";
import check from "../pictures/check.png";
import discipline from "../pictures/discipline.png";
import respect from "../pictures/respect.png";
import honor from "../pictures/honor.png";
import resilience from "../pictures/resillience.png";
import serviceFC from "../pictures/servicesMMA.jpg";


function FurssanFC() {
  return (
    <div className="fc_home">
      <img  id = "header1" src= {header1} alt=""/>
      <img  id = "header2" src= {header2} alt=""/>
      <img  id = "header3" src= {header3} alt=""/>
      <h1>Furssan Fight Club</h1>
      <div className="fc_mission">
        <h1>WHAT WE OFFER:</h1>
        <img  id = "check" src= {check} alt=""/>
        <img  id = "check2" src= {check} alt=""/>
        <img  id = "check3" src= {check} alt=""/>
        <img  id = "check4" src= {check} alt=""/>
        <div id="offer1">Complementary class for first time members</div>
        <div id="offer2">1-on-1 Training Sessions with Professionals</div>
        <div id="offer3">Outdoor Training Sessions Per Your Request</div>
        <div id="offer4">Wellness Assessments and Progress Tracking</div>
        <div id="contact2">Questions? Contact us at FurssanFC@mgnt.net</div>
      </div>
      <div className="fc_layer2">
      <div id="mission">Our Mission:</div>
      <div id="mission_statement"> "Our mission is to cultivate a dynamic and supportive community where individuals can thrive and 
      achieve their fitness goals. Through expert coaching, specialized training programs, classes catered to the individual, and a 
      commitment to excellence, we warrant our members to unleash their full potential. We know everyone has a different personal 
      journey and foster an environment that supports such. Discipline, respect, honor, and resilience are the foundation of Furssan FC,
      equipping our members with the skills and mindset to conquer challenges both on and off the mat. Furssan Fight Club - a sanctuary 
      for growth, camaraderie, and personal transformation"</div>
      <img  id = "discipline" src= {discipline} alt=""/>
      <img  id = "respect" src= {respect} alt=""/>
      <img  id = "honor" src= {honor} alt=""/>
      <img  id = "resillience" src= {resilience} alt=""/>
      <div className="fc_layer3"></div>
      <div className="fc_layer4">
        <img  id = "serviceFC" src= {serviceFC} alt=""/>
      </div>
      <div className="fc_layer5">
      <div id="specializations">Specializations:</div>
      <div id="specialization_description">Unleash your true potential with our wide variety of classes suitable for everyone's inner warrior...</div>
      <div id="Taekwondo">Taekwondo</div>
      <div id="MMA">MMA</div>
      <div id="Boxing">Boxing</div>
      <div id="Jiu_Jitsu">Jui Jitsu</div>
      <div id="Muy_Thai">Muy Thai</div>
      <div id="Pricing">*Pricing varies per class*</div>
      </div>
      <div className="fc_layer6"></div>
      </div>
  </div>
    );
  }
  
  export default FurssanFC;