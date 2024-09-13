import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
