import { Schema, PaginateModel, model } from "mongoose";
import { IParking } from "../types";
import paginate from "mongoose-paginate-v2";

const parkingSchema = new Schema<IParking>(
  {
    user:{ type: Schema.Types.ObjectId, ref: "Users", required: true },
    entryDateTime: { type: Date, required: true },
    exitDateTime: {
      type: Date,
      required: true,
    },
    parkSlot: { type: Schema.Types.ObjectId, required: true },
    vehicle: { type: Schema.Types.ObjectId, required: true },
    
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
    toJSON: {
      getters: true,
      virtuals: true,
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

parkingSchema.plugin(paginate);
const Parking = model<IParking, PaginateModel<IParking>>("Parking", parkingSchema);

export default Parking;
