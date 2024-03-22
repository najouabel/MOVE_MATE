import { User } from "./user";

interface Offer {
  id:number;
  from:string,
  to: string;
  username: string;
  service: string;
  meantype: string;
  createdAt: string;
  description: string;
}

export { Offer };
