interface SignupRequest {
  email: String;
  username: String;
  address: String;
  tele: String;
  password: String;
  toSubscribe: Boolean;
  referralCode?: Boolean;
}

export { SignupRequest };
