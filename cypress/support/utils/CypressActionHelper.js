import CypressUtils from "./CypressUtils";
import UIConstantHelper from "./UiConstantHelper";
const addContext = require('mochawesome/addContext');
const dayjs = require('dayjs');
const path = require('path');

const ActionType = {
	CLICK: 'CLICK',
	TYPE: 'TYPE',
	CLEAR: 'CLEAR',
	GET_TEXT: 'GET_TEXT',
	GET_ATTRIBUTE: 'GET_ATTRIBUTE',
	FOCUS: 'FOCUS',
	BLUR: 'BLUR',
	SUBMIT: 'SUBMIT',
	SCROLL_INTO_VIEW: 'SCROLL_INTO_VIEW',
	TAB: 'TAB',
	ESCAPE: 'ESCAPE',
	CHECK: 'CHECK',
	UNCHECK: 'UNCHECK',
	RIGHT_CLICK: 'RIGHT_CLICK',
	DOUBLE_CLICK: 'DOUBLE_CLICK',
};

class CypressActionHelper {
	constructor(cy) {
		this.cy = cy;
	}

	performAction(element, actionType, text, elementName) {
		switch (actionType) {
			case ActionType.CLICK:
				this.performClickAction(element, elementName);
				break;
			case ActionType.TYPE:
				this.performTypeAction(element, text, elementName);
				break;
			case ActionType.CLEAR:
				this.performClearAction(element, elementName);
				break;
			case ActionType.GET_TEXT:
				this.performGetTextAction(element, elementName);
				break;
			case ActionType.GET_ATTRIBUTE:
				this.performGetAttributeAction(element, text, elementName);
				break;
			case ActionType.FOCUS:
				this.performFocusAction(element, elementName);
				break;
			case ActionType.BLUR:
				this.performBlurAction(element, elementName);
				break;
			case ActionType.SUBMIT:
				this.performSubmitAction(element, elementName);
				break;
			case ActionType.SCROLL_INTO_VIEW:
				this.performScrollIntoViewAction(element, elementName);
				break;
			case ActionType.TAB:
				this.performTabAction(element, elementName);
				break;
			case ActionType.ESCAPE:
				this.performEscapeAction(elementName);
				break;
			case ActionType.CHECK:
				this.performCheckAction(element, elementName);
				break;
			case ActionType.UNCHECK:
				this.performUncheckAction(element, elementName);
				break;
			case ActionType.RIGHT_CLICK:
				this.performRightClickAction(element, elementName);
				break;
			case ActionType.DOUBLE_CLICK:
				this.performDoubleClickAction(element, elementName);
				break;
			// Add more actions as needed
			default:
				console.error('Unsupported action type:', actionType);
				throw new Error('Unsupported action type: ' + actionType);
		}
	}

	performClickAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Click on ${elementName}`;
		const expected = `Expected: Button is clicked`;
		let actual;
		let status;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		// Define the screenshot name and path
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			CypressUtils.highlightElement(element);
			  this.cy.screenshot(screenshotName, { log: true })
			CypressUtils.clearElementStyles(element);

			this.cy.wrap(element).click();
			this.cy.wait(2000);

			actual = `Actual: Clicked on ${elementName}`;
			status = 'PASS';
		} catch (error) {
						this.cy.screenshot(screenshotName, { log: true });

			actual = `Actual: Failed to click on ${elementName}`;
			status = 'FAIL';
		}

		const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, status, screenshotPath);
		addContext({ test: testName }, tableContent);
	}


	performTypeAction(element, text, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Type in ${elementName}`;
		const expected = `Expected: ${elementName} contains "${text}"`;
		let actual;
		let status;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		// Define the screenshot name and path
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.performClearAction(element, `Clear the input box text for ${elementName}`);
			CypressUtils.highlightElement(element);
			this.cy.screenshot(screenshotName, { log: true });
			this.cy.wrap(element).type(text);
			actual = `Actual: "${text}" typed in ${elementName}`;
			status = 'PASS';
						

			 this.cy.screenshot(screenshotName, { log: true })
		} catch (error) {
			this.cy.screenshot(screenshotName, { log: true });
			actual = `Actual: Failed to type "${text}" in ${elementName}`;
			status = 'FAIL';
		}

		CypressUtils.clearElementStyles(element);
		const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, status, screenshotPath);
		addContext({ test: testName }, tableContent);
	}

	performClearAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Clear ${elementName}`;
		const expected = `Expected: ${elementName} is cleared`;
		let actual;
		let status;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		// Define the screenshot name and path
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			CypressUtils.highlightElement(element);
			this.cy.wrap(element).clear();
			this.cy.screenshot(screenshotName, { log: true });
			actual = `Actual: ${elementName} cleared successfully`;
			status = 'PASS';
			CypressUtils.clearElementStyles(element);
		} catch (error) {
			this.cy.screenshot(screenshotName, { log: true });
			actual = `Actual: Failed to clear ${elementName}`;
			status = 'FAIL';
		}

		const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, status, screenshotPath);
		addContext({ test: testName }, tableContent);
	}


	performGetTextAction(element, elementName) {
	const testName = UIConstantHelper.CURRENTTESTNAME;
	const stepName = `Get text from ${elementName}`;
	const expected = `Expected: Get text from ${elementName}`;
	let actual;
	let status;
	const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
	const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
	const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

	try {
		this.cy.wrap(element).invoke('text').then((text) => {
			actual = text;
			status = "PASS";

			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, status, screenshotPath);
			addContext({ test: testName }, tableContent);
		});
	} catch (error) {
		actual = `Actual: Failed to get text from ${elementName}`;
		status = "FAIL";

		const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, status, screenshotPath);
		addContext({ test: testName }, tableContent);
	}
}

	performGetAttributeAction(element, attributeName, elementName) {
	const testName = UIConstantHelper.CURRENTTESTNAME;
	const stepName = `Get attribute "${attributeName}" from ${elementName}`;
	const expected = `Expected: Get attribute "${attributeName}" from ${elementName}`;
	let actual;
	let status;
	const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
	const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
	const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

	try {
		this.cy.wrap(element).invoke('attr', attributeName).then((attrValue) => {
			actual = attrValue;
			status = "PASS";

			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, status, screenshotPath);
			addContext({ test: testName }, tableContent);
		});
	} catch (error) {
		actual = `Actual: Failed to get attribute "${attributeName}" from ${elementName}`;
		status = "FAIL";

		const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, status, screenshotPath);
		addContext({ test: testName }, tableContent);
	}
}

	performFocusAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Focus on ${elementName}`;
		const expected = `Expected: Focus on ${elementName}`;
		const actual = `Actual: Element focused successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).focus();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performBlurAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Blur ${elementName}`;
		const expected = `Expected: Blur ${elementName}`;
		const actual = `Actual: Element blurred successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).blur();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performSubmitAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Submit ${elementName}`;
		const expected = `Expected: Submit ${elementName}`;
		const actual = `Actual: Element submitted successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).submit();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performScrollIntoViewAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Scroll ${elementName} into view`;
		const expected = `Expected: Scroll ${elementName} into view`;
		const actual = `Actual: Element scrolled into view successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).scrollIntoView();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performTabAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Press Tab on ${elementName}`;
		const expected = `Expected: Press Tab on ${elementName}`;
		const actual = `Actual: Tab action performed successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).type('{tab}');
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performEscapeAction(_elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Press Escape`;
		const expected = `Expected: Press Escape`;
		const actual = `Actual: Escape action performed successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.get('body').type('{esc}');
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}


	performCheckAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Check ${elementName}`;
		const expected = `Expected: ${elementName} is checked`;
		const actual = `Actual: ${elementName} checked successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).check();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performUncheckAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Uncheck ${elementName}`;
		const expected = `Expected: ${elementName} is unchecked`;
		const actual = `Actual: ${elementName} unchecked successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).uncheck();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performRightClickAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Right-click on ${elementName}`;
		const expected = `Expected: Right-click on ${elementName}`;
		const actual = `Actual: Right-click action performed successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).rightclick();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

	performDoubleClickAction(element, elementName) {
		const testName = UIConstantHelper.CURRENTTESTNAME;
		const stepName = `Double-click on ${elementName}`;
		const expected = `Expected: Double-click on ${elementName}`;
		const actual = `Actual: Double-click action performed successfully`;
		const timestamp = dayjs().format('YYYYMMDDHHmmssSSS');
		const screenshotName = `${testName} - ${stepName} - ${timestamp}.png`;
		const screenshotPath = path.join(UIConstantHelper.SCREENSHOT_FOLDER, screenshotName);

		try {
			this.cy.wrap(element).dblclick();
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "PASS", screenshotPath);
			addContext({ test: testName }, tableContent);
		} catch (error) {
			const tableContent = CypressActionHelper.createTableContent(stepName, expected, actual, "FAIL", screenshotPath);
			addContext({ test: testName }, tableContent);
		}
	}

moveToElement(element)
{
	this.cy.get(element).scrollIntoView();

}
	static createTableContent(stepName, expected, actual, stepstatus, screenshotName) {
		const status = stepstatus === 'PASS' ? '✓' : '✕';
		const statusColor = stepstatus === 'PASS' ? 'green' : 'red';
		const statusFontWeight = stepstatus === 'PASS' ? 'bold' : 'normal';

		const tableContent = `
    <table>
      <tr>
        <th>Action Time</th>
        <th>Test Result</th>
        <th>Screenshots</th>
      </tr>
      <tr>
        <td>${new Date().toLocaleTimeString()}</td>
        <td style="color: ${statusColor}; font-weight: ${statusFontWeight};">${status}</td>
        <td><a href="${screenshotName}" target="_blank"><img src="${screenshotName}" width="100" height="100"></a></td>
      </tr>
      <tr>
        <td colspan="3">${stepName}</td>
      </tr>
      <tr>
        <td>Expected:</td>
        <td colspan="2">${expected}</td>
      </tr>
      <tr>
        <td>Actual:</td>
        <td colspan="2">${actual}</td>
      </tr>
       <tr>
        <td>Actual:</td>
        <td colspan="2">${actual}</td>
      </tr>
    </table>
  `;

		return tableContent;
	}


}

export { CypressActionHelper, ActionType };
