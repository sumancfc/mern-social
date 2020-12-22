const express = require("express");
const router = express.Router();

const { userId } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const {
  postId,
  postPhoto,
  createPost,
  postListByUser,
  postNewsFeed,
  postLike,
  postUnlike,
  postComment,
  postUncomment,
  postedUser,
  deletePost,
} = require("../controllers/post");

router.route("/api/posts/new/:userId").post(requireSignin, createPost);

router.route("/api/posts/photo/:postId").get(postPhoto);

router.route("/api/posts/by/:userId").get(requireSignin, postListByUser);

router.route("/api/posts/feed/:userId").get(requireSignin, postNewsFeed);

router.route("/api/posts/like").put(requireSignin, postLike);
router.route("/api/posts/unlike").put(requireSignin, postUnlike);

router.route("/api/posts/comment").put(requireSignin, postComment);
router.route("/api/posts/uncomment").put(requireSignin, postUncomment);

router
  .route("/api/posts/:postId")
  .delete(requireSignin, postedUser, deletePost);

router.param("userId", userId);
router.param("postId", postId);

module.exports = router;
