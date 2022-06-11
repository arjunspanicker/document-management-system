const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require('mongoose');
const PROTO_PATH_USERS = "./protos/users.proto";
const PROTO_PATH_FILES =  "./protos/files.proto";
const PROTO_PATH_FOLDERS = "./protos/folders.proto"
const { getAllUser,getUser, createUser } = require("./controllers/user.controller");
const { 
  getFolder,
  getFolders,
  getFoldersByUser,
  getFilesInFolder,
  createFolder,
  updateFolder,
  deleteFolder 
} = require ("./controllers/folder.controller");

const {
  getFile,
  createFile,
  updateFile,
  deleteFile,
  getFiles,
  getFilesByUser
} = require("./controllers/file.controller");

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

const userPackageDefinition = protoLoader.loadSync(PROTO_PATH_USERS, options);
const filesPackageDefenition = protoLoader.loadSync(PROTO_PATH_FILES, options);
const foldersPackageDefenition = protoLoader.loadSync(PROTO_PATH_FOLDERS, options);
const userProto = grpc.loadPackageDefinition(userPackageDefinition);
const filesProto = grpc.loadPackageDefinition(filesPackageDefenition);
const foldersProto = grpc.loadPackageDefinition(foldersPackageDefenition);

const server = new grpc.Server();

server.addService(filesProto.FileService.service, {
  getFile: getFile,
  getFilesByUser: getFilesByUser,
  getFiles: getFiles,
  createFile: createFile,
  updateFile: updateFile,
  deleteFile: deleteFile
});
server.addService(foldersProto.FolderService.service, {
  getFolders: getFolders,
  getFoldersByUser: getFoldersByUser,
  getFilesInFolder: getFilesInFolder,
  getFolder: getFolder,
  createFolder: createFolder,
  updateFolder: updateFolder,
  deleteFolder: deleteFolder
});
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