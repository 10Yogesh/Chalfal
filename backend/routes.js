const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activate-controller");
const authMiddleware = require("./middlewares/auth-middleware");
const roomsController = require("./controllers/rooms-controller");

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);
router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", roomsController.index);
router.get("/api/rooms/:roomId", authMiddleware, roomsController.show);

//recomanded
router.post("/api/rooms/reco", authMiddleware, roomsController.recoCreate);
router.get(
  "/rooms/recomandation",
  authMiddleware,
  roomsController.recomandation
);

module.exports = router;
