import {OrderBE} from "@domain/Entities/OrderBE";
import {Schema, model} from "mongoose";

// 2. Create a Schema corresponding to the document interface.
const OrderSchema = new Schema<OrderBE>(
  {
    OrderId: {type: String, required: true},
    PersonId: {type: String, required: true},
    Department: {type: String, required: true},
    GeneratedDate: {type: Date, required: true},
    Status: {type: String, required: false},
    OrderDetail: [
      {
        ProductId: {type: Number, required: true},
        Quantity: {type: Number, required: true},
        Unit: {type: String, required: true},
      }, 
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("order", OrderSchema);
