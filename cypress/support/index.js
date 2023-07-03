import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import UIConstantHelper from './utils/UiConstantHelper';
import './commands';

dayjs.extend(duration);

const { loadConfigFile, configData } = require('..//..//cypress.config'); // import configData

before('before all', () => {
	loadConfigFile().then(() => {
		const baseUrl = configData['app']['base_url'];
		const browser = configData['app']['browser'];
		console.log("baseUrl: ", baseUrl);

		Cypress.on('uncaught:exception', (err, runnable, _promise) => {
			console.log(err); // Use `err`
			console.log(runnable); // Use `runnable`
			// To turn off all uncaught exception handling
			// returning false here prevents Cypress from failing the test
			return false;
		});

		Cypress.on('uncaught:exception', (err, runnable) => {
			console.log(err); // Use `err`
			console.log(runnable); // Use `runnable`
			// To conditionally turn off uncaught exception handling for a certain error
			// we expect a 3rd party library error with message 'list not defined'
			// and don't want to fail the test so we return false
			if (err.message.includes('list not defined')) {
				return false;
			}
			// we still want to ensure there are no other unexpected errors, so we let them fail the test
		});

		Cypress.on('uncaught:exception', (err, runnable, promise) => {
			console.log(err); // Use `err`
			console.log(runnable); // Use `runnable`
			// To conditionally turn off uncaught exception handling for unhandled promise rejections
			// when the exception originated from an unhandled promise rejection, the promise is provided as a third argument
			// you can turn off failing the test in this case
			if (promise) {
				return false;
			}
			// we still want to ensure there are no other unexpected errors, so we let them fail the test
		});

		cy.visit(baseUrl, {
			browser: browser
		}).then(() => {
			cy.wait(2000);
		});

		UIConstantHelper.setStartDate(dayjs());
		UIConstantHelper.setStartDateTime(dayjs());
		UIConstantHelper.OPERATING_SYSTEM = Cypress.platform;
	});
});