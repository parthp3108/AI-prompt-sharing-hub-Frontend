import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PromptCard = ({ prompt, onLike, onSave, onComment, token }) => {
  const [isLiked, setIsLiked] = useState(
    token && prompt?.likes?.includes(token) || false
  );
  const [isSaved, setIsSaved] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(prompt?.likes?.length || 0);
  const [saveCount, setSaveCount] = useState(prompt?.saves?.length || 0);

  const navigate =useNavigate();

  const handleLikeClick = () => {
    if (!token) {
      alert("Please login to like prompts");
      return;
    }
    
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
    onLike(prompt._id);
  };

  const handleSaveClick = () => {
    if (!token) {
      alert("Please login to save prompts");
      return;
    }
    
    if (isSaved) {
      setSaveCount(saveCount - 1);
      setIsSaved(false);
    } else {
      setSaveCount(saveCount + 1);
      setIsSaved(true);
    }
    onSave(prompt._id);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(prompt._id, commentText);
      setCommentText("");
      setShowCommentBox(false);
    }
  };

  const getRandomImage = () => {
    const imageIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const index = (prompt?._id?.length || 0) % imageIds.length;
    return `https://picsum.photos/id/${imageIds[index]}/400/200`;
  };

  const getRandomAvatar = () => {
    const avatarIds = [64, 65, 66, 67, 68, 69, 70, 71, 72];
    const index = (prompt?._id?.length || 0) % avatarIds.length;
    return `https://picsum.photos/id/${avatarIds[index]}/32/32`;
  };

  return (
    <div className="prompt-card" onClick={()=>navigate(`/prompt/${prompt._id}`)}>
      <div className="prompt-category-badge">{prompt?.category || "GENERAL"}</div>
      
      <div className="prompt-image">
        <img src={getRandomImage()} alt="prompt thumbnail" />
      </div>
      
      <h3 className="prompt-title">{prompt?.title || "Untitled Prompt"}</h3>
      <p className="prompt-description">
        {prompt?.description || "No description available"}
      </p>
      
      {prompt?.tags && prompt.tags.length > 0 && (
        <div className="prompt-tags">
          {prompt.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      <div className="prompt-footer">
        <div className="author-info">
          <img 
            src={getRandomAvatar()} 
            alt="avatar" 
            className="author-avatar"
          />
          <span>{prompt?.createdBy?.name || "anonymous"}</span>
        </div>
        <div className="stats">
          <span className={`stat ${isLiked ? "liked" : ""}`} onClick={handleLikeClick} style={{ cursor: "pointer" }}>
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
            <span>{likeCount > 1000 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}</span>
          </span>
          <span className={`stat ${isSaved ? "saved" : ""}`} onClick={handleSaveClick} style={{ cursor: "pointer" }}>
            {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
            <span>{saveCount}</span>
          </span>
          <span className="stat" onClick={() => setShowCommentBox(!showCommentBox)} style={{ cursor: "pointer" }}>
            <FaRegComment />
            <span>{prompt?.comments?.length || 0}</span>
          </span>
        </div>
      </div>

     
      {showCommentBox && (
        <div className="comment-box mt-3">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="d-flex gap-2 mt-2">
            <button 
              className="btn btn-sm btn-primary"
              onClick={handleCommentSubmit}
            >
              Post Comment
            </button>
            <button 
              className="btn btn-sm btn-secondary"
              onClick={() => setShowCommentBox(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;