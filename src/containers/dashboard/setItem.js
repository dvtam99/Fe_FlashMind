import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import authCtx from "../../contexts/auth";
import { useAsync } from "react-hook-async";

import { deleteSetCard } from "../../api/flashcard";

const SetItem = (props) => {
  const {
    _id,
    avatar,
    title,
    date_created,
    author,
    empty,
    detail,
    slug,
  } = props.item;
  const { authUser } = useContext(authCtx);
  const currentUser = authUser.user.username;
  const [deleteApiData, fetchDeleteApiData] = useAsync(null, deleteSetCard);

  function handleDelete() {
    const data = {
      _id: _id,
    };
    console.log(data);
    fetchDeleteApiData(authUser.token, data).then((res) => {
      if (res.success) {
        alert("Delete successfully");
        document.location.reload();
      } else {
        alert("Errr");
        document.location.reload();
      }
    });
  }
  return (
    <div className="set-item">
      <div className="avatar">
        <img
          src={process.env.REACT_APP_API_DOMAIN + "/" + avatar}
          alt="avatar"
        />
      </div>

      <div className="set-content">
        <h4>
          <a href={`/setCard/${slug}`}>{title}</a>
        </h4>

        <div className="date-created">{date_created}</div>

        <div className="author">
          <span role="img" aria-label="avatar-image">
            👨‍🦱
          </span>
          {author.name}
        </div>

        {empty && (
          <div className="empty">
            <span role="img" aria-label="empty-image">
              ⨂
            </span>
            (0/0)
          </div>
        )}

        {!empty && (
          <div
            className={`finish ${
              detail.filter((item) => item.card_completed === true).length !==
              detail.length
                ? "not-yet"
                : ""
            }`}
          >
            <span role="img" aria-label="finish-image">
              {detail.filter((item) => item.card_completed === true).length ===
              detail.length
                ? "✔"
                : "U"}
            </span>

            {`(${
              detail.filter((item) => item.card_completed === true).length
            }/${detail.length})`}
          </div>
        )}

        {currentUser === author.username ? (
          <>
            <div className="edit" title="Edit this  set">
              <span role="img" aria-label="edit-image">
                🧹
              </span>
              <a href={`/flashcard/edit/${slug}`}>Edit</a>
            </div>
            <div
              className="delete"
              title="Delete this set"
              onClick={handleDelete}
            >
              <span role="img" aria-label="edit-image">
                🔴
              </span>
              Delete
            </div>
          </>
        ) : (
          <div>&nbsp;</div>
        )}
      </div>
    </div>
  );
};

export default SetItem;
