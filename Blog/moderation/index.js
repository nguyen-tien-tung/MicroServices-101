const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
	const { type, data } = req.body;
	if (type === "CommentCreated") {
		const status = data.content.includes("badword") ? "rejected" : "approved";
		await axios.post("http://localhost:4005/events", {
			type: "CommentModerated",
			data: {
				...data,
				status,
			},
		});
	}
});

app.listen(4003, () => {
	console.log("Moderation is listening on port 4003");
});
