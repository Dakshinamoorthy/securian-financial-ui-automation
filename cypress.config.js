const { defineConfig } = require("cypress");
const path = require("path");
const fs = require("fs-extra");
const dayjs = require("dayjs");
const UAParser = require("ua-parser-js");

const UIConstantHelper = require("./cypress/support/utils/UiConstantHelper");
const { CypressUtils } = require("./cypress/support/utils/CypressUtils");

let configData;

function loadConfigFile() {
  return new Promise((resolve, reject) => {
    fs.readFile("app.config.json", "utf8", (err, fileData) => {
      if (err) {
        console.error(`Error loading config file: ${err}`);
        reject(err);
      } else {
        configData = JSON.parse(fileData);
        printObjectEntries(configData);
        resolve(configData);
      }
    });
  });
}

const printObjectEntries = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (key.startsWith("__comment")) {
      // Ignore comment
    } else if (typeof value === "object" && value !== null) {
      // If the value is an object, recurse
      printObjectEntries(value);
    } else {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  });
};

function generateNewRunId(baseFolder) {
  let newRunId = "001";
  if (fs.existsSync(baseFolder)) {
    const existingFolders = fs.readdirSync(baseFolder);
    const existingRunIds = existingFolders.map((folder) =>
      parseInt(folder.replace("Test_Run_ID_", ""))
    );
    const maxRunId = Math.max(...existingRunIds);
    if (maxRunId && !isNaN(maxRunId)) {
      newRunId = String(maxRunId + 1).padStart(3, "0");
    }
  }
  UIConstantHelper.setTestRunId(newRunId);
  return newRunId;
}

function startTest(testName) {
  UIConstantHelper.setTestName(testName);
  console.log(`Starting test: ${testName}`);
  return null;
}

function createTempFolder() {
  const tempFolderPath = path.join(__dirname, "temp");
  if (fs.existsSync(tempFolderPath)) {
    fs.removeSync(tempFolderPath);
    console.log("fjkd-----------------------");
  }
  fs.mkdirSync(tempFolderPath, { recursive: true });
  return null;
}

function createTestFolders() {
  // Implement this function based on your requirement
  return "Not implemented yet";
}

function finalizeExtentReport() {
  const mochawesomeReportDir = "cypress/reports/mochawesome";
  const currentDate = new Date().toISOString().slice(0, 10);
  const testRunId = UIConstantHelper.getTestRunId();

  const reportFolder = path.join(
    config.projectRoot,
    "test-data/html-report",
    currentDate,
    `Test_Run_Id_${testRunId}`
  );

  const reportFilePath = path.join(reportFolder, "test-results.html");

  if (!fs.existsSync(reportFolder)) {
    fs.mkdirSync(reportFolder, { recursive: true });
  }

  const mochawesomeReportFile = path.join(
    mochawesomeReportDir,
    "mochawesome.json"
  );

  const mochawesomeData = fs.readFileSync(mochawesomeReportFile, "utf-8");
  const mochawesomeResults = JSON.parse(mochawesomeData);

  const extentReportData = {
    stats: {
      suites: 1, // Assuming one suite for all tests
      tests: totalTests,
      passes: totalPassed,
      pending: totalPending,
      failures: totalFailed,
      start: mochawesomeResults.stats.start,
      end: mochawesomeResults.stats.end,
      duration: mochawesomeResults.stats.duration,
    },
    results: [mochawesomeResults],
  };

  fs.writeFileSync(reportFilePath, JSON.stringify(extentReportData));

  console.log(`Extent Report saved at: ${reportFilePath}`);

  return reportFilePath;
}
function createDirectory(directoryPath) {
  const fullPath = path.join(this.BASE_DIRECTORY, directoryPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  return fullPath;
}
function calculateDuration(startDateStr, endDateStr) {
  const startDate = dayjs(startDateStr, "DD/MM/YY hh:mm:ss.SSS A");
  const endDate = dayjs(endDateStr, "DD/MM/YY hh:mm:ss.SSS A");

  const durationVal = endDate.diff(startDate);
  const durationObject = dayjs.duration(durationVal);

  const differenceInMilliseconds = durationObject.asMilliseconds();
  const differenceInSeconds = durationObject.asSeconds();
  const differenceInMinutes = durationObject.asMinutes();
  const differenceInHours = durationObject.asHours();
  const differenceInDays = durationObject.asDays();

  const durationOfExecution = `${differenceInDays} Days, ${differenceInHours} Hrs, ${differenceInMinutes} Min, ${differenceInSeconds} Sec and ${differenceInMilliseconds} MS`;

  return durationOfExecution;
}
function createLastRunFolder() {
  const now = dayjs();
  const dateFolderName = now.format("YYYY-MM-DD");
  const folderPath = path.join(
    this.BASE_DIRECTORY,
    "test-Reports",
    "screenshots",
    dateFolderName
  );

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const directories = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  directories.sort();

  const testRunId = this.generateTestRunId(directories);
  UIConstantHelper.TEST_RUN_ID = testRunId
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ");

  let testRunFolder = path.join(
    this.BASE_DIRECTORY,
    "test-Reports",
    "html-report",
    testRunId
  );
  while (fs.existsSync(testRunFolder)) {
    let nextRunId = this.extractRunIdNumber(testRunId) + 1;
    testRunId = "TestRunID-" + String(nextRunId).padStart(3, "0");
    testRunFolder = path.join(
      this.BASE_DIRECTORY,
      "test-Reports",
      "html-report",
      testRunId
    );
  }

  const lastRunFolder = path.join(dateFolderName, testRunId);
  this.createDirectory(path.join("test-Reports", "html-report", lastRunFolder));
  this.createDirectory(path.join("test-Reports", "screenshots", lastRunFolder));
  this.createDirectory(path.join("test-Reports", "logs", lastRunFolder));

  return lastRunFolder;
}
function updateLog4j2Configuration() {
  const log4jConfigContent = `<?xml version="1.0" encoding="UTF-8"?>
      <Configuration xmlns="http://logging.apache.org/log4j/2.0/config" status="WARN" strict="true">
        <Appenders>
          <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n" />
          </Console>
          <File name="File" fileName="${Cypress.env(
            "LOG_REPORT_FOLDER"
          )}/securian_uitest_logger.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n" />
          </File>
        </Appenders>
        <Loggers>
          <Root level="debug">
            <AppenderRef ref="Console" />
            <AppenderRef ref="File" />
          </Root>
        </Loggers>
      </Configuration>`;

  const log4jConfigFilePath = "config/log4j2.xml";

  try {
    fs.unlinkSync(log4jConfigFilePath);
    console.log("Existing Log4j 2 XML configuration file deleted.");
  } catch (error) {
    console.log(
      `Failed to delete existing Log4j 2 XML configuration file: ${error.message}`
    );
  }

  try {
    fs.writeFileSync(log4jConfigFilePath, log4jConfigContent);
    console.log("Log4j 2 XML configuration file created successfully.");
  } catch (error) {
    console.log(
      `Failed to create Log4j 2 XML configuration file: ${error.message}`
    );
  }
}
function getBrowserVersion() {
  return cy.window().then((win) => {
    const userAgentString = win.navigator.userAgent;
    const parser = new UAParser(userAgentString);
    return parser.getBrowser().version;
  });
}
module.exports = {
  ...(on, config) => {
    loadConfigFile()
      .then((configData) => {
        config.env = config.env || {};
        config.env.configData = configData;

        const createLastRunFolderResult = createLastRunFolder();
        const extentReportFolder = createDirectory(
          path.join("test-Reports", "html-report", createLastRunFolderResult)
        );
        const screenshotFolder = createDirectory(
          path.join("test-Reports", "screenshots", createLastRunFolderResult)
        );
        const logReportFolder = createDirectory(
          path.join("test-Reports", "logs", createLastRunFolderResult)
        );

        updateLog4j2Configuration();

        UIConstantHelper.EXTENT_REPORT_FOLDER = extentReportFolder;
        UIConstantHelper.SCREENSHOT_FOLDER = screenshotFolder;
        UIConstantHelper.LOG_REPORT_FOLDER = logReportFolder;

        CypressUtils.installNewFontToSystem();

        on("before:run", async (details) => {
          console.log(`Before Run: ${JSON.stringify(details)}`);
          on("task", {
            generateNewRunId,
            startTest,
            createTempFolder,
            createTestFolders,
            finalizeExtentReport,
          });
        });

        on("after:run", async (results) => {
          console.log("Run completed.");
          console.log(`Number of passed tests: ${results.totalPassed}`);

          UIConstantHelper.TEST_END_DATE_TIME = dayjs();
          UIConstantHelper.TOTAL_DURATION = calculateDuration(
            UIConstantHelper.TEST_START_DATE_TIME,
            UIConstantHelper.TEST_END_DATE_TIME
          );
          const shouldSendMailReport = configData["email"]["send_mail_report"];
          if (shouldSendMailReport.toLowerCase() === "yes") {
            await CypressUtils.createPieChart();
            await CypressUtils.sendMail();
          }
          CypressUtils.deleteTempFolder();
          CypressUtils.openFolder(
            UIConstantHelper.EXTENT_REPORT_FOLDER,
            "remoteLinuxHost",
            "remoteLinuxUsername"
          );
        });

        on("before:browser:launch", (browser = {}, launchOptions) => {
          console.log("Browser name: ", browser.name);
          console.log("Browser version: ", browser.version);
          UIConstantHelper.BROWSER_VERSION = browser.version;
          return launchOptions;
        });

        return config;
      })
      .catch((err) => {
        console.error("Error loading config file:", err);
      });
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
module.exports.loadConfigFile = loadConfigFile;
module.exports.configData = configData;
