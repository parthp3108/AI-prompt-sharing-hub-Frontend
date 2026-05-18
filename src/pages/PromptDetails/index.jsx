
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import {
  FiArrowLeft,
  FiHeart,
  FiMessageSquare,
  FiBookmark,
  FiShare2,
  FiCopy,
} from "react-icons/fi";

const PromptDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPromptDetails = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/prompts/${id}`);

      if (response.data.success) {
        setPrompt(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPromptDetails();
  }, [id]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt);
  };

  if (loading) {
    return (
      <div className="prompt-loader">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="prompt-loader">
        <h3>Prompt not found</h3>
      </div>
    );
  }

  return (
    <div className="prompt-details-page">
      <div className="prompt-details-container">

        {/* LEFT SECTION */}
        <div className="prompt-left">

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <FiArrowLeft />
            BACK TO DISCOVER
          </button>

          <h1 className="prompt-heading">
            {prompt.title}
          </h1>

          {/* AUTHOR */}
          <div className="author-section">

            <div className="author-left">
              <img
                src={
                  prompt.user?.profileImage ||
                  "https://i.pravatar.cc/100?img=12"
                }
                alt="author"
                className="author-image"
              />

              <div>
                <h5>{prompt.user?.name || "Unknown User"}</h5>
                <p>PREMIUM PRO CREATOR</p>
              </div>
            </div>

            <div className="prompt-tags">
              <span>{prompt.model || "GPT-4"}</span>

              <span>{prompt.category}</span>

              {prompt.tags?.slice(0, 1).map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>

          {/* PROMPT CARD */}
          <div className="prompt-detail-card">

            <div className="prompt-card-header">
              <div className="system-prompt">
                <span>🖥</span>
                <p>SYSTEM PROMPT</p>
              </div>

              <button
                className="copy-btn"
                onClick={copyPrompt}
              >
                <FiCopy />
                COPY PROMPT
              </button>
            </div>

            <div className="prompt-box">

              <h3>
                "
                {prompt.shortDescription ||
                  prompt.title}
                "
              </h3>

              <p>
                {prompt.prompt}
              </p>
            </div>

            <div className="prompt-actions">

              <div className="action-left">

                <button>
                  <FiHeart />
                  {prompt.likes?.length || 0}
                </button>

                <button>
                  <FiMessageSquare />
                  {prompt.comments?.length || 0}
                </button>

                <button>
                  <FiBookmark />
                  SAVE
                </button>
              </div>

              <button className="share-btn">
                <FiShare2 />
              </button>
            </div>
          </div>

          {/* DISCUSSION */}
          <div className="discussion-wrapper">

            <h2>Community Discussions</h2>

            <div className="discussion-input">

              <div className="discussion-avatar">
                <img
                  src="https://i.pravatar.cc/100?img=15"
                  alt=""
                />
              </div>

              <input
                type="text"
                placeholder="Share your thoughts..."
              />
            </div>

            {/* COMMENTS */}
            {prompt.comments?.length > 0 ? (
              prompt.comments.map((comment, index) => (
                <div
                  className="discussion-card"
                  key={index}
                >
                  <img
                    src="https://i.pravatar.cc/100?img=32"
                    alt=""
                    className="discussion-user"
                  />

                  <div className="discussion-content">

                    <div className="discussion-top">
                      <h5>
                        {comment.user?.name ||
                          "Anonymous"}
                      </h5>

                      <span>
                        {new Date(
                          comment.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="discussion-card">
                <img
                  src="https://i.pravatar.cc/100?img=32"
                  alt=""
                  className="discussion-user"
                />

                <div className="discussion-content">
                  <div className="discussion-top">
                    <h5>Sarah Connor</h5>
                    <span>2 HOURS AGO</span>
                  </div>

                  <p>
                    The basalt-concrete foundation
                    parameter is genius. It really
                    shifts the Midjourney output toward
                    a grounded, realistic aesthetic.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="prompt-right">

          <div className="metrics-wrapper">

            <h5>PERFORMANCE METRICS</h5>

            <div className="metrics-grid">

              <div className="metric-card">
                <h2>98%</h2>
                <p>SUCCESS RATE</p>
              </div>

              <div className="metric-card">
                <h2>
                  {prompt.views || "4.2k"}
                </h2>
                <p>TOTAL USES</p>
              </div>
            </div>
          </div>

          {/* RELATED */}
          <div className="related-wrapper">

            <div className="related-top">
              <h5>RELATED PROMPTS</h5>
              <span>SEE ALL</span>
            </div>

            <div className="related-item">
              <img
                src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=400"
                alt=""
              />

              <div>
                <h4>
                  Parametric Pavilion Design
                </h4>

                <p>
                  ARCHITECTURE • MIDJOURNEY
                </p>
              </div>
            </div>

            <div className="related-item">
              <img
                src="https://images.unsplash.com/photo-1529429617124-aee711a5ac1c?q=80&w=400"
                alt=""
              />

              <div>
                <h4>
                  Urban Core Masterplan v2
                </h4>

                <p>PLANNING • GPT-4</p>
              </div>
            </div>
          </div>

          {/* UPGRADE */}
          <div className="upgrade-wrapper">

            <p className="pro-text">
              PRO FEATURE
            </p>

            <h3>
              Unlock AI Fine-tuning
            </h3>

            <p className="upgrade-desc">
              Take your architectural prompts
              to the next level.
            </p>

            <button>
              UPGRADE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetails;