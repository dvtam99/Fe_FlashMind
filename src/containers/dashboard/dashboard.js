import React, { useState } from "react";
import { Container } from "react-bootstrap";

import './dashboard.css'
const Dashboard = () => {
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
				<div className="sidebar-footer">
					@2020 FlashMind
				</div>
			</div>
			<div className="mainbar">
				<div className="filterBar">
					<form action="#">
						<input type="radio" id="finish" value="finish" />
						<label htmlFor="finish">Finish</label>

						<input type="radio" id="unfinish"  value="unfinish" />
						<label htmlFor="unfinish">Unfinish</label>

						<input type="radio" id="empty"  value="empty" />
						<label htmlFor="empty">Empty</label>

						<input type="radio" id="all"  value="all" />
						<label htmlFor="all">All</label>
					</form>

				</div>

				<div className="mainbar-content">
					<div className="card-section">
						<div className="section-title">
							<h3>Your own flashcard</h3>
							<button>NEW</button>
						</div>
						<div className="section-body">
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
						</div>	
					</div>
					<div className="card-section">
						<div className="section-title">
							<h3>Your favorite flashcard</h3>
							<button>Browse</button>
						</div>
						<div className="section-body">
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
							<div className="set-item">
								<h4>Popular English slangs</h4>
								<div className="date-created">26/05/2020</div>
								<div className="author">Dat Xanh</div>
								<div className="empty">Empty</div>
								<div className="completed">Not Yet</div>
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
	</Container>
  );
};

export default Dashboard;
