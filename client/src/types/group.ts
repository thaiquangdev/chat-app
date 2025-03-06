import { UserType } from "./auth";

export interface GroupType {
  _id: string;
  name: string;
  members: UserType[];
  admin: UserType;
  createdAt: string;
}
