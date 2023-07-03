const dayjs = require('dayjs');

class UIConstantHelper {
  static WEBDRIVER = 'chrome';
  static LAUNCH_BROWSER_NAME = '';
  static BROWSER_VERSION = '';
  static TEST_BASE_URL = '';
  static TEST_END_DATE = '';
  static TEST_START_DATE = '';
  static TEST_START_DATE_TIME = null;
  static TEST_END_DATE_TIME = null;
  static TEST_RUN_ID = '';
  static PASSED_TC_COUNTER = 0;
  static FAILED_TC_COUNTER = 0;
  static SKIPPED_TC_COUNTER = 0;
  static EXTENT_REPORT_FOLDER = '';
  static SCREENSHOT_FOLDER = '';
  static EXCEL_REPORT_FOLDER = '';
  static EXCEL_REPORT_FILE_PATH = '';
  static LOG_REPORT_FOLDER = '';
  static PDF_REPORT_FOLDER = '';
  static PDF_REPORT_FILE_PATH = '';
  static OPERATING_SYSTEM = '';
  static OS_NAME = '';
  static USER_SYSTEM_TYPE = '';
  static SYSTEM_USER_NAME = '';
  static SYSTEM_SERIAL_NUMBER = '';
  static SYSTEM_MFR_MODEL_NAME = '';
  static INSTALLED_JAVA_VERSION = '';
  static TOTAL_TESTS = 0;
  static TOTAL_TESTS_PASSED = '';
  static TOTAL_TESTS_FAILED = '';
  static TOTAL_DURATION = '';
  static ACHIEVED_PASS_PERCENTAGE = '';
  static LAUNCH_BROWSER_NAME_VALUE = '';
  static TEMP_FOLDER_PATH = null;
  static BASE_URL_TEST_ENVIRONMENT = '';
  static CATEGORIES_OF_TEST_AUTOMATION = '';
  static CONSTANT_NAME_1 = '';
  static CONSTANT_NAME_2 = 0;
  static CONSTANT_NAME_3 = '';
  static CLASS_LEVEL_TEST_CASE_MAP = [];
  static VARIABLE_NAME_2 = 0;
  static VARIABLE_NAME_3 = [];
   static CURRENTTESTNAME = '';
    static CURRENTESTDESC = '';

  static setBaseUrl(baseUrl) {
    UIConstantHelper.TEST_BASE_URL = baseUrl;
  }

  static setScreenshotFolder(folderPath) {
    UIConstantHelper.SCREENSHOT_FOLDER = folderPath;
  }

  static setExtentReportFolder(folderPath) {
    UIConstantHelper.EXTENT_REPORT_FOLDER = folderPath;
  }

  static setTestRunId(runId) {
    UIConstantHelper.TEST_RUN_ID = runId;
  }

  static setStartDate() {
    UIConstantHelper.TEST_START_DATE = dayjs().format('DD/MM/YY hh:mm:ss.SSS A');
  }

  static setEndDate() {
    UIConstantHelper.TEST_END_DATE = dayjs().format('DD/MM/YY hh:mm:ss.SSS A');
  }

  static setStartDateTime() {
    UIConstantHelper.TEST_START_DATE_TIME = dayjs();
  }

  static setEndDateTime() {
    UIConstantHelper.TEST_END_DATE_TIME = dayjs();
  }
 static setTestName_Curr(testname) {
    UIConstantHelper.CURRENTTESTNAME =testname;
  }
   static setTestName_Desc(testdesc) {
    UIConstantHelper.CURRENTESTDESC =testdesc;
  }
  static incrementPassedTestCaseCounter() {
    UIConstantHelper.PASSED_TC_COUNTER++;
  }

  static incrementFailedTestCaseCounter() {
    UIConstantHelper.FAILED_TC_COUNTER++;
  }

  static incrementSkippedTestCaseCounter() {
    UIConstantHelper.SKIPPED_TC_COUNTER++;
  }

  static incrementTotalTestsCounter() {
    UIConstantHelper.TOTAL_TESTS++;
  }

  static calculateDuration() {
    const startDate = dayjs(UIConstantHelper.TEST_START_DATE_TIME, 'DD/MM/YY hh:mm:ss.SSS A');
    const endDate = dayjs(UIConstantHelper.TEST_END_DATE_TIME, 'DD/MM/YY hh:mm:ss.SSS A');

    const duration = endDate.diff(startDate);
    const durationObject = _duration(duration);

    const differenceInMilliseconds = durationObject.asMilliseconds();
    const differenceInSeconds = durationObject.asSeconds();
    const differenceInMinutes = durationObject.asMinutes();
    const differenceInHours = durationObject.asHours();

    UIConstantHelper.TOTAL_DURATION = {
      milliseconds: differenceInMilliseconds,
      seconds: differenceInSeconds,
      minutes: differenceInMinutes,
      hours: differenceInHours,
    };
  }

  static setAchievedPassPercentage() {
    const totalTests = UIConstantHelper.TOTAL_TESTS;
    const passedTests = UIConstantHelper.PASSED_TC_COUNTER;

    if (totalTests > 0) {
      const passPercentage = (passedTests / totalTests) * 100;
      UIConstantHelper.ACHIEVED_PASS_PERCENTAGE = passPercentage.toFixed(2);
    } else {
      UIConstantHelper.ACHIEVED_PASS_PERCENTAGE = 'N/A';
    }
  }
}

module.exports = UIConstantHelper;

