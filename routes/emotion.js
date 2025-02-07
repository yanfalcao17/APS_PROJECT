const express = require("express");
const emotionCtrl = require("../controller/emotion");
const isAuthenticated = require("../middlewares/isAuth");

const router = express.Router();
router.post("/api/emotions/add", isAuthenticated, emotionCtrl.addEmotion);
router.post("/api/emotions/add", isAuthenticated, emotionCtrl.post)
router.get("/api/emotions/history", isAuthenticated, emotionCtrl.getEmotionHistory);
router.delete("/api/emotions/delete", isAuthenticated, emotionCtrl.delete)

module.exports = router;
