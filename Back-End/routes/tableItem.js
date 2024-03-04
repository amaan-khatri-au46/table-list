const {
  getAllTableItems,
  addTableItem,
  updateTableItem,
  deleteTableItem,
} = require("../controllers/tableController");

const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/item", authMiddleware, getAllTableItems);
router.post("/item", authMiddleware, addTableItem);
router.put("/item/:id", authMiddleware, updateTableItem);
router.delete("/item/:id", authMiddleware, deleteTableItem);

module.exports = router;
