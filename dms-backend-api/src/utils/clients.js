/**
 * Clients for connecting with gRPC server
 */
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const USER_PROTO_PATH = path.join(__dirname, '../protos/users.proto');
const FILE_PROTO_PATH = path.join(__dirname, '../protos/files.proto');
const FOLDER_PROTO_PATH = path.join(__dirname, '../protos/folders.proto');
const config = require('../config/config');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
};
  
const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH, options);
const filePackageDefinition = protoLoader.loadSync(FILE_PROTO_PATH, options);
const folderPackageDefinition = protoLoader.loadSync(FOLDER_PROTO_PATH, options);

const UserService = grpc.loadPackageDefinition(userPackageDefinition).UserService;
const FileService = grpc.loadPackageDefinition(filePackageDefinition).FileService;
const FolderService = grpc.loadPackageDefinition(folderPackageDefinition).FolderService;

module.exports =  {
	UserClient: new UserService(
		config.grpcServer,
		grpc.credentials.createInsecure()
	),
	FileClient: new FileService(
		config.grpcServer,
		grpc.credentials.createInsecure()
	),
	FolderClient: new FolderService(
		config.grpcServer,
		grpc.credentials.createInsecure()
	)
};