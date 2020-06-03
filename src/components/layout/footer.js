import React from 'react'

const Footer = () => {
    return (
        <div className = "footer">
            <div className = "aboutUse">
                <h3>
                    FLASHMIND
                </h3>
                <p>Học hiệu quả bằng cách sử dụng flashcard mình tự tạo</p>
               
            </div>
            <div cl>
            <h3>Đồng sáng lập</h3>
                <ul>
                    <li>Tâm</li>
                    <li>Đạt</li>
                    <li>Thu</li>
                    <li>Mai Anh</li>
                </ul>
            </div>
            <div className = "contact">
                <h3>
                    Liên hệ với chúng tôi
                </h3>
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