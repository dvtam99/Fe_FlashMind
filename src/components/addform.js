import React, { useState } from "react";

const AddForm = () => {
    const [detailSetNumber, setDetailSetNumber] = useState([0, 0]);
    function handleAddCard() {
        setDetailSetNumber([...detailSetNumber, 0])
    }
  return (
    <>
      <div className="set-meta">
        <div className="container">
        <div className="set-meta-wrapper">

            <div className="set-meta-form">
                <h1>Tạo nhóm thẻ mới</h1>
                <input type="text" id="set-title" placeholder="Nhập tiêu đề, ví dụ: Lịch sử Đông Dương, bài 1" />
                <label htmlFor="set-title">Tiêu đề</label>
                <textarea id="set-desc" placeholder="Nhập tiêu đề, ví dụ: Lịch sử Đông Dương, bài 1" />
                <label htmlFor="set-desc">Mô tả</label>
                <input type="checkbox" id="set-public" />
                <label htmlFor="set-public">Public?</label>
            </div>

            <div className="set-avatar">
                <label>Ảnh đại diện cho bộ thẻ</label>
                <input type="file" />
            </div>
        </div>
        </div>
      </div>

      <div className="set-detail">
        <div className="container">

            {
                detailSetNumber.map((item, idx)=>(
                    <CardDetailItem stt={idx + 1} key={idx} />
                ))
            }
           
            <div className="card-detail-item add-card" onClick={handleAddCard}>
                + Thêm thẻ
            </div>
            <button className="finish">Hoàn thành rồi!</button>
        </div>
      </div>
    </>
  );
};

export default AddForm;

const CardDetailItem = (props) => (
  <div className="card-detail-item">
    <div className="header">
      <span>{props.stt}</span>
      <div>
        <span>^</span>
        <span>x</span>
      </div>
    </div>
    <div className="body">
      <div className="keyword">
        <label>Thuật ngữ</label>
        <input type="text" placeholder="Ví dụ: Stateless component" />
      </div>
      <div className="description">
        <label>Mô tả</label>
        <textarea placeholder="Ví dụ: lorrem ipssum" />
      </div>
      <div className="photo">Hinh anh minh hoa</div>
    </div>
  </div>
);
