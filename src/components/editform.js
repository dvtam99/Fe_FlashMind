import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import authCtx from "../contexts/auth";
import { Input, Textarea } from "./CustomeUI";
import { useAsync } from "react-hook-async";
import { uploadFile } from "../api/file";
import { updateSetCard } from "../api/flashcard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt,
  useParams,
  useLocation,
} from "react-router-dom";

const EditForm = () => {
  const { authUser } = useContext(authCtx);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadFileApi, callUploadFileApi] = useAsync(null, uploadFile);
  let { slug } = useParams();
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [share, setShare] = useState(false);
  const [avatar, setAvatar] = useState("public/demo.jpg");
  const [cardDetailArr, setCardDetailArr] = useState([]);
  const [cardKeyword, setCardKeyword] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [postingStatus, setPostingStatus] = useState(false);
  const [updateApiData, fetchUpdateApiData] = useAsync(null, updateSetCard);
  const onChooseImage = (event) => {
    console.log(event);
    if (event.target.files.length < 1) return;
    callUploadFileApi(event.target.files[0], authUser.token).then((res) =>
      setAvatar(res.data)
    );
  };

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

  function handleUpdate() {
    if (!title || !description) {
      alert("Phai nhap title, description");
      return;
    } else {
      const data = {
        _id: id,
        title: title,
        description: description,
        folder: [],
        empty: cardDetailArr.length === 0 ? true : false,
        share,
        finish: false,
        avatar: avatar,
        detail: cardDetailArr,
      };
      fetchUpdateApiData(authUser.token, data).then((res) => {
        setPostingStatus(false);
        alert("Update successfully");
        document.location.pathname = "/dashboard";
      });
    }
  }

  //a sua cho e cho nay la show len modal nhe
  // useEffect(() => {
  //   if (updateApiData.loading) {
  //     return (
  //       <div className="loading">
  //         <ReactLoading type="spin" color="#ffa5ab" />
  //       </div>
  //     );
  //   }
  //   if (updateApiData.error) {
  //     return <div>Error: {updateApiData.error.message}</div>;
  //   }
  // }, [updateApiData.loading, updateApiData.error]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard/${slug}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setResult(result);

          // Update api result vào state
          setID(result._id);
          setTitle(result.title);
          setDescription(result.description);
          setShare(result.share);
          setAvatar(result.avatar);
          setCardDetailArr([...result.detail]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="#ffa5ab" />
      </div>
    );
  } else if (!result) {
    return null;
  } else {
    return (
      <>
        <div className="set-meta">
          <div className="container">
            <div className="set-meta-wrapper">
              <div className="set-meta-form">
                <h1>Update set card!</h1>

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

            <button className="finish" onClick={handleUpdate}>
              {!postingStatus ? "Update!" : "Updating..."}
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default EditForm;
