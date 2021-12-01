import React from "react";

const CommentsList = ({ comments }) => {
	return (
		<div>
			<ul>
				{comments.map((comment) => (
					<li
						key={comment.id}
						style={{ color: comment.status === "approved" ? "" : "red" }}
					>
						{comment.status === "approved"
							? comment.content
							: comment.status === "pending"
							? "This comment is waiting moderation"
							: "this comment has been hidden"}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CommentsList;
