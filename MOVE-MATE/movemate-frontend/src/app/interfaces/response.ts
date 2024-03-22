interface Response<T> {
  date: String;
  data:{
    data: T;
  }
  status: Number;
  responseStatus: String;
  message: String;
}


export { Response };
