import mongoose from "mongoose";
import { mongoUrl } from "../config";

mongoose.Promise = Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on("connected", () => {
  console.log("Connection Established");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  console.log("Connection Disconnected");
});

mongoose.connection.on("close", () => {
  console.log("Connection Closed");
});

mongoose.connection.on("error", error => {
  console.log("ERROR: " + error);
});

export const connect = async () => {
    await mongoose.connect(mongoUrl.url, {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    })
  }