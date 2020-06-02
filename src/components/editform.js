import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import authCtx from "../contexts/auth";
import { Input, Textarea } from "./CustomeUI";
import { useAsync } from "react-hook-async";
import { uploadFile } from "../api/file";
import { updateSetCard } from "../api/flashcard";
import { Form } from "react-bootstrap";

import "./editform.scss";
import Modal from "../components/modal";

import withAuth from "../hoc/authHoc";
import { useParams } from "react-router-dom";

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
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState("");
  const onChooseImage = (event) => {
    // console.log(event);
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
      setMessage("You must enter something");
      setModalShow(true);
    } else {
      setCardDetailArr([
        ...cardDetailArr,
        {
          card_title: cardKeyword,
          card_desc: cardDesc,
          card_completed: false,
        },
      ]);
      setCardDesc("");
      setCardKeyword("");
    }
  }

  function handleDeleteCardItem(index) {

	const coppyArr = [...cardDetailArr];

	coppyArr.splice(index, 1);

	setCardDetailArr(coppyArr);
	
  }

  function handleUpdate() {
    if (!title || !description) {
      setMessage("You must enter title and description");
      setModalShow(true);
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
        setMessage("Update successfully");
        setModalShow(true);
        document.location.pathname = "/dashboard";
      });
    }
  }

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
  },[]);

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
        {modalShow && (
          <Modal
            show={modalShow}
            message={message}
            onHide={() => setModalShow(false)}
          ></Modal>
        )}
        <div className="set-meta">
          <div className="header-edit">
            <h3>Update set card!</h3>
            <button className="finish" onClick={handleUpdate}>
              {!postingStatus ? "Update!" : "Updating..."}
            </button>
          </div>
          {/* <div className="header-edit2">
            <h3>Update set card!</h3>
            <button className="finish2" onClick={handleUpdate}>
              {!postingStatus ? "Update!" : "Updating..."}
            </button>
          </div> */}
          <div className="container">
            <div className="set-meta-wrapper">
              <div className="set-meta-form">
                <form>
                  <h3>Update set card!</h3>
                  <label htmlFor="set-title">Title</label>
                  <input
                    className="border-input"
                    type="text"
                    value={title}
                    id="set-title"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />

                  <label htmlFor="set-desc">Description</label>
                  <textarea
                    className="border-grey"
                    value={description}
                    id="set-desc"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />

                  <input
                    type="checkbox"
                    id="set-public"
                    checked={share}
                    value={1}
                    onChange={(e) => setShare(e.target.checked)}
                  />
                  <label htmlFor="set-public">Public ?</label>
                  <button className="btn-update" onClick={handleUpdate}>
                    {!postingStatus ? "Update!" : "Updating..."}
                  </button>
                </form>
              </div>

              <div>
                <div className="set-avatar">
                  <div className="avt">
                    <img
                      src={process.env.REACT_APP_API_DOMAIN + "/" + avatar}
                      alt=""
                      style={{ width: "600px", height: "340px" }}
                      className="border rounded"
                    />
                  </div>

                  <input type="file" onChange={onChooseImage} />
                </div>
              </div>
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
                    <button className="clear">
                      <i class="material-icons">clear</i>
                    </button>
                  </div>
                  <div className="body">
                    <div className="card-edit">
                      <input
                        className="border-input"
                        type="text"
                        placeholder="Enter term"
                        value={item.card_title}
                        onChange={(e) =>
                          handleUpdateKeyword(e.target.value, idx)
                        }
                      />
                    </div>
                    <div className="card-edit">
                      <input
                        className="border-input"
                        placeholder="Enter Definition"
                        value={item.card_desc}
                        onChange={(e) => handleUpdateDesc(e.target.value, idx)}
                      />
                    </div>
                  </div>
                </div>
              ))}

            <div className="card-detail-item">
              <div className="header">
                <span>Card item {cardDetailArr.length + 1}</span>
              </div>
              <div className="body">
                <div className="card-edit">
                  <input
                    className="border-input"
                    type="text"
                    placeholder="Enter term"
                    value={cardKeyword}
                    onChange={(e) => setCardKeyword(e.target.value)}
                  />
                </div>
                <div className="card-edit">
                  <input
                    className="border-input"
                    placeholder="Enter Definition"
                    value={cardDesc}
                    onChange={(e) => setCardDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="bnt-add">
                <button className="addThis" onClick={handlePushCardItem}>
                  Add this card!
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default withAuth(EditForm);

const CardDetailItem = (props) => {

	const {stt, handleDelete, handleUpdateKeyword, handleUpdateDesc, title, desc, placeholder_title, placeholder_desc} = props;
	const [show, setShow] = useState(true);

	return (
		<div className="card-detail-item">
			<div className="header">
				<span>Card #{stt}</span>
				<div>
					{
						show ? <span 
								className="collapse-icon" 
								title="Collapse this card" 
								role="img" 
								aria-label="collapse-icon"
								onClick={() => setShow(!show)}
							>🔺
							</span>
							: <span 
								className="collapse-icon" 
								title="Open this card" 
								role="img" 
								aria-label="collapse-icon"
								onClick={() => setShow(!show)}
							>🔻
							</span>
					}
					<span 
						className="delete-icon" 
						onClick={handleDelete} 
						title="Delete this card!" 
						role="img" 
						aria-label="delete-icon"
					>🖤
					</span>
				</div>
			</div>
			<div className="body" style={{display: show ? 'flex' : 'none'}}>

				<div className="keyword">
					<label>Thuật ngữ</label>
					<Input
						type="text"
						placeholder={placeholder_title}
						value={title}
						onBlur={handleUpdateKeyword}
					/>
				</div>

				<div className="description">
					<label>Mô tả</label>
					<Textarea
						placeholder={placeholder_desc}
						value={desc}
						onBlur={handleUpdateDesc}
					/>
				</div>

				<div className="photo">Hinh anh minh hoa</div>
				
			</div>
		</div>
	);
};