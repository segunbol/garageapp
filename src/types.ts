import { ObjectId } from "mongoose";

export interface Info {
  [key: string]: string | boolean | ObjectId | undefined;
}

export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  vehicles:  ObjectId[];
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

export type CreateUserData = Omit<IUser, ''>
export type UpdateUserData = Omit<IUser, ''>

export interface UserInfo {
  _id: string;
  userName: string;
  email: string;
  password?: string; // <-- Make password optional
}

export interface IUserSignIn {
  userName: string;
  password: string;
}

export type SignInUserData = Omit<IUserSignIn, ''>

export type PaginationQueryType = {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  all?: boolean;
  start?: string;
  end?: string;
  status?: boolean;
};

export interface IVehicle {
    name: string;
    model: string;
    productionYear: string;
    engineNumber: string;
    chasisNumber: string;
    vehicleType:  ObjectId;
    userOwner :ObjectId;
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

  export interface IVehicleTypes {
    name: string;
    image: string;
    numberOfWheels: number;
    createdAt?: Date | null;
    deletedAt?: Date | null;
  }

  