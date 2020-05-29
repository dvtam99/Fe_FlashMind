import React, { useState } from "react";

const DetailSet = () => {
    const [slideActive, setSlideActive] = useState(0);
    function handlePrev () {
        if(slideActive === 0){
            return
        } else {
            setSlideActive(slideActive - 1);
        }
    }
    function handleNext () {
        if(slideActive === 4){
            return
        } else {
            setSlideActive(slideActive + 1);
        }
    }
  return (
    <>
      <div className="set-detail-learn">
        <div className="container">
          <div className="set-detail-wrapper">
            <div className="set-detail-info">
              <h1>Tạo nhóm thẻ mới</h1>
              <span>Created at: 20/05/2020</span>
              <p>
                Là thành viên của bộ phận phát triển phần mềm, bạn sẽ nghiên cứu
                và phát triển các ứng dụng thông tin giải trí trên ô tô, các hệ
                thống thông tin dẫn đường (AVN), hệ thống thông tin và cảnh báo
                về tình trạng xe (Cluster) và các hệ thống viễn thông
                (Telematics).
              </p>
            </div>

            <div className="set-detail-slide">
                <div className="slide-wrapp">
                   <SlideItem 
                        key={0}
                        active={slideActive === 0}
                        keyword={'Keyword here'}
                        description={'description here'}
                   />
                   <SlideItem 
                        key={1}
                        active={slideActive === 1}
                        keyword={'Keyword 1 here'}
                        description={'description 1 here'}
                   />
                   <SlideItem 
                        key={2}
                        active={slideActive === 2}
                        keyword={'Keyword 2 here'}
                        description={'description 2 here'}
                   />
                   <SlideItem 
                        key={3}
                        active={slideActive === 3}
                        keyword={'Keyword 3 here'}
                        description={'description 3 here'}
                   />
                   <SlideItem 
                        key={4}
                        active={slideActive === 4}
                        keyword={'Keyword 4 here'}
                        description={'description 4 here'}
                   />

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