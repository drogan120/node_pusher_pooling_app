const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/VoteModel");

const Pusher = require("pusher");
let pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER || "us2",
  encrypted: process.env.PUSHER_ENCRYPTED || true,
});

router.get("/", (req, res) => {
  Vote.find().then((votes) =>
    res.json({
      success: true,
      votes: votes,
    })
  );
});

router.post("/", (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1,
  };

  new Vote(newVote).save().then((vote) => {
    pusher.trigger("os-poll", "os-vote", {
      points: parseInt(vote.points),
      os: vote.os,
    });
    return res.json({ success: true, message: "Thanks for voting" });
  });
});
module.exports = router;
