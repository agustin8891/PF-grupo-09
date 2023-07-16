const { Router } = require("express");
const router = Router();


router.get("/", async (req, res) => {
    res.send("hello world")
})


module.exports = router;