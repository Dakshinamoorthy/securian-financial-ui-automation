import InsightsAndToolsPageFactory from '../pagefactory/InsightsAndToolsPageFactory';
import { CypressActionHelper, ActionType } from '../utils/CypressActionHelper';
import { expect } from 'chai';
import chaiSubset from 'chai-subset';
import { configData } from '../../../cypress.config';


chai.use(chaiSubset);

class InsightsAndToolsPage {
	constructor() {
		this.pageFactory = new InsightsAndToolsPageFactory();
		this.actionHelper = new CypressActionHelper(cy);
	}

	navigateToRetirementSavingsCalculatorPage() {
		try {
			this.clickLnkIndividualsMenu();
			this.clickLnkInsightsToolsSubMenu();
			this.clickLnkRetirementCalculator();
		} catch {
			cy.visit(configData.e2e.baseUrl + '/insights-tools/retirement-calculator.html');
			cy.wait(1000);
		}
	}

	clickLnkIndividualsMenu() {
		this.actionHelper.performAction(
			this.pageFactory.lnkIndividualsMenu,
			ActionType.CLICK,
			null,
			'lnkIndividualsMenu'
		);
	}

	clickLnkInsightsToolsSubMenu() {
		this.actionHelper.performAction(
			this.pageFactory.lnkInsightsToolsSubMenu,
			ActionType.CLICK,
			null,
			'lnkInsightsToolsSubMenu'
		);
	}

	clickLnkRetirementCalculator() {
		this.actionHelper.performAction(
			this.pageFactory.lnkRetirementCalculator,
			ActionType.CLICK,
			null,
			'lnkRetirementCalculator'
		);
	}

	enterCurrentAge(age) {
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentAge,
			ActionType.TYPE,
			age,
			'txtCurrentAge'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentAge,
			ActionType.TAB,
			null,
			'txtCurrentAge'
		);
	}
	enterRetirementAge(age) {
		this.actionHelper.performAction(
			this.pageFactory.txtRetirementAge,
			ActionType.TYPE,
			age,
			'txtRetirementAge'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtRetirementAge,
			ActionType.TAB,
			null,
			'txtRetirementAge'
		);
	}
	enterCurrentIncome(income) {
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentIncome,
			ActionType.TYPE,
			income,
			'txtCurrentIncome'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentIncome,
			ActionType.TAB,
			null,
			'txtCurrentIncome'
		);
	}
	enterSpouseIncome(income) {
		this.actionHelper.performAction(
			this.pageFactory.txtSpouseIncome,
			ActionType.TYPE,
			income,
			'txtSpouseIncome'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtSpouseIncome,
			ActionType.TAB,
			null,
			'txtSpouseIncome'
		);
	}
	enterCurrentRetirementSavings(savings) {
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentTotalSavings,
			ActionType.TYPE,
			savings,
			'txtCurrentTotalSavings'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentTotalSavings,
			ActionType.TAB,
			null,
			'txtCurrentTotalSavings'
		);
	}
	enterAnnualSavings(savings) {
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentAnnualSavings,
			ActionType.TYPE,
			savings,
			'txtCurrentAnnualSavings'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtCurrentAnnualSavings,
			ActionType.TAB,
			null,
			'txtCurrentAnnualSavings'
		);
	}
	enterSavingsIncreaseRate(savings) {
		this.actionHelper.performAction(
			this.pageFactory.txtSavingsIncreaseRate,
			ActionType.TYPE,
			savings,
			'txtSavingsIncreaseRate'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtSavingsIncreaseRate,
			ActionType.TAB,
			null,
			'txtSavingsIncreaseRate'
		);
	}
	selectSocialSecurityBenefitsYesRadio() {
		this.actionHelper.performAction(
			this.pageFactory.rbSocialSecurityBenefitsYes,
			ActionType.CLICK,
			null,
			'rbSocialSecurityBenefitsYes'
		);
	}
	selectSocialSecurityBenefitsNoRadio() {
		this.actionHelper.performAction(
			this.pageFactory.rbSocialSecurityBenefitsNo,
			ActionType.CLICK,
			null,
			'rbSocialSecurityBenefitsNo'
		);
	}
	selectMaritalStatusSingle() {
		this.actionHelper.performAction(
			this.pageFactory.rbMaritalStatusSingle,
			ActionType.CLICK,
			null,
			'rbMaritalStatusSingle'
		);
	}
	selectMaritalStatusMarried() {
		this.actionHelper.performAction(
			this.pageFactory.rbMaritalStatusMarried,
			ActionType.CLICK,
			null,
			'rbMaritalStatusMarried'
		);
	}
	enterSocialSecurityOverrideAmount(amount) {
		this.actionHelper.performAction(
			this.pageFactory.txtSocialSecurityOverrideAmount,
			ActionType.TYPE,
			amount,
			'txtSocialSecurityOverrideAmount'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtSocialSecurityOverrideAmount,
			ActionType.TAB,
			null,
			'txtSocialSecurityOverrideAmount'
		);
	}
	isDefaultValuesModalSectionDisplayed() {
		return this.pageFactory.lstDefaultValuesModalSection.length > 0;
	}
	clickLnkAdjustDefaultValues() {
		this.actionHelper.performAction(
			this.pageFactory.lnkAdjustDefaultValues,
			ActionType.CLICK,
			null,
			'lnkAdjustDefaultValues'
		);
	}
	clickBtnCalculate() {
		this.actionHelper.performAction(
			this.pageFactory.btnCalculate,
			ActionType.CLICK,
			null,
			'btnCalculate'
		);
	}
	clickBtnClearForm() {
		this.actionHelper.performAction(
			this.pageFactory.btnClearForm,
			ActionType.CLICK,
			null,
			'btnClearForm'
		);
	}
	enterAdditionalIncome(income) {
		this.actionHelper.performAction(
			this.pageFactory.txtAdditionalIncome,
			ActionType.TYPE,
			income,
			'txtAdditionalIncome'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtAdditionalIncome,
			ActionType.TAB,
			null,
			'txtAdditionalIncome'
		);
	}
	enterRetirementDuration(duration) {
		this.actionHelper.performAction(
			this.pageFactory.txtRetirementDuration,
			ActionType.TYPE,
			duration,
			'txtRetirementDuration'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtRetirementDuration,
			ActionType.TAB,
			null,
			'txtRetirementDuration'
		);
	}
	selectIncludeInflationYesRadio() {
		this.actionHelper.performAction(
			this.pageFactory.rbIncludeInflationYes,
			ActionType.CLICK,
			null,
			'rbIncludeInflationYes'
		);
	}
	selectIncludeInflationNoRadio() {
		this.actionHelper.performAction(
			this.pageFactory.rbIncludeInflationNo,
			ActionType.CLICK,
			null,
			'rbIncludeInflationNo'
		);
	}
	enterExpectedInflationRate(inflationRate) {
		this.actionHelper.performAction(
			this.pageFactory.txtExpectedInflationRate,
			ActionType.TYPE,
			inflationRate,
			'txtExpectedInflationRate'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtExpectedInflationRate,
			ActionType.TAB,
			null,
			'txtExpectedInflationRate'
		);
	}
	enterRetirementAnnualIncome(income) {
		this.actionHelper.performAction(
			this.pageFactory.txtRetirementAnnualIncome,
			ActionType.TYPE,
			income,
			'txtRetirementAnnualIncome'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtRetirementAnnualIncome,
			ActionType.TAB,
			null,
			'txtRetirementAnnualIncome'
		);
	}
	enterPreRetirementROI(roi) {
		this.actionHelper.performAction(
			this.pageFactory.txtPreRetirementROI,
			ActionType.TYPE,
			roi,
			'txtPreRetirementROI'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtPreRetirementROI,
			ActionType.TAB,
			null,
			'txtPreRetirementROI'
		);
	}
	enterPostRetirementROI(roi) {
		this.actionHelper.performAction(
			this.pageFactory.txtPostRetirementROI,
			ActionType.TYPE,
			roi,
			'txtPostRetirementROI'
		);
		this.actionHelper.performAction(
			this.pageFactory.txtPostRetirementROI,
			ActionType.TAB,
			null,
			'txtPostRetirementROI'
		);
	}
	clickBtnSaveChanges() {
		this.actionHelper.performAction(
			this.pageFactory.btnSaveChanges,
			ActionType.CLICK,
			null,
			'btnSaveChanges'
		);
	}
	clickBtnCancel() {
		this.actionHelper.performAction(
			this.pageFactory.btnCancel,
			ActionType.CLICK,
			null,
			'btnCancel'
		);
	}
	clickBtnClose() {
		this.actionHelper.performAction(
			this.pageFactory.btnClose,
			ActionType.CLICK,
			null,
			'btnClose'
		);
	}
	isMaritalStatusSingleDisplayed() {
		return this.actionHelper.isElementDisplayed(
			this.pageFactory.rbMaritalStatusSingle
		);
	}
	isSocialSecurityOverrideAmountDisplayed() {
		return this.actionHelper.isElementDisplayed(
			this.pageFactory.txtSocialSecurityOverrideAmount
		);
	}
	isCalculatorIntroSectionDisplayed() {
		return this.actionHelper.isElementDisplayed(
			this.pageFactory.calculatorIntroSection
		);
	}
	isCalculatorInputAlertDescDisplayed() {
		return this.actionHelper.isElementDisplayed(
			this.pageFactory.calculatorInputAlertDesc
		);
	}
	getCurrentAgeValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtCurrentAge,
			'value'
		);
	}
	getRetirementAgeValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtRetirementAge,
			'value'
		);
	}
	getCurrentIncomeValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtCurrentIncome,
			'value'
		);
	}
	getSpouseIncomeValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtSpouseIncome,
			'value'
		);
	}
	getCurrentRetirementSavingsValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtCurrentTotalSavings,
			'value'
		);
	}
	getAnnualSavingsValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtCurrentAnnualSavings,
			'value'
		);
	}
	getSavingsIncreaseRateValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtSavingsIncreaseRate,
			'value'
		);
	}
	isSocialSecurityBenefitsYesSelected() {
		return this.actionHelper.isElementSelected(
			this.pageFactory.rbSocialSecurityBenefitsYes
		);
	}
	isMaritalStatusSingleSelected() {
		return this.actionHelper.isElementSelected(
			this.pageFactory.rbMaritalStatusSingle
		);
	}
	getSocialSecurityOverrideAmountValue() {
		return this.actionHelper.getAttributeValue(
			this.pageFactory.txtSocialSecurityOverrideAmount,
			'value'
		);
	}
	waitForModalSectionDisplayed() {
		return this.actionHelper.isElementDisplayed(
			this.pageFactory.lstDefaultValuesModalContent.get(0)
		);
	}
	validateRetirementAmount() {
		this.actionHelper.moveToElement(this.pageFactory.retirementAmountTxt).perform();
		expect(this.pageFactory.retirementAmountTxt, 'Retirement amount div is not present').to.exist;
		const amountText = this.pageFactory.retirementAmountTxt.text();
		const amount = this.extractAmount(amountText);
		expect(amount).to.be.gt(0, 'Retirement amount should be greater than 0');
		expect(amountText).to.include('$', 'Retirement amount should have a dollar symbol');
	}

	validateCurrentSavings() {
		//this.actionHelper.moveToElement(this.pageFactory.currentSavingsTxt).perform();
		expect(this.pageFactory.currentSavingsTxt, 'Current savings div is not present').to.exist;
		const amountText = this.pageFactory.currentSavingsTxt.text();
		const amount = this.extractAmount(amountText);
		expect(amount).to.be.gt(0, 'Current savings amount should be greater than 0');
		expect(amountText).to.include('$', 'Current savings amount should have a dollar symbol');
	}

	validateEmailResultsButton() {
	//	this.actionHelper.moveToElement(this.pageFactory.emailResultsBtn).perform();
		expect(this.pageFactory.emailResultsBtn, 'Email Results button is not present').to.exist;
		expect(this.pageFactory.emailResultsBtn).to.includeSubset({ text: chaiSubset.exists });
		expect(this.pageFactory.emailResultsBtn).to.includeSubset({ enabled: true });
	}

	validateEditInfoButton() {
		//this.actionHelper.moveToElement(this.pageFactory.editInfoBtn).perform();
		expect(this.pageFactory.editInfoBtn, 'Edit Info button is not present').to.exist;
		expect(this.pageFactory.editInfoBtn).to.includeSubset({ text: chaiSubset.exists });
		expect(this.pageFactory.editInfoBtn).to.includeSubset({ enabled: true });
	}

	validateSeeFullResultsButton() {
		this.actionHelper.moveToElement(this.pageFactory.seeFullResultsBtn).perform();
		expect(this.pageFactory.seeFullResultsBtn, 'See Full Results button is not present').to.exist;
		expect(this.pageFactory.seeFullResultsBtn).to.includeSubset({ text: chaiSubset.exists });
		expect(this.pageFactory.seeFullResultsBtn).to.includeSubset({ enabled: true });
	}

	extractAmount(amountText) {
		const amountValue = amountText.replace(/[^0-9.]/g, '');
		return parseFloat(amountValue);
	}
}

export default InsightsAndToolsPage;
