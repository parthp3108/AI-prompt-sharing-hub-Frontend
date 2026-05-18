
import {
  FaSearch,
  FaRobot,
  FaCommentAlt,
  FaMagic,
  FaShieldAlt,
} from "react-icons/fa";

import Icon from "../../assets/icon.svg";
const Home = () => {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>
            Discover & <br />
            Share <span>AI</span> <br />
            <span>Prompts</span>
          </h1>

          <p>
            The ultimate platform for engineering and discovering
            high-quality prompts for any AI model.
          </p>

          {/* SEARCH BAR */}
          <div className="search-box">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search prompts..." />
            </div>

            <button>Search</button>
          </div>

          {/* TAGS */}
          <div className="tags">
            <span>Coding</span>
            <span>Marketing</span>
            <span>Design</span>
            <span>AI Art</span>
          </div>

          {/* STATS */}
          <div className="stats">
            <div>
              <h3>10K+</h3>
              <p>PROMPTS</p>
            </div>

            <div>
              <h3>5K+</h3>
              <p>USERS</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="hero-right">
          <div className="ai-card">
            <div className="ai-icon">
            <img src={Icon} alt="icon" />
            </div>

            <h3>AI ENGINE</h3>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="trending-section">
        <h2>Trending Systems</h2>

        <div className="cards">
          {/* CARD 1 */}
          <div className="system-card">
            <div className="card-icon purple">
              <FaCommentAlt />
            </div>

            <h3>ChatGPT Master</h3>

            <p>
              2,500+ engineered prompts for expert workflows.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="system-card">
            <div className="card-icon gray">
              <FaMagic />
            </div>

            <h3>Midjourney Gen</h3>

            <p>
              Photorealistic lighting and camera techniques.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="system-card">
            <div className="card-icon orange">
              <FaShieldAlt />
            </div>

            <h3>Claude Pro</h3>

            <p>
              Complex reasoning and data analysis templates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;