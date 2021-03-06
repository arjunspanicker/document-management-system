/**
 * Util function for identifying gRPC errors
 * @param  code  error code from gRPC server
 * @returns http status code 
 */
const getErrorCode =  (code) => {
	let statusCode = 500;
	switch(code) {
	case 5:
		statusCode = 404;
		break;
	case 3:
		statusCode = 400;
		break;
	default:
		statusCode = 500;
	}
	return statusCode;
};

module.exports = {
	getErrorCode
};