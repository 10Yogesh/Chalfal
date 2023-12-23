const RoomDto = require("../dtos/room.dto");
const roomService = require("../services/room-service");
const userModel = require("../models/user-model");
const tfidf = require("node-tfidf");
const roomModel = require("../models/room-model");

class RoomsController {
  userTFIDF;

  constructor() {
    this.userTFIDF = new tfidf();
    this.recomandation = this.recomandation.bind(this);
  }

  async create(req, res) {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    try {
      const room = await roomService.create({
        topic,
        roomType,
        ownerId: req.user._id,
      });

      if (!room) {
        return res.status(500).json({ message: "Failed to create room" });
      }

      return res.json(new RoomDto(room));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async index(req, res) {
    try {
      const rooms = await roomService.getAllRooms(["open"]);

      if (!rooms) {
        return res.status(500).json({ message: "Failed to fetch rooms" });
      }

      const allRooms = rooms.map((room) => new RoomDto(room));
      console.log("Fetched Rooms:", rooms);
      return res.json(allRooms);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async show(req, res) {
    const room = await roomService.getRoom(req.params.roomId);
    return res.json(room);
  }

  async recoCreate(req, res) {
    const { data } = req.body;
    console.log("data:", data);
    const userId = req.user._id;
    try {
      const user = await userModel.findByIdAndUpdate(
        userId,
        { $push: { joinHistory: data } },
        { new: true }
      );

      console.log("User:", user);

      const userTFIDF = new tfidf();
      const corpus = user.joinHistory.join(" ");
      userTFIDF.addDocument(corpus);
      res.json({
        joinHistory: user.joinHistory,
        userTFIDF: userTFIDF.listTerms(0),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async recomandation(req, res) {
    const userId = req.user._id;

    try {
      const user = await userModel.findById(userId);
      const lastJoinTerm =
        user.joinHistory.length > 0 ? user.joinHistory.slice(-1)[0] : "";
      const recommendedProducts = await roomModel
        .find({
          $text: { $search: lastJoinTerm },
        })
        .limit(5)
        .lean()
        .populate("speakers")
        .populate("ownerId")
        .exec();

      const allproduct = await roomModel
        .find()
        .limit(5)
        .lean()
        .populate("speakers")
        .populate("ownerId")
        .exec();

      const combinedRooms = [...recommendedProducts, ...allproduct];

      const uniqueTopics = Array.from(
        new Set(combinedRooms.map((room) => room.topic))
      );

      const allRooms = uniqueTopics.map((topic) => {
        const room = combinedRooms.find((r) => r.topic === topic);
        return new RoomDto(room);
      });

      res.json(allRooms);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new RoomsController();
