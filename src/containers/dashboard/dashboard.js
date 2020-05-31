import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import withAuth from "../../hoc/authHoc";
import SetItem from "./setItem";
import authCtx from "../../contexts/auth";
import Loading from "../../components/layout/loading";
import "./dashboard.scss";

const Dashboard = () => {
  const { authUser } = useContext(authCtx);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [resultArr, setResultArr] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard`, {
      method: "get",
      // headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authUser.token}`}
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setResultArr(result);
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
    return <Loading show={isLoaded} />;
  } else {
    // console.log(article);
    return (
      <Container>
        <div className="dashboard-wrapper">
          <div className="sidebar">
            <div className="sidebar-item">FlashCard</div>
            <div className="sidebar-item">Multiple Choice</div>
            <div className="sidebar-item folder-item">
              <span>Folder</span>
              <ul>
                <li>English</li>
                <li>ReactJS</li>
              </ul>
            </div>
            <div className="sidebar-footer">@2020 FlashMind</div>
          </div>
          <div className="mainbar">
            <div className="filterBar">
              <form action="#">
                <input type="radio" id="finish" value="finish" name="status" />
                <label htmlFor="finish">Finish</label>

                <input
                  type="radio"
                  id="unfinish"
                  value="unfinish"
                  name="status"
                />
                <label htmlFor="unfinish">Unfinish</label>

                <input type="radio" id="empty" value="empty" name="status" />
                <label htmlFor="empty">Empty</label>

                <input type="radio" id="all" value="all" name="status" />
                <label htmlFor="all">All</label>
              </form>
            </div>

            <div className="mainbar-content">
              <div className="card-section">
                <div className="section-title">
                  <h3>Your own flashcard</h3>
                  <Link to="/flashcard/new">
                    <button>New</button>
                  </Link>
                </div>
                <div className="section-body">
                  {/* BEGIN SET ITEM */}

                  {/* USER EMPTY SET DISPLAY FIRST */}
                  {resultArr.map((item) => (
                    <SetItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
};

export default withAuth(Dashboard);
