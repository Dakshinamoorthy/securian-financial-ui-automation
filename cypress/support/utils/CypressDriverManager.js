import UIConstantHelper from "./UiConstantHelper";

class CypressDriverManager {
  static getDriver(browserType) {
    let driver;

    switch (browserType) {
      case 'chrome':
        driver = this.createChromeDriver();
        break;

      case 'firefox':
        driver = this.createFirefoxDriver();
        break;

      default:
        throw new Error('Invalid browser type: ' + browserType);
    }

    UIConstantHelper.WEBDRIVER = driver;
  }

  static createChromeDriver() {
    return cy.visit({ browser: 'chrome' });
  }

  static createFirefoxDriver() {
    return cy.visit({ browser: 'firefox' });
  }

  static getBrowserTypeFromString(browserTypeString) {
    const browserType = browserTypeString.toLowerCase();
    const supportedTypes = ['chrome', 'firefox'];

    if (supportedTypes.includes(browserType)) {
      return browserType;
    }

    throw new Error('Invalid browser type string: ' + browserTypeString);
  }
}

export default CypressDriverManager;
