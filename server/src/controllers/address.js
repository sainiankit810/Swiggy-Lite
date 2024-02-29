const addresses = require("../models/address");

const addAddress = {
  addAddress: async (req, res) => {
    try {
      const {user_id, restaurant_id, address, city, state, pincode, location} = req.body;
      const newAddress = new addresses({
        user_id,
        restaurant_id,
        address,
        city,
        state,
        pincode,
        location,
      });

      await newAddress.save();
      res.status(201).send("Address added successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getAllAddresses: async (req, res) => {
    try {
      const address = await addresses.find();
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get an address by ID
  getAddressById: async (req, res) => {
    try {
      const address = await addresses.findById(req.params.id);
      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update an address by ID
  updateAddressById: async (req, res) => {
    try {
      const { address, city, state, pincode, location } = req.body;
      const updatedAddress = await addresses.findByIdAndUpdate(
        req.params.id,
        { address, city, state, pincode, location },
        { new: true }
      );
      if (!updatedAddress) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.status(200).json(updatedAddress);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete an address by ID
  deleteAddressById: async (req, res) => {
    try {
      const deletedAddress = await addresses.findByIdAndDelete(req.params.id);
      if (!deletedAddress) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = { ...addAddress };


