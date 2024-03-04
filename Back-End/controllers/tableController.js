const TableItem = require("../models/tableItem");

// Get all table items
const getAllTableItems = async (req, res) => {
  try {
    const allTableItems = await TableItem.find({});
    res.status(200).json(allTableItems);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

// Add a new table item
const addTableItem = async (req, res) => {
  try {
    const newItem = new TableItem(req.body);
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
};

// Update a table item
const updateTableItem = async (req, res) => {
  try {
    const updatedItem = await TableItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

// Delete a table item
const deleteTableItem = async (req, res) => {
  try {
    const deletedItem = await TableItem.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};

module.exports = {
  getAllTableItems,
  addTableItem,
  updateTableItem,
  deleteTableItem,
};
