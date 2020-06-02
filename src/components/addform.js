import React, { useState, useContext, useEffect } from "react";

import { createSetCard } from "../api/flashcard";
import authCtx from "../contexts/auth";
import { Input, Textarea } from "./CustomeUI";
import { useAsync } from "react-hook-async";
import { uploadFile } from "../api/file";
import withAuth from "../hoc/authHoc";

import "./editform.scss";

const AddForm = () => {
  const { authUser } = useContext(authCtx);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [share, setShare] = useState(false);
  const [avatar, setAvatar] = useState("public/demo.jpg");

  const [cardKeyword, setCardKeyword] = useState("");
  const [cardDesc, setCardDesc] = useState("");

  const [cardDetailArr, setCardDetailArr] = useState([]);
  const [uploadFileApi, callUploadFileApi] = useAsync(null, uploadFile);
  const [postingStatus, setPostingStatus] = useState(false);
  // debugger
  const onChooseImage = (event) => {
    console.log(event);
    if (event.target.files.length < 1) return;
    callUploadFileApi(event.target.files[0], authUser.token).then((res) =>
      setAvatar(res.data)
    );
  };
  function handleSave() {
    if (!title || !description) {
      alert("Phai nhap title, description");
      return;
    } else {
      const data = {
        title,
        description,
        date_created: new Date().toISOString(),
        folder: [],
        empty: cardDetailArr.length === 0 ? true : false,
        share,
        finish: false,
        avatar,
        detail: cardDetailArr,
      };
      // console.log(data);

      fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          setPostingStatus(true);
          return res.json();
        })
        .then(
          (result) => {
            console.log(result.date_created);
            setPostingStatus(false);
            alert("Tao bai bo flashcard thanh cong");
            document.location.pathname = "/dashboard";
          },
          (error) => {
            console.log(error.message);
          }
        );
    }
  }
  function handleUpdateKeyword(val, idx) {
    const copyArr = [...cardDetailArr];
    copyArr[idx].card_title = val;
    setCardDetailArr(copyArr);
  }

  function handleUpdateDesc(val, idx) {
    const copyArr = [...cardDetailArr];
    copyArr[idx].card_desc = val;
    setCardDetailArr(copyArr);
  }

  function handlePushCardItem() {
    if (cardKeyword === "" || cardDesc === "") {
      alert("phai nhap day du thong tin");
      return;
    } else {
      setCardDetailArr([
        ...cardDetailArr,
        {
          card_id: cardDetailArr.length + 1,
          card_title: cardKeyword,
          card_desc: cardDesc,
          card_completed: false,
        },
      ]);
      setCardDesc("");
      setCardKeyword("");
    }
  }
  return (
    <>
      <div className="set-meta">
        <div className="container">
          <div className="set-meta-wrapper">
            <div className="set-meta-form">
              <h1>Tạo nhóm thẻ mới</h1>

              <input
                type="text"
                value={title}
                id="set-title"
                placeholder="Nhập tiêu đề, ví dụ: Lịch sử Đông Dương, bài 1"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="set-title">Tiêu đề</label>

              <textarea
                value={description}
                id="set-desc"
                placeholder="Nhập tiêu đề, ví dụ: Lịch sử Đông Dương, bài 1"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="set-desc">Mô tả</label>

              <input
                type="checkbox"
                id="set-public"
                checked={share}
                value={1}
                onChange={(e) => setShare(e.target.checked)}
              />
              <label htmlFor="set-public">Public?</label>
            </div>

            <div className="set-avatar">
              <label>Ảnh đại diện cho bộ thẻ</label>
              <input type="file" onChange={onChooseImage} />
            </div>
            <img
              src={process.env.REACT_APP_API_DOMAIN + "/" + avatar}
              alt=""
              style={{ width: "60px", height: "60px" }}
              className="border rounded-circle"
            />
          </div>
        </div>
      </div>

      <div className="set-detail">
        <div className="container">
          {cardDetailArr.length > 0 &&
            cardDetailArr.map((item, idx) => (
              // card-detail-item
              <div key={idx} className="card-detail-item">
                <div className="header">
                  <span>Card item {idx + 1}</span>
                  <div>
                    <span>^</span>
                    <span>x</span>
                  </div>
                </div>
                <div className="body">
                  <div className="keyword">
                    <label>Thuật ngữ</label>
                    <Input
                      type="text"
                      placeholder="Ví dụ: Stateless component"
                      value={item.card_title}
                      onBlur={(e) => handleUpdateKeyword(e.target.value, idx)}
                    />
                  </div>
                  <div className="description">
                    <label>Mô tả</label>
                    <Textarea
                      placeholder="Nhap mo ta"
                      value={item.card_desc}
                      onBlur={(e) => handleUpdateDesc(e.target.value, idx)}
                    />
                  </div>
                  <div className="photo">Hinh anh minh hoa</div>
                </div>
              </div>
            ))}

          <div className="card-detail-item">
            <div className="body">
              <div className="keyword">
                <label>Thuật ngữ</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Stateless component"
                  value={cardKeyword}
                  onChange={(e) => setCardKeyword(e.target.value)}
                />
              </div>
              <div className="description">
                <label>Mô tả</label>
                <textarea
                  placeholder="Ví dụ: lorrem ipssum"
                  value={cardDesc}
                  onChange={(e) => setCardDesc(e.target.value)}
                />
              </div>
              <button className="addthis" onClick={handlePushCardItem}>
                Add this card!
              </button>
            </div>
          </div>

          <button
            className="finish"
            onClick={handleSave}
            disabled={postingStatus}
          >
            {!postingStatus ? "Hoan thanh roi!" : "Creating new set..."}
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(AddForm);
