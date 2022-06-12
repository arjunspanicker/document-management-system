const config = {
	port : process.env.PORT || 5050, 
	grpcServer: process.env.GRPC_SERVER || '127.0.0.1:50051'
};

module.exports = config;