import React from "react";

import EditorInner from "../../EditorInner";
import { Textarea, Button } from "../../../";
import { useComments } from "../../../../hooks";
import "./comments.scss";

const Comments = (props) => {
  const { commentState, commentActions } = useComments();

  const {
    commentsData,
    comment,
    loggedInUserID,
    loggedInUserName,
    latestMessageContainer,
  } = commentState;
  const { commentField, updateCommentData } = commentActions;
  const returnBody = () => (
    <div className="comments-wrapper">
      {commentsData && commentsData.length && (
        <ul className="comments-container">
          {commentsData.map((comment, index) => (
            <li
              className={`${comment.userID === loggedInUserID ? "self" : ""} ${
                comment.userID ===
                (commentsData[index + 1] && commentsData[index + 1].userID)
                  ? "unique"
                  : ""
              }`}
              key={comment.id}
              ref={
                commentsData.length - 1 === index
                  ? latestMessageContainer
                  : null
              }
              tabIndex={commentsData.length - 1 === index ? "-1" : ""}
            >
              {comment.userID !==
                (commentsData[index - 1] && commentsData[index - 1].userID) && (
                <p>{comment.userName}</p>
              )}
              <div className="comment">{comment.comment}</div>
              <p>{comment.time}</p>
            </li>
          ))}
          {/* <li>
            <p>Jack</p>
            <div className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </div>
            <p>11:30 am PST</p>
          </li>
          <li className="self">
            <p>Me</p>
            <div className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor
            </div>
            <p>12:30 pm PST</p>
          </li>
          <li className="self">
            <p>Me</p>
            <div className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </div>
            <p>12:30 pm PST</p>
          </li>
          <li>
            <p>Jack</p>
            <div className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor{" "}
            </div>
            <p>12:30 pm PST</p>
          </li> */}
        </ul>
      )}
    </div>
  );

  const returnFooter = () => (
    <form className="add-comments-wrapper">
      <Textarea
        name="comments"
        id="comments"
        value={comment}
        onChange={commentField}
        placeholder="Enter your comments"
      />
      <Button
        type="submit"
        kind="primary"
        id="addComment"
        name="addComment"
        value="Submit"
        className="btn-sm"
        onClick={updateCommentData}
        disabled={!comment}
      />
    </form>
  );

  return <EditorInner body={returnBody()} footer={returnFooter()} />;
};

export default Comments;
