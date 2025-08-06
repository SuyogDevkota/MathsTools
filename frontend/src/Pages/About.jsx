import React from "react";
import "./About.css";
import teacherPhoto from "../assets/Rajkumar_sir.jpg";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-card">
        <div className="left">
          <img src={teacherPhoto} alt="Teacher" className="teacher-image" />
        </div>
        <div className="right">
          <h1>Mr. Raj Kumar Kandel</h1>
          <h3>Mathematics Teacher</h3>

          <p className="bio">
            With over 15 years of experience in teaching Mathematics, Mr. Raj Kumar Kandel brings a deep understanding and passion for the subject. He believes in making complex topics accessible through interactive lessons and real-world examples.
          </p>

          <div className="section">
            <h4>🎓 Education & Experience</h4>
            <ul>
              <li>MSc in Mathematics, Tribhuvan University</li>
              <li>15+ years teaching at Narayani Model Secondary School</li>
              <li>Former lecturer at XYZ Institute</li>
            </ul>
          </div>

          <div className="section">
            <h4>🏆 Achievements</h4>
            <ul>
              <li>Best Teacher Award 2077</li>
              <li>Co-authored "Math Made Easy" textbook</li>
            </ul>
          </div>

          <div className="section">
            <h4>📘 Subjects Taught</h4>
            <ul>
              <li>Algebra</li>
              <li>Geometry</li>
              <li>Calculus</li>
              <li>Statistics</li>
            </ul>
          </div>

          <div className="section">
            <h4>📫 Contact</h4>
            <p>Email: rambahadur@school.edu</p>
            <p>Phone: 9841XXXXXX</p>
          </div>

          <div className="section">
            <h4>✨ Fun Fact</h4>
            <p>In his free time, he enjoys hiking and solving logic puzzles.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
