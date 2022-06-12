const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./protos/users.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.getAllUser({}, (error, news) => {
      console.log(3)
      console.log(error);
      console.log("newss",news);
  });
// client.CreateUser({
//     name: "test",
//     email: "test@gmail.com",
//     password: "1234"
// }, (error, news) => {
//     console.log(3)
//     console.log("erriu", error);
//     console.log("newss",news);
// });
// client.getUser({
//     id: "62a438883c056bbcd9227572"
// }, (error, news) => {
//     console.log(3)
//     console.log("erriu", error);
//     console.log("newss",news);
// });
//   console.log("here")