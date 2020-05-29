import React, { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import {Link } from "react-router-dom";
import { MOCK_DATA } from '../../data/MOCK_DATA';

import AddSetCardForm from './AddSetCardForm';
import AddCardItemForm from './AddCardItemForm';
import SetItem from './setItem';

import './dashboard.scss';

const Dashboard = () => {
	const [AddSetCardModalShow, setAddSetCardModalShow] = useState(false);
	const [AddCardItemModalShow, setAddCardItemModalShow] = useState(false);

	const AddCardSetModal = (props) => {
		return (
		  <div>
			<Modal
			  {...props}
			  size="lg"
			  aria-labelledby="contained-modal-title-vcenter"
			  centered
			>
			  <Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add 3 new set of flashcard</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
				<AddSetCardForm />
			  </Modal.Body>
			</Modal>
		  </div>
		);
	};

	const AddCardItemModal = (props) => {
		return (
		  <div>
			<Modal
			  {...props}
			  size="lg"
			  aria-labelledby="contained-modal-title-vcenter"
			  centered
			>
			  <Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add more flashcard</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
				<AddCardItemForm />
			  </Modal.Body>
			</Modal>
		  </div>
		);
	};
  return (
    <Container>
		<AddCardSetModal show={AddSetCardModalShow} onHide={() => setAddSetCardModalShow(false)} />
		<AddCardItemModal show={AddCardItemModalShow} onHide={() => setAddCardItemModalShow(false)} />

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
						<input type="radio" id="finish" value="finish" name="status" />
						<label htmlFor="finish">Finish</label>

						<input type="radio" id="unfinish"  value="unfinish" name="status" />
						<label htmlFor="unfinish">Unfinish</label>

						<input type="radio" id="empty"  value="empty" name="status" />
						<label htmlFor="empty">Empty</label>

						<input type="radio" id="all"  value="all" name="status" />
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
							{
								MOCK_DATA
								.filter((item) => item.author.id === 11 && item.empty)
								.map((item) => (
									<SetItem
										key={item.id}
										item={item}

									/>
								))
							}

							{/* USER NON-EMPTY SET DISPLAY SECOND */}

							{
								MOCK_DATA
								.filter((item) => item.author.id === 11 && !item.empty)
								.map((item) => (
									<SetItem
										key={item.id}
										item={item}
									/>
								))
							}
							

						</div>	
					</div>
					<div className="card-section">
						<div className="section-title">
							<h3>Your favorite flashcard</h3>
							<button>Browse</button>
						</div>
						<div className="section-body">
							{
								MOCK_DATA
								.filter((item) => item.author.id !== 11 && !item.empty)
								.map((item) => (
									<SetItem
										key={item.id}
										item={item}
									/>
								))
							}
						</div>	
					</div>
				</div>
			</div>
		</div>
	</Container>
  );
};

export default Dashboard;
