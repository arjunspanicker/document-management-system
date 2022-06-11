const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require('mongoose');
const PROTO_PATH = "./protos/users.proto";
const { getAllUser,getUser, createUser } = require("./controllers/user.controller");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
mongoose.connect('mongodb+srv://arjun:RKOISCfC8hR55nRS@cluster0.zihgy.mongodb.net/dms-dev?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log(`error: ${err.message}`);
});

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(userProto.UserService.service, {
    getAllUser: getAllUser,
    getUser:  getUser,
    createUser: createUser
});
server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);