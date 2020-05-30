import React, { useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Prompt,
    useParams,
    useLocation
  } from "react-router-dom";

const DetailSet = () => {
    const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState(null);
    
    let { slug } = useParams();

    const [slideActive, setSlideActive] = useState(0);


    function handlePrev () {
        if(slideActive === 0){
            return
        } else {
            setSlideActive(slideActive - 1);
        }
    }
    function handleNext () {
        if(slideActive === result.length - 1){
            return
        } else {
            setSlideActive(slideActive + 1);
        }
    }

    useEffect(() => {
		fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard/${slug}`, {
			method: 'get',
			// headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authUser.token}`}
		})
			.then(
				res => res.json()
			)
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
			)
    }, []);

if (!result) return null
  return (
    <>
      <div className="set-detail-learn">
        <div className="container">
          <div className="set-detail-wrapper">
            <div className="set-detail-info">
              <h1>{result.title}</h1>
              <span>Created at: {result.date_create}</span>
              <p>
                {result.description}
              </p>
            </div>

            <div className="set-detail-slide">
                <div className="slide-wrapp">
                    {
                        result.detail.map((item, idx) => (
                            <SlideItem 
                                 key={idx}
                                 active={slideActive === idx}
                                 keyword={item.card_title}
                                 description={item.card_desc}
                            />
                        ))
                    }
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
      </div>

      <div className="set-detail-more">
        <div className="container">
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

    const [topPosition, setTopPosition] = useState('100%');


    return (
        <div className="slide-item" style={{display: props.active ? 'block' : 'none' }}>
            <div className="keyword" onClick={() =>setTopPosition('0px')}>
                <h3>{props.keyword}</h3>
                <small>Click to see description!</small>
            </div>
            <div className="mota" style={{top: topPosition}} onClick={() =>setTopPosition('100%')}>
                <p>{props.description}</p>
                <small>Click to close description!</small>
            </div>
        </div>
    )
}