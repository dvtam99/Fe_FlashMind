import React, { useState } from "react";

const HomePage = () => {
  return (
    <>
      <div id ="introduce-body" >
        <div className="left-body">
            <div className="title" style={{fontWeight:"900"}}>
                <h2> Vươn tới</h2>
                <h2> phiên bản tốt hơn</h2>
                <h2> của chính bạn</h2>
            </div>
            
            <div>Thông thạo bài học, bớt nhạc thêm vui</div>
            
            <div>
                <button className="code">Bắt đầu nào</button>
            </div>            

            <div>
                <span>Mình là người dạy | Mình là phụ huynh</span>
            </div>
        </div>
        <div className="right-body">
            <img src = "/homepage.png" alt = "img" width="100%" />
            <div className="content">
                <h5>PlashMind dành cho ai?</h5>
				<ul>
					<li>Cho những mọt sách ham học nhưng hay quên,</li>
					<li>Cho những người bạn nhiều khi mải ngủ quên học</li>
				</ul>
            </div>
        </div>
    </div>
    </>
  );
};

export default HomePage;
