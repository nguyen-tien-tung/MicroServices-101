import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
	const commentId = randomBytes(4).toString("hex");
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];
	comments.push({ id: commentId, content, status: "pending" });
	await axios.post("http://localhost:4005/events", {
		type: "CommentCreated",
		data: { id: commentId, content, postId: req.params.id, status: "pending" },
	});
	commentsByPostId[req.params.id] = comments;

	res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
	const { type, data } = req.body;
	const { id, status } = data;
	if (type === "CommentModerated") {
		const comments = commentsByPostId[data.postId];
		const comment = comments.find((comment) => comment.id === id);
		comment.status = status;
		await axios.post("http://localhost:4005/events", {
			type: "CommentUpdated",
			data: {
				...data,
			},
		});
	}

	res.send({});
});

app.listen(4001, () => {
	console.log("Comments's Listening on port 4001");
});
