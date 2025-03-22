import { useNavigate } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-left">
        <h1 className="home-title">Welcome to AI-based Career Mentor and Text Redundancy</h1>
        <p className="home-intro">We are the Best!!</p>
        <h2>Empowering Your Career with AI</h2>
        <p className="home-description">
          Are you ready to take your career to the next level with cutting-edge AI solutions? Look no further! 
          At AI Career Mentor, we specialize in providing innovative AI-driven career guidance and text analysis solutions 
          tailored to your unique needs.
        </p>
        <div className="button-container">
          <button className="btn">Connect Now</button>
          <button className="btn">Learn More</button>
          <button className="btn" onClick={() => navigate("/courses")}>Courses</button>
        </div>
      </div>
      <div className="home-right">
        <img src="./images/home.png" alt="AI Career Mentor" className="home-image" />
      </div>
    </div>
  );
};

export default Home;
