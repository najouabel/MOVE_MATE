interface User {
  id?:Number,
  email?: String;
  username: String;
  adress: String;
  tele: String;
  role: String;
  image?: String;
  selected: boolean;

}

export { User };
