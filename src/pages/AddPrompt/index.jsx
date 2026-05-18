import React, { useState } from "react";

import { FaRocket, FaLightbulb } from "react-icons/fa";

import api from "../../services/api";

const AddPrompt = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    promptText: "",
    category: "Art & Illustration",
    tags: "",
  });

  // Handle Input Change
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Convert tags string into array
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };

      const { data } = await api.post("/prompts", payload);

      console.log(data);

      alert("Prompt Published Successfully");

      // Reset Form
      setFormData({
        title: "",
        description: "",
        promptText: "",
        category: "Art & Illustration",
        tags: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to create prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-prompt-page">
      {/* Left Section */}
      <div className="prompt-form-section">
        {/* Heading */}
        <div className="mb-4">
          <h1 className="prompt-heading">Publish New Prompt</h1>

          <p className="prompt-subtitle">
            Precision engineer your next masterpiece and share it with the
            community.
          </p>
        </div>

        {/* Form Card */}
        <div className="prompt-card">
          <form onSubmit={submitHandler}>
            {/* Title */}
            <div className="mb-4">
              <label className="prompt-label">PROMPT TITLE</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={changeHandler}
                className="prompt-input"
                placeholder="e.g. Cinematic Lighting for Architecture"
                required
              />
            </div>

            <div className="mb-4">
              <label className="prompt-label">DESCRIPTION</label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={changeHandler}
                className="prompt-input"
                placeholder="Short description of your prompt"
                required
              />
            </div>

            <div className="prompt-row">
              <div className="prompt-field">
                <label className="prompt-label">CATEGORY</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={changeHandler}
                  className="prompt-input"
                >
                  <option>Art & Illustration</option>

                  <option>Coding</option>

                  <option>Marketing</option>

                  <option>Education</option>
                </select>
              </div>

              <div className="prompt-field">
                <label className="prompt-label">TAGS</label>

                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={changeHandler}
                  className="prompt-input"
                  placeholder="GPT-4, Creative, Photography..."
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="prompt-label">PROMPT CONTENT</label>

              <div className="textarea-wrapper">
                <textarea
                  name="promptText"
                  value={formData.promptText}
                  onChange={changeHandler}
                  className="prompt-textarea"
                  placeholder="Paste your precision prompt here..."
                  required
                ></textarea>

                <div className="textarea-tags">
                  <span>MONO</span>

                  <span>MID SUPPORT</span>
                </div>
              </div>
            </div>

            <button type="submit" className="publish-btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish Prompt"}

              <FaRocket />
            </button>
          </form>
        </div>
      </div>

      <div className="tips-section">
        <div className="tips-card">
          <div className="tips-header">
            <FaLightbulb />

            <h4>Tips for a great prompt</h4>
          </div>

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
            alt="Tips"
            className="tips-image"
          />

          <div className="tips-list">
            <div className="tip-item">
              <span>01</span>

              <p>
                Be specific about the style and medium you want the AI to
                emulate.
              </p>
            </div>

            <div className="tip-item">
              <span>02</span>

              <p>
                Use technical terminology like "octane render" or "ray tracing".
              </p>
            </div>

            <div className="tip-item">
              <span>03</span>

              <p>Define constraints clearly to prevent hallucination.</p>
            </div>
          </div>

          <button className="guidebook-btn">VIEW GUIDEBOOK</button>
        </div>

        <div className="visibility-card">
          <div>
            <small>VISIBILITY</small>

            <h5>Public</h5>
          </div>

          <div>
            <small>EST. REACH</small>

            <h5>High</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrompt;
