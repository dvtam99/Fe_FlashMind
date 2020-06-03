import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Prompt,
  useLocation,
} from "react-router-dom";
import { FacebookShareButton } from "react-share";
import Loading from "../components/layout/loading";
import authCtx from "../contexts/auth";
import { ConfirmModal } from "../containers/dashboard/setItem";
import WithAuth from "../hoc/authHoc";

import { Footer } from "../components/layout";

const DetailSet = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [index, setIndex] = useState(1);
  const { authUser } = useContext(authCtx);
  const currentUser = authUser ? authUser.user.username : null;
  let { slug } = useParams();
  const [_id, setId] = useState(null);
  const [confirmModal, showConfirmModal] = useState(false);

  const [slideActive, setSlideActive] = useState(0);

  function handlePrev() {
    if (slideActive === 0) {
      return;
    } else {
      setIndex(index - 1);
      setSlideActive(slideActive - 1);
    }
  }
  function handleDelete() {
    showConfirmModal(false);
    const data = { _id };
    debugger;
    fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authUser.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          document.location.pathname = "/dashboard";
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
  function handleNext() {
    if (slideActive >= result.detail.length - 1) {
      return;
    } else {
      setSlideActive(slideActive + 1);
      setIndex(index + 1);
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard/${slug}`, {
      method: "get",
      // headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authUser.token}`}
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setId(result._id);

          setResult(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (!result) return null;
  return (
    <>
      <ConfirmModal show={confirmModal} onHide={handleDelete} />

      <Loading show={isLoaded} />
      <div className="set-detail-learn">
        <h3 className="ml-5 mt-5">{result.title}</h3>
        <Row>
          <Col sm={2}>
            <div className="set-detail-info ml-5 mt-3 d-grid ">
              <Link to={`/setCard/${slug}`} className="p-2 io" block>
                <i class="fa fa-clone icon"></i>
                Flashcard
              </Link>
              <Link to="#" className="p-2 io">
                <i class="fa fa-book icon"></i> Learn
              </Link>
              <Link to="#" className="p-2 io">
                <i class="fa fa-pencil-square-o icon"></i> Write
              </Link>
              <Link to="#" className="p-2 io">
                <i class="fa fa-gamepad icon"></i> Game
              </Link>
              <Link to="#" className="p-2 io">
                <i class="fa fa-file-text icon"></i> Test
              </Link>
              {/* <FacebookShareButton url={slug}></FacebookShareButton> */}
            </div>
          </Col>
          <Col sm={10}>
            <div className="container mt-3">
              <div className="set-detail-wrapper">
                <div className="set-detail-slide">
                  <div className="slide-wrapp">
                    {result.detail.map((item, idx) => (
                      <SlideItem
                        key={idx}
                        index={idx}
                        active={slideActive === idx}
                        keyword={item.card_title}
                        description={item.card_desc}
                      />
                    ))}
                  </div>
                  <div className="slide-controls">
                    <div className="ctrl">
                      <span onClick={handlePrev}>
                        <i
                          className="fa fa-arrow-left icon-ctrl"
                          title="Previous question"
                        ></i>
                      </span>
                      <span className="text-ctrl">
                        {index + "/" + result.detail.length}
                      </span>
                      <span onClick={handleNext}>
                        <i
                          className="fa fa-arrow-right icon-ctrl"
                          title="Next question"
                        ></i>
                      </span>
                    </div>
                    <span className="float-right icon-check">
                      <i
                        class="fa fa-check icon-ctrl"
                        title="I have remember this question"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <hr width="80%" />
        <Row className="mb-5">
          <Col sm={6}>
            <div className="pl-5 ml-5">
              <img
                src={
                  process.env.REACT_APP_API_DOMAIN +
                  "/" +
                  result.author.photoUrl
                }
                alt=""
                style={{ width: "60px", height: "60px" }}
                className="border rounded-circle"
              />
              <span className="position-absolute ml-2">
                <p style={{ color: "#BDC3C7", margin: "0px" }}>Created by</p>
                <p>{result.author.username}</p>
              </span>
              <div>{result.description}</div>
            </div>
          </Col>
          <Col sm={6}>
            <div className="control">
              <i class="fa fa-share icon-ctrl" title="Share this question"></i>
              {currentUser === result.author.username ? (
                <>
                  <a href={`/flashcard/edit/${result.slug}`}>
                    <i class="material-icons icon-ctrl" title="Edit this card">
                      edit
                    </i>
                  </a>
                  <i
                    onClick={() => showConfirmModal(true)}
                    class="material-icons icon-ctrl"
                    title="Delete this card"
                  >
                    delete
                  </i>
                </>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>

      <div className="set-detail-more bg-f4">
        <div className="container mb-2">
          <h3 className="mt-3">Terms in this set ({result.detail.length})</h3>
          {result.detail.map((item, idx) => (
            <QuestionItem keyword={item.card_title} desc={item.card_desc} />
          ))}
          <h3 className="mt-5">Flashcard có liên quan</h3>
          <div className="item">
            <span className="stt">1</span>
            <span className="name">Name</span>
            <span className="descptn">description</span>
            <span className="thumb">Ảnh đại diện</span>
            <span className="more-dots">...</span>
          </div>
          <div className="item">
            <span className="stt">2</span>
            <span className="name">Name</span>
            <span className="descptn">description</span>
            <span className="thumb">Ảnh đại diện</span>
            <span className="more-dots">...</span>
          </div>
          <div className="item ">
            <span className="stt">3</span>
            <span className="name">Name</span>
            <span className="descptn">description</span>
            <span className="thumb">Ảnh đại diện</span>
            <span className="more-dots">...</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WithAuth(DetailSet);

const SlideItem = (props) => {
  const [topPosition, setTopPosition] = useState("100%");

  return (
    <div
      className="slide-item"
      style={{ display: props.active ? "block" : "none" }}
    >
      <div className="keyword" onClick={() => setTopPosition("0px")}>
        <h3>{props.keyword}</h3>
        <small className="guide">Click to see description!</small>
      </div>
      <div
        className="mota text-align-center"
        style={{ top: topPosition }}
        onClick={() => setTopPosition("100%")}
      >
        <h3 className="m-5">{props.description}</h3>
        <small className="guide">Click to see key word!</small>
      </div>
    </div>
  );
};
const QuestionItem = (props) => {
  return (
    <div>
      <div className="item">
        <span className="name">{props.keyword}</span>
        <span className="break"></span>
        <span className="descptn">{props.desc}</span>
        {/* <span className="thumb">Ảnh đại diện</span> */}
        <span className="more-dots">...</span>
      </div>
    </div>
  );
};
