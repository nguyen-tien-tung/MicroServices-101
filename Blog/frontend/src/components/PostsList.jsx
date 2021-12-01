import axios from "axios";
import React, { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostsList = () => {
	const [posts, setPosts] = useState({});
	const fetchPost = async () => {
		const res = await axios.get("http://localhost:4002/posts");
		setPosts(res.data);
	};
	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{Object.values(posts).map((post) => (
				<div
					className="card"
					style={{ width: "30%", marginBottom: "20px" }}
					key={post.id}
				>
					<div className="card-body">
						<h3>{post.title}</h3>
						<CommentsList comments={post.comments} />
						<CommentCreate postId={post.id} />
					</div>
				</div>
			))}
		</div>
	);
};

export default PostsList;
