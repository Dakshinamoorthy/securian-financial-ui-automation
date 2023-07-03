// cypress/plugins/index.js
const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs-extra');
const { config, configData } = require('../../cypress.config');
const log4js = require('log4js')


// Configure mochawesome reporter options
const reportRoot = path.join(config.projectRoot, 'test-Reports', 'html-report');
const currentDate = dayjs().format('YYYY-MM-DD');
const baseFolderPath = path.join(reportRoot, currentDate);
const newRunId = configData.generateNewRunId(baseFolderPath);

const newFolderPath = path.join(baseFolderPath, `Test_Run_ID_${newRunId}`);
// Disable log4js logging
log4js.configure({
	appenders: {
		out: { type: 'console' },
	},
	categories: {
		default: { appenders: ['out'], level: 'off' },
	},
});
module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config

	on('before:browser:launch', (browser = {}, launchOptions) => {
		launchOptions.preferences.default['devtools'] = false;
		launchOptions.env.mochawesome_reportDir = newFolderPath;
		return launchOptions;
	});

	on('before:run', () => {
		beforeEach(function() {
			const testName = this.currentTest.title;
			cy.task('startTest', testName);
		});
	});

	on('after:spec', (spec, results) => {
		if (results && results.video) {
			const videoFileName = path.basename(results.video);
			const videoDir = path.dirname(results.video);

			// removing the '.spec.js' part from the filename
			const newVideoFileName = videoFileName.replace('.spec.js', '');

			return new Promise((resolve) => {
				fs.rename(
					path.join(config.projectRoot, videoDir, videoFileName),
					path.join(config.projectRoot, videoDir, newVideoFileName),
					(error) => {
						if (error) {
							console.error('Failed to rename video file:', error);
						}
						resolve();
					}
				);
			});
		}
	});

};
