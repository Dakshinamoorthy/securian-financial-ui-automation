/**
 * 
 */
class InsightsAndToolsPageFactory {
	get lnkIndividualsMenu() {
		return cy.xpath("//a[@data-dsg-nav-item='1']");
	}

	get lnkInsightsToolsSubMenu() {
		return cy.xpath("//a[starts-with(@class, 'subnav-menu-item')][starts-with(@data-dsg-nav-item, '1.2')]");
	}

	get lnkRetirementCalculator() {
		return cy.xpath("//*[@id='dsgint-nav-submenu-1.2']//div[@class='container-fluid']//ul//a[contains(@href,'/insights-tools/retirement-calculator')]");
	}

	get txtCurrentAge() {
		return cy.get("input[id*='current-age']");
	}

	get txtRetirementAge() {
		return cy.get("input[id*='retirement-age']");
	}

	get txtCurrentIncome() {
		return cy.get("input[id*='current-income']");
	}

	get txtSpouseIncome() {
		return cy.get("input[id*='spouse-income']");
	}

	get txtCurrentTotalSavings() {
		return cy.get("input[id*='current-total-savings']");
	}

	get txtCurrentAnnualSavings() {
		return cy.get("input[id*='current-annual-savings']");
	}

	get txtSavingsIncreaseRate() {
		return cy.get("input[id*='savings-increase-rate']");
	}

	get rbSocialSecurityBenefitsYes() {
		return cy.get("input[name*='social-security-benefits'][value='Y']");
	}

	get rbSocialSecurityBenefitsNo() {
		return cy.get("input[name*='social-security-benefits'][value='N']");
	}

	get rbMaritalStatusSingle() {
		return cy.get("#single");
	}

	get rbMaritalStatusMarried() {
		return cy.get("#married");
	}

	get txtSocialSecurityOverrideAmount() {
		return cy.get("#social-security-override");
	}

	get calculatorIntroSection() {
		return cy.get("#calculator-intro-section");
	}

	get calculatorInputAlertDesc() {
		return cy.get("#calculator-input-alert-desc");
	}

	get lstDefaultValuesModalSection() {
		return cy.get("input[name*='social-security-benefits'][value='N']");
	}

	get lnkAdjustDefaultValues() {
		return cy.get("a[data-target*='default-values-modal']");
	}

	get btnCalculate() {
		return cy.get("button[data-tag-id*='submit']");
	}

	get btnClearForm() {
		return cy.get("button[onclick*='clearRetirementForm']");
	}

	get lstDefaultValuesModalContent() {
		return cy.get("div[id*='default-values-modal'] div[class$='modal-content']");
	}

	get txtAdditionalIncome() {
		return cy.get("input[id*='additional-income']");
	}

	get txtRetirementDuration() {
		return cy.get("input[id*='retirement-duration']");
	}

	get rbIncludeInflationYes() {
		return cy.get("input[name*='inflation-inclusion'][value='Y']");
	}

	get rbIncludeInflationNo() {
		return cy.get("input[name*='inflation-inclusion'][value='N']");
	}

	get txtExpectedInflationRate() {
		return cy.get("input#expected-inflation-rate");
	}

	get txtRetirementAnnualIncome() {
		return cy.get("input[id*='retirement-annual-income']");
	}

	get txtPreRetirementROI() {
		return cy.get("input[id*='pre-retirement-roi']");
	}

	get txtPostRetirementROI() {
		return cy.get("input[id*='post-retirement-roi']");
	}

	get btnSaveChanges() {
		return cy.get("button[onclick*='savePersonalizedValues']");
	}

	get btnCancel() {
		return cy.get("[data-dismiss$='modal'][class*='dsg-btn-tertiary']");
	}

	get btnClose() {
		return cy.get("div#default-values-modal button[aria-label*='close'][data-dismiss='modal']");
	}

	get congratulationsMessageTxt() {
		return cy.get("#result-message");
	}

	get currentMonthlySavingsTxt() {
		return cy.get("#current-monthly-savings-result");
	}

	get goalMonthlySavingsTxt() {
		return cy.get("#goal-monthly-savings-result");
	}

	get retirementAmountTxt() {
		return cy.get("#retirement-amount-results");
	}

	get currentSavingsTxt() {
		return cy.get("#current-savings-results");
	}

	get emailResultsBtn() {
		return cy.get(".col-lg-12 > .dsg-btn-primary");
	}

	get editInfoBtn() {
		return cy.get(".col-lg-12 > .dsg-btn-secondary[onclick='navigateToRetirementForm();']");
	}

	get seeFullResultsBtn() {
		return cy.get(".col-lg-12 > .dsg-btn-secondary[onclick='showFullResults();']");
	}

	get resultsChartElement() {
		return cy.get("#results-chart");
	}
}

export default InsightsAndToolsPageFactory;
