import { User } from "./user";

interface Reservation {
  id?:Number,
  title: String;
  publicationDate: Date;
  isExpired: Boolean;
  offreType: String;
  offerStatus: String;
  profile: String;
  ville: String;
  education: String;
  salary: Number;
  image?: User;
  offerDetails: {
    id: Number;
    description: String;
  };
  employer: User;
  agent?: User;
}


export { Reservation };
