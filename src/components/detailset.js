import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt,
  useParams,
  useLocation,
} from "react-router-dom";
import { Form } from "reactstrap";

const DetailSet = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState(null);

  let { slug } = useParams();

  const [slideActive, setSlideActive] = useState(0);

  function handlePrev() {
    if (slideActive === 0) {
      return;
    } else {
      setSlideActive(slideActive - 1);
    }
  }
  function handleNext() {
    if (slideActive === result.length - 1) {
      return;
    } else {
      setSlideActive(slideActive + 1);
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
          console.log(result);

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
      <div className="set-detail-learn">
        <Row>
          <Col sm={2}>
            <div className="set-detail-info ml-5 mt-3 d-grid ">
              <h3>{result.title}</h3>
              <Link to="/setting" className="p-2 io" block>
                <i class="material-icons icon">settings</i>
                Flashcard
              </Link>
              <Link to="/profile" className="p-2 io">
                <i class="material-icons icon">person</i> Learn
              </Link>
              <Link to="#" className="p-2 io">
                <i class="material-icons icon">live_help</i> Write
              </Link>
              <Link to="/profile" className="p-2 io">
                <i class="material-icons icon">settings_brightness</i> Game
              </Link>
              <Link to="/profile" className="p-2 io">
                <i class="material-icons icon">settings_brightness</i> Test
              </Link>
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
                        active={slideActive === idx}
                        keyword={item.card_title}
                        description={item.card_desc}
                      />
                    ))}
                  </div>
                  <div className="slide-controls">
                    <div className="ctrl">
                      <span onClick={handlePrev}>prev</span>
                      <span onClick={handleNext}>next</span>
                    </div>
                    <div className="cpleted">
                      <span>mark as completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="mb-5">
          <div className="pl-5 ml-5">
            <img
              src={
                process.env.REACT_APP_API_DOMAIN + "/" + result.author.photoUrl
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
        </Row>
      </div>

      <div className="set-detail-more">
        <div className="container mt-5 pt-5">
          <h2>Flashcard có liên quan</h2>
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
          <div className="item">
            <span className="stt">3</span>
            <span className="name">Name</span>
            <span className="descptn">description</span>
            <span className="thumb">Ảnh đại diện</span>
            <span className="more-dots">...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSet;

const SlideItem = (props) => {
  const [topPosition, setTopPosition] = useState("100%");

  return (
    <div
      className="slide-item"
      style={{ display: props.active ? "block" : "none" }}
    >
      <div className="keyword" onClick={() => setTopPosition("0px")}>
        <h3>{props.keyword}</h3>
        <small>Click to see description!</small>
      </div>
      <div
        className="mota text-align-center"
        style={{ top: topPosition }}
        onClick={() => setTopPosition("100%")}
      >
        <p className="m-5">{props.description}</p>
        <small>Click to close description!</small>
      </div>
    </div>
  );
};
