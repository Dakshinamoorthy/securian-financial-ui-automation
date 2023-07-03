// Import the logger
// Inside the ExceptionHandler class
class ExceptionHandler {
	static handleException(exception) {
		if (exception instanceof ElementNotFoundException) {
			// Handle element not found exception
			console.error('Exception Type: Element not found');
			console.error('Exception Message:', exception.message);
		} else if (exception instanceof AssertionFailedException) {
			// Handle assertion failed exception
			console.error('Exception Type: Assertion failed');
			console.error('Exception Message:', exception.message);
		} else if (exception instanceof CustomErrorException) {
			// Handle custom error exception
			console.error('Exception Type: Custom error');
			console.error('Exception Message:', exception.message);
		} else if (exception instanceof IOException) {
			// Handle IO exception
			console.error('Exception Type: IO exception');
			console.error('Exception Message:', exception.message);
		} else if (exception instanceof StatusCodeError) {
			// Handle status code error
			console.error('Exception Type: Status code error');
			console.error('Exception Message:', exception.message);
		} else if (exception instanceof SyntaxError) {
			// Handle syntax error
			console.error('Exception Type: Syntax error');
			console.error('Exception Message:', exception.message);
		} else {
			// Handle unknown exception
			console.error('Exception Type: Unknown exception');
			console.error('Exception Message:', exception.message);
		}

		// Print the stack trace with line numbers
		const stackTraceLines = exception.stack.split('\n');
		for (const line of stackTraceLines) {
			console.error(line);
		}

		console.error('\n' + exception.stack);
		// Throw the original exception
		throw exception;
	}
}

export default ExceptionHandler;
