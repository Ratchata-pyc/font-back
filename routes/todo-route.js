const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("in todoRoute get /");
  console.log(req.user);
  res.json({ msg: `hello,${req.user.username}` });
});
router.post("/", authenticate, () => {});
router.put("/:id", () => {});
router.delete("/:id", () => {});
router.get("/all-status", () => {});

module.exports = router;
