import React from "react";

const SetItem = (props) => {
    const {avatar, title, date_created, author, empty, detail, slug} = props.item;
    return (
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
                    <a href="/flashcard/edit">Edit</a>
                </div>

            </div>

        </div>
    );
};

export default SetItem;