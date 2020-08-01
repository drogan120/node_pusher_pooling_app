const express = require("express");
const router = express.Router();

const Pusher = require("pusher");
let pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER || "us2",
  encrypted: process.env.PUSHER_ENCRYPTED || true,
});

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
  pusher.trigger("os-poll", "os-vote", {
    point: 1,
    os: req.body.os,
  });
  return res.json({ success: true, message: "Thanks for voting" });
});
module.exports = router;
