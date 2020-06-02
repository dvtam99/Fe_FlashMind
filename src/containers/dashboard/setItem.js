import React, { useState, useContext, useEffect } from "react";

import { Button, Modal, Alert } from "react-bootstrap";
import authCtx from "../../contexts/auth";



const SetItem = (props) => {
    const {_id, avatar, title, date_created, author, empty, detail, slug} = props.item;
    const { authUser } = useContext(authCtx);

    const [confirmModal, showConfirmModal] = useState(false);

    function handleDelete() {
        showConfirmModal(false);
        const data = {_id}
        fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authUser.token}`,
            },
            body: JSON.stringify(data)
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
    
    return (
        <>
            
            <ConfirmModal show={confirmModal} onHide={handleDelete} />
            
            <div className="set-item">

            <div className="avatar">
                <img src={process.env.REACT_APP_API_DOMAIN + "/" + avatar} alt="avatar" />
            </div>
            
            <div className="set-content">
            
                <h4><a href={`/setCard/${slug}`}>{title}</a></h4>

                <div className="date-created">{date_created}</div>

                <div className="author">
                    <span role="img" aria-label="avatar-image">👨‍🦱</span>{author.name}
                </div>

                {
                    empty &&
                    <div className="empty">
                        <span role="img" aria-label="empty-image">⨂</span>(0/0)
                    </div>
                }
                
                {
                    !empty &&
                    <div 
                        className={
                            `finish ${detail.filter(item => item.card_completed === true).length !== detail.length ? 'not-yet' : ''}`
                        }
                    >

                        <span 
                            role="img" 
                            aria-label="finish-image"
                        >
                            {detail.filter(item => item.card_completed === true).length === detail.length ? '✔' : 'U'}
                        </span>

                        {`(${detail.filter(item => item.card_completed === true).length}/${detail.length})`}
                    </div>
                }

                <div className="edit" title="Edit this  set">
                    <span role="img" aria-label="edit-image">🧹</span>
                    <a href={`/flashcard/edit/${slug}`}>Edit</a>
                </div>
                <div className="delete" title="Delete this set" onClick={()=> showConfirmModal(true)}>
                    <span role="img" aria-label="edit-image">🔴</span>
                    Delete
                </div>

            </div>

        </div>
        </>
    );
};

export default SetItem;

const ConfirmModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Chú ý
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>Bạn có chắc chắn muốn xóa bộ flashcard này? Lưu ý rằng, việc xóa này sẽ không thể khôi phục được.</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="info" onClick={props.onHide}>
                Tôi hiểu!
            </Button>
            </Modal.Footer>
        </Modal>
    );
}
