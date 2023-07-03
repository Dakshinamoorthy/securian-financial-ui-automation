import InsightsAndToolsPage from '../support/pages/InsightsAndToolsPage';
import UIConstantHelper from '../support/utils/UiConstantHelper';

const insightsAndToolsPage = new InsightsAndToolsPage();

describe('Insights And Tools Test', function() {
	const TestAttributes = {
		GROUP: 'group',
		DESCRIPTION: 'description',
	};

	afterEach(function() {
		UIConstantHelper.CURRENTTESTNAME = "";
		UIConstantHelper.CURRENTESTDESC = "";
		if (this.currentTest.state === 'passed') {
			UIConstantHelper.PASSED_TC_COUNTER += 1;
		} else if (this.currentTest.state === 'failed') {
			UIConstantHelper.FAILED_TC_COUNTER += 1;
			console.error(this.currentTest.err.stack);
		}
	});

	beforeEach(function() {
		const testName = this.currentTest.title;
		const testDescription = this.currentTest.metadata?.[TestAttributes.DESCRIPTION] || '';
		UIConstantHelper.CURRENTTESTNAME = testName;
		UIConstantHelper.CURRENTESTDESC = testDescription;
	});

	it(
		'submitWithRequiredFields',
		{ [TestAttributes.GROUP]: 'submit', [TestAttributes.DESCRIPTION]: 'Submit form with all fields' },
		function() {
			const testName = Cypress.spec.name;
			console.log(`Current test name: ${testName}`);
			const testDescription = "Calculate retirement savings and estimated gap";
			console.log(`Current test description: ${testDescription}`);

			// Test data generation
			const currentAge = Cypress._.random(18, 65);
			const retirementAge = Cypress._.random(currentAge + 1, 70);
			const currentAnnualIncome = Cypress._.random(50000, 150000);
			const currentRetirementSavingsBalance = Cypress._.random(0, 500000);
			const currentAnnualSavings = calculateCurrentAnnualSavings(
				currentAnnualIncome,
				currentRetirementSavingsBalance
			);
			const savingsRateOfIncrease = calculateSavingsRateOfIncrease(
				currentAnnualIncome,
				currentRetirementSavingsBalance
			);

			// Logging statements
			console.log('Submitting form with required fields...');
			console.log(`Current Age: ${currentAge}`);
			console.log(`Retirement Age: ${retirementAge}`);
			console.log(`Current Annual Income: ${currentAnnualIncome}`);
			console.log(`Current Retirement Savings Balance: ${currentRetirementSavingsBalance}`);
			console.log(`Current Annual Savings: ${currentAnnualSavings}`);
			console.log(`Savings Rate of Increase: ${savingsRateOfIncrease}`);

			// Call the methods
			insightsAndToolsPage.navigateToRetirementSavingsCalculatorPage();
			insightsAndToolsPage.enterCurrentAge(String(currentAge));
			insightsAndToolsPage.enterRetirementAge(String(retirementAge));
			insightsAndToolsPage.enterCurrentIncome(String(currentAnnualIncome));
			insightsAndToolsPage.enterCurrentRetirementSavings(String(currentRetirementSavingsBalance));
			insightsAndToolsPage.enterAnnualSavings(currentAnnualSavings);
			insightsAndToolsPage.enterSavingsIncreaseRate(formatSavingsRateOfIncrease(savingsRateOfIncrease));
			insightsAndToolsPage.selectSocialSecurityBenefitsYesRadio();
			insightsAndToolsPage.selectMaritalStatusMarried();

			// Add the expected subset here
			insightsAndToolsPage.clickBtnCalculate();
			insightsAndToolsPage.validateEmailResultsButton();
			insightsAndToolsPage.validateEditInfoButton();
			insightsAndToolsPage.validateSeeFullResultsButton();
		}
	);

	it(
		'checkSocialSecurityFields',
		{ [TestAttributes.GROUP]: 'verification', [TestAttributes.DESCRIPTION]: 'Verify social security fields' },
		function() {
			console.log('Verifying social security fields...');
			insightsAndToolsPage.navigateToRetirementSavingsCalculatorPage();
			verifySocialSecurityBenefitsFields();
			verifySocialSecurityBenefitsNoFields();
		}
	);

	it(
		'submitWithAllFieldsFilled',
		{ [TestAttributes.GROUP]: 'submit', [TestAttributes.DESCRIPTION]: 'Submit form with all fields' },
		function() {
			console.log("Submitting form with all fields filled...");
			insightsAndToolsPage.navigateToRetirementSavingsCalculatorPage();
			fillFormWithGeneratedValues();
			insightsAndToolsPage.clickLnkAdjustDefaultValues();
			fillDefaultCalculatorValues();
			insightsAndToolsPage.clickBtnSaveChanges();
			insightsAndToolsPage.clickBtnCalculate();
		}
	);

	it(
		'updateDefaultCalculatorValues',
		{ [TestAttributes.GROUP]: 'update', [TestAttributes.DESCRIPTION]: 'Update default calculator values' },
		function() {
			console.log("Updating default calculator values...");
			insightsAndToolsPage.navigateToRetirementSavingsCalculatorPage();
			const additionalIncome = generateAdditionalIncome();
			const retirementDuration = generateRetirementDuration();
			const retirementAnnualIncome = generateRetirementAnnualIncome();
			const preRetirementROI = generatePreRetirementROI();
			const postRetirementROI = generatePostRetirementROI();
			fillDefaultCalculatorValues(additionalIncome, retirementDuration, retirementAnnualIncome, preRetirementROI, postRetirementROI);
			insightsAndToolsPage.clickBtnSaveChanges();
		}
	);

	it(
		'submitWithInvalidData',
		{ [TestAttributes.GROUP]: 'negative', [TestAttributes.DESCRIPTION]: 'Submit form with invalid data' },
		function() {
			console.log("Submitting form with invalid data...");
			insightsAndToolsPage.navigateToRetirementSavingsCalculatorPage();
			fillFormWithInvalidData();
			insightsAndToolsPage.clickBtnCalculate();
			cy.get(insightsAndToolsPage.calculatorInputAlertDescSelector)
				.should('be.visible')
				.then(() => {
					console.log('Calculator input alert description is displayed');
				});
		}
	);

	it(
		'clearForm',
		{ [TestAttributes.GROUP]: 'clear', [TestAttributes.DESCRIPTION]: 'Clear the form' },
		function() {
			console.log("Clearing the form...");
			cy.reload();
			cy.wait(2000);
			insightsAndToolsPage.navigateToRetirementSavingsCalculatorPage();
			const defaultCurrentAge = insightsAndToolsPage.getCurrentAgeValue();
			const defaultRetirementAge = insightsAndToolsPage.getRetirementAgeValue();
			const defaultCurrentIncome = insightsAndToolsPage.getCurrentIncomeValue();
			const defaultSpouseIncome = insightsAndToolsPage.getSpouseIncomeValue();
			const defaultCurrentRetirementSavings = insightsAndToolsPage.getCurrentRetirementSavingsValue();
			const defaultAnnualSavings = insightsAndToolsPage.getAnnualSavingsValue();
			const defaultSavingsIncreaseRate = insightsAndToolsPage.getSavingsIncreaseRateValue();
			const defaultSocialSecurityBenefits = insightsAndToolsPage.isSocialSecurityBenefitsYesSelected();
			const defaultMaritalStatus = insightsAndToolsPage.isMaritalStatusSingleSelected();
			const defaultSocialSecurityOverrideAmount = insightsAndToolsPage.getSocialSecurityOverrideAmountValue();

			fillFormWithData();
			insightsAndToolsPage.clickBtnClearForm();

			expect(insightsAndToolsPage.getCurrentAgeValue()).to.includeSubset(
				[defaultCurrentAge],
				"Current Age field is not cleared"
			);
			expect(insightsAndToolsPage.getRetirementAgeValue()).to.includeSubset(
				[defaultRetirementAge],
				"Retirement Age field is not cleared"
			);
			expect(insightsAndToolsPage.getCurrentIncomeValue()).to.includeSubset(
				[defaultCurrentIncome],
				"Current Income field is not cleared"
			);
			expect(insightsAndToolsPage.getSpouseIncomeValue()).to.includeSubset(
				[defaultSpouseIncome],
				"Spouse Income field is not cleared"
			);
			expect(insightsAndToolsPage.getCurrentRetirementSavingsValue()).to.includeSubset(
				[defaultCurrentRetirementSavings],
				"Current Retirement Savings field is not cleared"
			);
			expect(insightsAndToolsPage.getAnnualSavingsValue()).to.includeSubset(
				[defaultAnnualSavings],
				"Annual Savings field is not cleared"
			);
			expect(insightsAndToolsPage.getSavingsIncreaseRateValue()).to.includeSubset(
				[defaultSavingsIncreaseRate],
				"Savings Increase Rate field is not cleared"
			);
			expect(insightsAndToolsPage.isSocialSecurityBenefitsYesSelected()).to.includeSubset(
				[defaultSocialSecurityBenefits],
				"Social Security Benefits field is not cleared"
			);
			expect(insightsAndToolsPage.isMaritalStatusSingleSelected()).to.includeSubset(
				[defaultMaritalStatus],
				"Marital Status field is not cleared"
			);
			expect(insightsAndToolsPage.getSocialSecurityOverrideAmountValue()).to.includeSubset(
				[defaultSocialSecurityOverrideAmount],
				"Social Security Override Amount field is not cleared"
			);

			console.log("Form cleared successfully.");
		}
	);

	it(
		'cancelDefaultCalculatorValues',
		{ [TestAttributes.GROUP]: 'cancel', [TestAttributes.DESCRIPTION]: 'Cancel default calculator values' },
		function() {
			console.log("Canceling default calculator values...");
			fillDefaultCalculatorValues("5000", "30", "60000", "6", "4");
			insightsAndToolsPage.clickBtnCancel();
			console.log("Default calculator values canceled.");
		}
	);

	it(
		'closeDefaultCalculatorValues',
		{ [TestAttributes.GROUP]: 'update', [TestAttributes.DESCRIPTION]: 'Close default calculator values' },
		function() {
			console.log("Closing default calculator values...");
			fillDefaultCalculatorValues("5000", "30", "60000", "6", "4");
			insightsAndToolsPage.clickBtnClose();
			console.log("Default calculator values closed.");
		}
	);
});

// Helper functions

function calculateCurrentAnnualSavings(currentAnnualIncome, currentRetirementSavingsBalance) {
	// Calculate and return the current annual savings
	return currentAnnualIncome - currentRetirementSavingsBalance;
}

function calculateSavingsRateOfIncrease(currentAnnualIncome, currentRetirementSavingsBalance) {
	// Calculate and return the savings rate of increase
	return ((currentRetirementSavingsBalance / currentAnnualIncome) * 100).toFixed(2);
}

function formatSavingsRateOfIncrease(savingsRateOfIncrease) {
	// Format the savings rate of increase
	return `${savingsRateOfIncrease}%`;
}

function verifySocialSecurityBenefitsFields() {
	insightsAndToolsPage.selectSocialSecurityBenefitsYesRadio();
	cy.get(insightsAndToolsPage.socialSecurityOverrideAmountInputSelector).should('be.visible');
	cy.get(insightsAndToolsPage.spouseIncomeInputSelector).should('be.visible');
}

function verifySocialSecurityBenefitsNoFields() {
	insightsAndToolsPage.selectSocialSecurityBenefitsNoRadio();
	cy.get(insightsAndToolsPage.socialSecurityOverrideAmountInputSelector).should('not.exist');
	cy.get(insightsAndToolsPage.spouseIncomeInputSelector).should('not.exist');
}

function fillDefaultCalculatorValues(additionalIncome, retirementDuration, retirementAnnualIncome, preRetirementROI, postRetirementROI) {
	insightsAndToolsPage.clickLnkAdjustDefaultValues();
	cy.wait(3000);
	insightsAndToolsPage.enterAdditionalIncome(additionalIncome);
	insightsAndToolsPage.enterRetirementDuration(retirementDuration);
	insightsAndToolsPage.selectIncludeInflationYesRadio();
	insightsAndToolsPage.enterRetirementAnnualIncome(retirementAnnualIncome);
	insightsAndToolsPage.enterPreRetirementROI(preRetirementROI);
	insightsAndToolsPage.enterPostRetirementROI(postRetirementROI);
}

function fillFormWithGeneratedValues() {
	const currentAge = generateCurrentAge();
	const retirementAge = generateRetirementAge(currentAge);
	const currentAnnualIncome = generateCurrentIncome();
	const currentRetirementSavingsBalance = generateCurrentRetirementSavingsBalance();
	const currentAnnualSavings = calculateCurrentAnnualSavings(
		currentAnnualIncome,
		currentRetirementSavingsBalance
	);
	const savingsRateOfIncrease = calculateSavingsRateOfIncrease(
		currentAnnualIncome,
		currentRetirementSavingsBalance
	);

	insightsAndToolsPage.enterCurrentAge(String(currentAge));
	insightsAndToolsPage.enterRetirementAge(String(retirementAge));
	insightsAndToolsPage.enterCurrentIncome(String(currentAnnualIncome));
	insightsAndToolsPage.enterCurrentRetirementSavings(String(currentRetirementSavingsBalance));
	insightsAndToolsPage.enterAnnualSavings(currentAnnualSavings);
	insightsAndToolsPage.enterSavingsIncreaseRate(formatSavingsRateOfIncrease(savingsRateOfIncrease));
	insightsAndToolsPage.selectSocialSecurityBenefitsYesRadio();
	insightsAndToolsPage.selectMaritalStatusMarried();
}

function fillFormWithInvalidData() {
	const currentAge = -30;
	const retirementAge = -40;
	const currentIncome = -50000;
	const spouseIncome = -20000;
	const currentRetirementSavingsBalance = -100000;
	const annualSavings = -5000;
	const savingsRateOfIncrease = -10;
	const socialSecurityBenefits = generateSocialSecurityBenefits();
	const maritalStatus = generateMaritalStatus();
	const socialSecurityOverrideAmount = -500;

	insightsAndToolsPage.fillCurrentAge(currentAge);
	insightsAndToolsPage.fillRetirementAge(retirementAge);
	insightsAndToolsPage.fillCurrentIncome(currentIncome);
	insightsAndToolsPage.fillSpouseIncome(spouseIncome);
	insightsAndToolsPage.fillCurrentRetirementSavingsBalance(currentRetirementSavingsBalance);
	insightsAndToolsPage.fillAnnualSavings(annualSavings);
	insightsAndToolsPage.fillSavingsRateOfIncrease(savingsRateOfIncrease);
	insightsAndToolsPage.selectSocialSecurityBenefits(socialSecurityBenefits);
	insightsAndToolsPage.selectMaritalStatus(maritalStatus);
	insightsAndToolsPage.fillSocialSecurityOverrideAmount(socialSecurityOverrideAmount);
}

function fillFormWithData() {
	const currentAge = 35;
	const retirementAge = 65;
	const currentIncome = 60000;
	const spouseIncome = 40000;
	const currentRetirementSavingsBalance = 150000;
	const annualSavings = 5000;
	const savingsRateOfIncrease = 10;
	const socialSecurityBenefits = generateSocialSecurityBenefits();
	const maritalStatus = generateMaritalStatus();
	const socialSecurityOverrideAmount = 1000;

	insightsAndToolsPage.fillCurrentAge(currentAge);
	insightsAndToolsPage.fillRetirementAge(retirementAge);
	insightsAndToolsPage.fillCurrentIncome(currentIncome);
	insightsAndToolsPage.fillSpouseIncome(spouseIncome);
	insightsAndToolsPage.fillCurrentRetirementSavingsBalance(currentRetirementSavingsBalance);
	insightsAndToolsPage.fillAnnualSavings(annualSavings);
	insightsAndToolsPage.fillSavingsRateOfIncrease(savingsRateOfIncrease);
	insightsAndToolsPage.selectSocialSecurityBenefits(socialSecurityBenefits);
	insightsAndToolsPage.selectMaritalStatus(maritalStatus);
	insightsAndToolsPage.fillSocialSecurityOverrideAmount(socialSecurityOverrideAmount);
}

function generateCurrentAge() {
	// Generate a random value for current age between 25 and 70
	return Math.floor(Math.random() * (70 - 25 + 1)) + 25;
}

function generateRetirementAge(currentAge) {
	// Generate a random value for retirement age greater than current age
	return Math.floor(Math.random() * (80 - currentAge + 1)) + currentAge;
}

function generateCurrentIncome() {
	// Generate a random value for current income between 30000 and 150000
	return Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000;
}

function generateCurrentRetirementSavingsBalance() {
	// Generate a random value for current retirement savings balance between 0 and 500000
	return Math.floor(Math.random() * 500001);
}

function generateSocialSecurityBenefits() {
	// Generate a random value for social security benefits (Yes or No)
	return Math.random() < 0.5 ? "Yes" : "No";
}

function generateMaritalStatus() {
	// Generate a random value for marital status (Single or Married)
	return Math.random() < 0.5 ? "Single" : "Married";
}
function generateAdditionalIncome() {
	// Generate a random value for additional income between 1000 and 5000
	return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
}

function generateRetirementDuration() {
	// Generate a random value for retirement duration between 20 and 40 years
	return Math.floor(Math.random() * (40 - 20 + 1)) + 20;
}

function generateRetirementAnnualIncome() {
	// Generate a random value for retirement annual income between 40000 and 80000
	return Math.floor(Math.random() * (80000 - 40000 + 1)) + 40000;
}

function generatePreRetirementROI() {
	// Generate a random value for pre-retirement ROI between 5 and 10
	return Math.floor(Math.random() * (10 - 5 + 1)) + 5;
}

function generatePostRetirementROI() {
	// Generate a random value for post-retirement ROI between 2 and 5
	return Math.floor(Math.random() * (5 - 2 + 1)) + 2;
}

