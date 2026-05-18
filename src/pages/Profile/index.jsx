import React, { useEffect, useState } from "react";

import {
  FaRegHeart,
  FaShareAlt,
  FaBorderAll,
  FaList,
} from "react-icons/fa";

import api from "../../services/api";
import PromptCard from "../../components/PromptCard";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [myPrompts, setMyPrompts] = useState([]);

  const [savedPrompts, setSavedPrompts] = useState([]);

  const [likedPrompts, setLikedPrompts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState("my");

  const token =
    localStorage.getItem("token");

  const fetchProfileData = async () => {
    try {
      
      const userRes = await api.get(
        "/auth/profile"
      );

      const currentUser =
        userRes.data.user;

      setUser(currentUser);

      const promptRes = await api.get(
        "/prompts"
      );

      const allPrompts =
        promptRes.data.data;

      const userPrompts =
        allPrompts.filter(
          (prompt) =>
            prompt.createdBy?._id ===
            currentUser._id
        );

      setMyPrompts(userPrompts);

      const saved =
        allPrompts.filter((prompt) =>
          currentUser.savedPrompts?.includes(
            prompt._id
          )
        );

      setSavedPrompts(saved);

      const liked =
        allPrompts.filter((prompt) =>
          prompt.likes?.includes(
            currentUser._id
          )
        );

      setLikedPrompts(liked);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);


  const handleLike = async (
    promptId
  ) => {
    try {
      await api.post(
        `/prompts/${promptId}/like`
      );

      fetchProfileData();
    } catch (error) {
      console.log(error);
    }
  };


  const handleSave = async (
    promptId
  ) => {
    try {
      await api.post(
        `/prompts/${promptId}/save`
      );

      fetchProfileData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (
    promptId,
    commentText
  ) => {
    try {
      await api.post(
        `/prompts/${promptId}/comment`,
        {
          comment: commentText,
        }
      );

      fetchProfileData();
    } catch (error) {
      console.log(error);
    }
  };

 
  const getActivePrompts = () => {
    if (activeTab === "my")
      return myPrompts;

    if (activeTab === "saved")
      return savedPrompts;

    if (activeTab === "liked")
      return likedPrompts;

    return [];
  };

  const activePrompts =
    getActivePrompts();

  if (loading) {
    return (
      <div className="profile-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="profile-page">
      
      <div className="profile-header">
        <div className="profile-left">
          <img
            src="https://i.pravatar.cc/300"
            alt="profile"
            className="profile-avatar"
          />

          <div>
            <h1 className="profile-name">
              {user?.name}
            </h1>

            <p className="profile-username">
              @
              {user?.name
                ?.toLowerCase()
                .replace(/\s/g, "_")}
            </p>

            <p className="profile-bio">
              AI Prompt Engineer &
              Creative Thinker.
            </p>

            {/* STATS */}
            <div className="profile-stats">
              <div>
                <h3>
                  {myPrompts.length}
                </h3>

                <span>PROMPTS</span>
              </div>

              <div>
                <h3>
                  {savedPrompts.length}
                </h3>

                <span>SAVED</span>
              </div>

              <div>
                <h3>
                  {likedPrompts.length}
                </h3>

                <span>LIKED</span>
              </div>
            </div>
          </div>
        </div>


        <div className="profile-actions">
          <button className="edit-btn">
            Edit Profile
          </button>

          <button className="share-btn">
            <FaShareAlt />
          </button>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={
            activeTab === "my"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("my")
          }
        >
          My Prompts
        </button>

        <button
          className={
            activeTab === "saved"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("saved")
          }
        >
          Saved Prompts
        </button>

        <button
          className={
            activeTab === "liked"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("liked")
          }
        >
          Liked Prompts
        </button>

        <div className="tab-icons">
          <FaBorderAll />

          <FaList />
        </div>
      </div>

      
      <div className="profile-grid">
        {activePrompts.length > 0 ? (
          activePrompts.map((prompt) => (
            <div className="col-md-6 col-lg-3">
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              onLike={handleLike}
              onSave={handleSave}
              onComment={handleComment}
              token={token}
            />
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h5>No prompts found</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;