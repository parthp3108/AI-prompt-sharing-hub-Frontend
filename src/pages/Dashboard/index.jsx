import DashboardLayout from "../../layouts/DashboardLayout";
import { useState } from "react";
import "../../App.css";
import api from "../../services/api";
import PromptCard from "../../components/PromptCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const tabs = ["All", "Trending", "Latest", "Most Liked"];
  const categories = ["All", "GPT-4", "Midjourney", "DALL·E 3", "Claude 3", "Coding", "Marketing", "Business", "Design", "Education"];

  const getPrompts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/prompts");
      if (response.data.success) {
        setPrompts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrompts();
  }, []);


  const handleLike = async (promptId) => {
    if (!token) {
      alert("Please login to like prompts");
      return;
    }
    
    try {
      const response = await api.post(
        `/prompts/${promptId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      

      setPrompts(prevPrompts =>
        prevPrompts.map(prompt =>
          prompt._id === promptId
            ? {
                ...prompt,
                likes: response.data.message === "Prompt liked"
                  ? [...prompt.likes, token]
                  : prompt.likes.filter(id => id !== token)
              }
            : prompt
        )
      );
    } catch (error) {
      console.error("Error liking prompt:", error);
      alert(error.response?.data?.message || "Error liking prompt");
    }
  };


  const handleSave = async (promptId) => {
    if (!token) {
      alert("Please login to save prompts");
      return;
    }
    
    try {
      const response = await api.post(
        `/prompts/${promptId}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(response.data.message);
      
     
      setPrompts(prevPrompts =>
        prevPrompts.map(prompt =>
          prompt._id === promptId
            ? { ...prompt, isSaved: !prompt.isSaved }
            : prompt
        )
      );
    } catch (error) {
      console.error("Error saving prompt:", error);
      alert(error.response?.data?.message || "Error saving prompt");
    }
  };


  const handleComment = async (promptId, commentText) => {
    if (!token) {
      alert("Please login to comment");
      return;
    }
    
    if (!commentText.trim()) {
      alert("Please enter a comment");
      return;
    }
    
    try {
      const response = await api.post(
        `/prompts/${promptId}/comment`,
        { comment: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPrompts(prevPrompts =>
        prevPrompts.map(prompt =>
          prompt._id === promptId
            ? {
                ...prompt,
                comments: [...(prompt.comments || []), response.data.comment]
              }
            : prompt
        )
      );
      
      alert("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert(error.response?.data?.message || "Error adding comment");
    }
  };

  const getFilteredPrompts = () => {
    let filtered = prompts;

 
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (prompt) => prompt.category === selectedCategory
      );
    }

    if (activeTab === "Trending") {
      filtered = [...filtered].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    } else if (activeTab === "Latest") {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeTab === "Most Liked") {
      filtered = [...filtered].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    }

    return filtered;
  };

  const filteredPrompts = getFilteredPrompts();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1>Explore Prompts</h1>
          <p className="text-muted">
            Discover high-performance prompts engineered for precision and
            creativity.
          </p>
        </div>
        <div>
          <ul className="nav nav-pills">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab}>
                <a
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                >
                  {tab}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="category-section mt-4">
          <div className="d-flex gap-3 align-items-center flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-pill ${selectedCategory === category ? "active-category" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="btn-group mt-4">
          <button
            type="button"
            className="btn category-dropdown-btn dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Category: {selectedCategory}
          </button>
          <ul className="dropdown-menu">
            {categories.map((category) => (
              <li key={category}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category);
                  }}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No prompts found in this category</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredPrompts.map((prompt) => (
              <div key={prompt._id} className="col-md-6 col-lg-3">
                <PromptCard 
                  prompt={prompt}
                  onLike={handleLike}
                  onSave={handleSave}
                  onComment={handleComment}
                  token={token}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;