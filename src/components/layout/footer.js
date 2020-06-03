import React from 'react'

const Footer = () => {
    return (
        <div className = "footer">
            <div className = "aboutUse">
                <h4>
                    FLASHMIND
                </h4>
                <p>Học hiệu quả bằng cách sử dụng flashcard mình tự tạo</p>
               
            </div>
            <div className = "founder" >
            <h4>Founder</h4>
                <ul>
                    <li>Tâm</li>
                    <li>Đạt</li>
                    <li>Thu</li>
                    <li>Mai Anh</li>
                </ul>
            </div>
            <div className = "contact">
                <h4>
                    Contact
                </h4>
                <ul>
                    <li>
                        <i class="material-icons">edit_location</i>
                        Số 22 Thành Công - Ba Đình - Hà Nội
                    </li>
                    <li>
                        <i class="material-icons">phone_iphone</i>
                        Phone: 0909767654
                    </li>
                    <li>
                        <i class="material-icons">email</i>
                        Email: email@gmail.com
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer