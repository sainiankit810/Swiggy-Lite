const payments = require('../models/payment');
const orders = require('../models/orders');

const paymentController = {
    payment: async (req, res) => {
        try {
            const order_id = req.body.order_id;
            const total_amount = req.body.total_amount;
            const payment_method = req.body.payment_method;
            const payment_status = req.body.payment_status;
            const newPayment = new payments({
                order_id: order_id,
                total_amount: total_amount,
                payment_method: payment_method,
                payment_status: payment_status
            });
            await newPayment.save();
            await orders.findByIdAndUpdate(order_id, {order_status: "Paid"});
            res.status(200).send({message: "Payment successful"});
        } catch (error) {
            res.status(500).send({error: "Internal server error"});
        }
    }
};

module.exports = {...paymentController};