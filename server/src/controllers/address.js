const addresses = require('../models/address');
const authValidation = require('../validation/address_validation');

const addressController = {
    addAddress: async (req, res) => {
      try {
        const user_id = req.user_id;
        const { address, city, state, pincode, location } = req.body;
        const isValid = await authValidation(req.body);
        if (isValid.error) {
          return res.status(404).json({ message: isValid.error.details[0].message });
        }
        const newAddress = await addresses.create({ user_id: user_id, address, city, state, pincode, location });
        return res.status(200).json({ result: newAddress });
      } catch (error) {
        res.status(500).json('Something went wrong');
        console.log(error);
      }
    },

    getAllAddresses: async (req, res) => {
      const allAddresses = await addresses.find({ user_id: req.user_id });
      return res.status(200).json({ result: allAddresses });
    },

    getAddressById: async (req, res) => {
      const address = await addresses.findById(req.params.id);
      if (!address) {
        return res.status(404).json({ message: 'Address not found with id ' + req.params.id });
      }
      return res.status(200).json({ result: address });
    },

    updateAddressById: async (req, res) => {
      const { address, city, state, pincode, location } = req.body;
      const newaddress = await addresses.findByIdAndUpdate(req.params.id, { address, city, state, pincode, location }, { new: true });

      if (!newaddress) {
        return res.status(404).json({ message: 'Address not found with id ' + req.params.id });
      }
      return res.status(200).json({ result: newaddress });
    },

    deleteAddressById: async (req, res) => {
      const address = await addresses.findByIdAndDelete(req.params.id );
      if (!address) {
        return res.status(404).json({ message: 'Address not found with id ' + req.params.id });
      }
      return res.status(200).json({ result: 'Address deleted successfully' });
    }


}

module.exports = {...addressController};
