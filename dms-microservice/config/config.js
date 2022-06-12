const config = {
	grpcServer: process.env.GRPC_SERVER || '127.0.0.1:50051',
    mongoUrl: process.env.MONGO_URL || 'mongodb+srv://arjun:RKOISCfC8hR55nRS@cluster0.zihgy.mongodb.net/dms-dev?retryWrites=true&w=majority'
};

module.exports = config;