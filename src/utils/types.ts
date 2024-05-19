import { ObjectId } from "mongoose";

export interface Info {
  [key: string]: string | boolean | ObjectId | undefined;
}

export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  vehicles:  { vehicleId: ObjectId; vehicleName: string }[];
  image: string;
  password: string;
  email: string;
  phoneNo: string;
  isAdmin?: boolean | null;
  address: string;
  state: string;
  city: string;
  verified?: boolean | null;
  createdAt: Date | null;
  deletedAt?: Date | null;
}

export interface IVehicle {
    name: string;
    model: string;
    productionYear: string;
    engineNumber: string;
    chasisNumber: string;
    vehicleType:  string;
    userOwner :ObjectId;
    image: string;
    color: string;
    createdAt: Date | null;
    deletedAt?: Date | null;
  }

  export interface IParking {
    vehicle:  ObjectId;
    user: ObjectId;
    entryDateTime: Date;
    exitDateTime: Date;
    parkSlot: ObjectId;
    deletedAt?: Date | null;
  }

  export interface IParkLot {
    floor: string;
    lane: string;
    slot: string;
    wing: string;
    createdAt?: Date | null;
    deletedAt?: Date | null;
  }


  