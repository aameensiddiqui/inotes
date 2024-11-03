import React from "react";
// import noteContext from "../context/notes/noteContext";

function About() {
	return (
		<div className="container my-3" style={{ padding: "70px" }}>
			<div className="accordion" id="accordionPanelsStayOpenExample">
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#panelsStayOpen-collapseOne"
							aria-expanded="true"
							aria-controls="panelsStayOpen-collapseOne">
							About iNote
						</button>
					</h2>
					<div
						id="panelsStayOpen-collapseOne"
						className="accordion-collapse collapse show">
						<div className="accordion-body">
							<>
								iNote offers a range of features to enhance your note-taking
								experience:
								<ul>
									<li>
										<strong>Create Notes:</strong> Quickly add new notes with a
										clean and simple interface.
									</li>
									<li>
										<strong>Edit Notes:</strong> Make changes to existing notes
										anytime.
									</li>
									<li>
										<strong>Delete Notes:</strong> Remove notes that you no
										longer need for a clutter-free experience.
									</li>
								</ul>
							</>
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#panelsStayOpen-collapseTwo"
							aria-expanded="false"
							aria-controls="panelsStayOpen-collapseTwo">
							Getting Started
						</button>
					</h2>
					<div
						id="panelsStayOpen-collapseTwo"
						className="accordion-collapse collapse">
						<div className="accordion-body">
							Getting started with iNote is simple just:
							<ol>
								<li>
									Create an account using your email to start using iNote.
								</li>
								<li>
									<strong>Add Your First Note:</strong> Begin by adding a note
									with a title and detailed description.
								</li>
							</ol>
							Experience the ease of organized note-taking with iNote.
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#panelsStayOpen-collapseThree"
							aria-expanded="false"
							aria-controls="panelsStayOpen-collapseThree">
							Privacy
						</button>
					</h2>
					<div
						id="panelsStayOpen-collapseThree"
						className="accordion-collapse collapse">
						<div className="accordion-body">
							<>
								Your privacy is our priority.
								<ul>
									<li>
										<strong>Password Protection:</strong> Safeguard your account
										with a password to prevent unauthorized access.
									</li>
								</ul>
							</>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
