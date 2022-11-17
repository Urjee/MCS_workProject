import CommentForm from "./CommentForm";
const UserID = window.localStorage.userid;

const Comment = ({
  
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  
  const today = new Date();
  const createdate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const currentTime = today.getHours() + ":" + today.getMinutes() +":" + today.getSeconds() + ":" + today.getMilliseconds();
  
  
  const timePassed = new Date() - (createdate + " " + currentTime) > fiveMinutes;
  const canDelete =  UserID === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(UserID);
  const canEdit = UserID === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        <div className="comment-actions">
       { canReply&&  <div className="comment-action">Reply</div>}
      { canEdit && <div className="comment-action">Edit</div>} 
      { canDelete && <div className="comment-action">Delete</div>} 
             </div>
        {/* {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )} */}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                UserID={UserID}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;