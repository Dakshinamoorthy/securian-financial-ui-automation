const { addContext } = require('mochawesome/addContext');
const Chart = require('chart.js');
const path = require('path');
const fs = require('fs');

const nodemailer = require('nodemailer');

class CypressUtils {
  static createTempFolder() {
    const projectRoot = Cypress.config('projectRoot');
    const tempFolderName = 'temp';
    const tempFolderPath = path.join(projectRoot, tempFolderName);

    if (fs.existsSync(tempFolderPath)) {
      try {
        fs.rmdirSync(tempFolderPath, { recursive: true });
        console.log('Existing temp folder deleted:', tempFolderPath);
      } catch (error) {
        console.error('Failed to delete existing temp folder:', error);
        return;
      }
    }

    try {
      fs.mkdirSync(tempFolderPath);
      console.log('Temp folder created successfully:', tempFolderPath);
    } catch (error) {
      console.error('Failed to create temp folder:', error);
    }
  }

  static deleteTempFolder() {
    const projectRoot = Cypress.config('projectRoot');
    const tempFolderPath = path.join(projectRoot, 'temp');

    // Function to recursively delete a directory
    const deleteFolderRecursive = function (folderPath) {
      if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(function (file, _index) {
          const curPath = path.join(folderPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            // Recursive call for directories
            deleteFolderRecursive(curPath);
          } else {
            // Delete files
            fs.unlinkSync(curPath);
          }
        });
        // Delete the empty directory
        fs.rmdirSync(folderPath);
      }
    };

    // Delete the temp folder
    deleteFolderRecursive(tempFolderPath);
  }

  static startTest(testName, testDescription) {
    const test = console.log(testName);
    addContext(test, testDescription);
  }

  static logStep(status, details, e) {
    cy.then(() => {
      switch (status) {
        case 'pass':
          console.log(details);
          break;
        case 'fail':
          console.log(details).then(() => {
            console.error(`Test step failed:\n${e && e.message}`);
            console.error(`Test step failed:\n${e && e.message}`);
          });
          break;
        case 'skip':
          console.log(details).then(() => {
            Cypress.runner.stop();
          });
          break;
        default:
          console.log(details);
          break;
      }
    });
  }

static logScreenshot(screenshotPath) {
  addContext({ test: cy.state('runnable') }, screenshotPath);
}


  static takeFullScreenShots(expected, actual, status, elementSelector, e) {
    const screenshotName = `FullScreenScreenshot_${Cypress.moment().format('YYYYMMDD_HHmmss')}.png`;
    const screenshotPath = path.join('cypress', 'screenshots', screenshotName);

    cy.get(elementSelector).then(($element) => {
      Cypress.viewport($element.width(), $element.height());
      cy.screenshot(screenshotPath);
      Cypress.viewport('default');
    });

    let exceptionMessage = '';
    if (e && e.message) {
      exceptionMessage = e.message;
    }

    const details = `
      <div style="max-width: 100%; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
          <tr style="background-color: #f9f9f9;">
            <th style="padding: 10px; width: 120px;">Expected</th>
            <td style="padding: 10px;">${expected}</td>
          </tr>
          <tr style="background-color: #ffffff;">
            <th style="padding: 10px; width: 120px;">Actual</th>
            <td style="padding: 10px;">${actual}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <th style="padding: 10px; width: 120px;">Status</th>
            <td style="padding: 10px;">${status}</td>
          </tr>
          ${exceptionMessage ? `
            <tr style="background-color: #ffffff;">
              <th style="padding: 10px; width: 120px;">Exception message</th>
              <td style="padding: 10px;">${exceptionMessage}</td>
            </tr>
          ` : ''}
        </table>
      </div>
    `;

    CypressUtils.logStep(status, details);
    CypressUtils.logScreenshot(screenshotPath);
  }
  
  static clearElementStyles(elementSelector) {
    cy.get(elementSelector).invoke('removeAttr', 'style');
  }

  static highlightElement(elementSelector) {
    cy.get(elementSelector).then(($element) => {
      $element.css({
        'border-top': '3px groove rgba(255, 153, 51)',
        'border-bottom': '3px groove rgba(19, 136, 8)',
        'border-left': '3px groove rgba(255, 255, 255)',
        'border-right': '3px groove rgba(255, 255, 255)',
        'border-radius': '22.5px',
        'box-shadow': 'inset 0 -3em 3em rgba(0,0,0,0.1), 0 0 0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)',
      });

      cy.wait(1000);
    });
  }

  static createPieChart() {
    const chartContainer = document.createElement('canvas');
    chartContainer.id = 'pieChart';
    chartContainer.width = 400;
    chartContainer.height = 400;
    chartContainer.style.border = '1px solid #ccc';
    chartContainer.style.borderRadius = '10px';
    chartContainer.style.margin = '20px auto';
    chartContainer.style.display = 'block';
    document.body.appendChild(chartContainer);
    const ctx = chartContainer.getContext('2d');
    const fontFilePath = path.join(Cypress.config('projectRoot'), 'cypress', 'support', 'fonts', 'HurmeGeometricSansRegular.otf');
    const fontUrl = `url(${fontFilePath})`;
    const chartData = {
      labels: ['Success', 'Failure', 'Skipped', 'Ignored', 'Blocked'],
      datasets: [{
        data: [UIConstants.PASSED_TC_COUNTER, UIConstants.FAILED_TC_COUNTER, UIConstants.SKIPPED_TC_COUNTER, 0, 0],
        backgroundColor: ['#42a5f5', '#ef5350', '#ffc107', '#9e9e9e', '#ff5722'],
      }],
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      fonts: {
        display: 'HurmeGeometricSansRegular',
        source: fontUrl,
      },
    };
    new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: chartOptions,
    });
    const chartImagePath = path.join(Cypress.config('projectRoot'), 'temp', 'chart.png');
    chartContainer.toBlob((chartBlob) => {
      const chartFileStream = fs.createWriteStream(chartImagePath);
      chartFileStream.on('finish', () => console.log('Chart saved successfully:', chartImagePath));
      chartFileStream.write(chartBlob);
      chartFileStream.end();
    }, 'image/png');
  }

  static createEmailBody() {
    const receiverNames = toEmails.join(', ').replace(/,([^,]*)$/, ' and$1');
    const htmlContent = `
      <div style="background-color: #e6e7e8; margin: 0;">
        <div style="background-color: #fff; box-shadow: 0 4px 16px rgba(0, 0, 0, .15); margin-bottom: -15px; margin-top: -15px; margin-left: -15px; margin-right: -15px; font-family: HurmeGeometricSans3-Regular, Arial, Helvetica, sans-serif;">
          <p style="margin: 0; font-size: 12px; font-family: Arial, sans-serif; color: #252525;">
            Dear ${receiverNames},
          </p>
          <p style="margin: 0; font-size: 12px; font-family: Arial, sans-serif; color: #252525;">&nbsp;</p>
          <p style="margin: 0; font-size: 12px; font-family: Arial, sans-serif; color: #252525; text-indent: 40px;">
            I hope this email finds you well. Attached herewith, please find the Automation Execution Report for
            <strong>${emailOptions.subject}</strong>.
          </p>
          <p style="margin: 0; font-size: 12px; font-family: Arial, sans-serif; color: #252525;">
            This report provides a comprehensive overview of the test execution results for your reference.
          </p>
          <p style="margin: 0; text-indent: 40px; font-size: 12px; font-family: Arial, sans-serif; color: #252525;">&nbsp;</p>
          <table style="width: 100%; background-color: #099541; height: thin;">
            <tbody>
              <tr>
                <td style="width: 100%; height: thin;">&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <table style="width: 100%; border-collapse: collapse; height: 42px;">
            <tbody>
              <tr>
                <td style="width: 100%; height: 19px;">
                  <a title="Securian Financial" href="https://www.securian.com/" target="_blank" rel="noopener noreferrer">
                    <img style="width: 100%; max-width: 120px; cursor: pointer; padding-bottom: 19px;" src="https://www.securian.com/content/dam/securian/content-assets/cse/sf-logo-rgb-bk-wordmark.svg" />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="width: 100%; border-width: thin; border-style: solid solid none; border-color: #95c93d; border-image: initial; text-align: center; vertical-align: middle; height: 23px; font-family: Arial, sans-serif; color: #099541; font-size: 10px; text-shadow: 1px 1px 1px rgba(136, 136, 136, 0.8) !important;">
                  <strong>Automation Execution Summary (${TEST_RUN_ID.replace(/id\\s/i, 'ID: ')})</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    return htmlContent;
  }

  static sendMail() {
    const ccEmails = []; // Add your cc email addresses
    const bccEmails = []; // Add your bcc email addresses

    const emailOptions = {
      from: 'from@example.com',
      to: 'recipient@gmail.com', // Replace with the actual recipient email
      subject: 'Automation Execution Report - Securian Financial Web Application Regression (ID: ' + TEST_RUN_ID + ')',
      html: CypressUtils.createEmailBody(),
      attachments: [
        {
          filename: 'AutomationReport.pdf',
          path: '/path/to/automation/report.pdf', // Replace with the actual path to the automation report PDF
        },
        {
          filename: 'AutomationReport.xlsx',
          path: '/path/to/automation/report.xlsx', // Replace with the actual path to the automation report Excel file
        },
      ],
      replyTo: 'noreply-reports@securian.com', // Set the reply-to email address
      cc: CypressUtils.extractNamesFromEmails(ccEmails),
      bcc: CypressUtils.extractNamesFromEmails(bccEmails),
    };

    const transporter = nodemailer.createTransport({
      host: 'smtpHost',
      port: 'smtpPort',
      auth: {
        user: 'senderEmail',
        pass: 'senderPassword',
      },
    });

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  static installNewFontToSystem = () => {
    const fontFileNames = ['HurmeGeometricSansRegular.otf', 'anitasemisquare.ttf'];

    fontFileNames.forEach((fileName) => {
      Cypress.readFile(`../fonts/${fileName}`, 'binary').then((fontData) => {
        const fontBlob = Cypress.Blob.binaryStringToBlob(fontData);

        return new Promise((resolve, reject) => {
          const font = new FontFace(fileName, `url(${Cypress.URL.createObjectURL(fontBlob)})`);

          font
            .load()
            .then(() => {
              document.fonts.add(font);
              console.log(`The font ${font.family} was installed successfully.`);
              resolve();
            })
            .catch((error) => {
              console.error('Failed to load font:', error);
              reject(error);
            });
        });
      });
    });
  };

  // Function to extract names from email addresses
  static extractNamesFromEmails(emails) {
    const names = emails.map((email) => {
      const trimmedEmail = email.trim();
      const name = trimmedEmail.substring(0, trimmedEmail.indexOf('@')).replace('.', ' ');
      return {
        name: name,
        address: trimmedEmail,
      };
    });

    return names;
  }

  static logStep(status, details) {
  cy.then(() => {
    switch (status) {
      case 'pass':
        console.log(details);
        break;
      case 'fail':
        console.log(details).then(() => {
          throw new Error('Test step failed');
        });
        break;
      case 'skip':
        console.log(details).then(() => {
          Cypress.runner.stop();
        });
        break;
      default:
        console.log(details);
        break;
    }
  });
}


  static openFolder(folderPath, remoteLinuxHost = '', remoteLinuxUsername = '') {
    if (Cypress.platform === 'win32') {
      const command = `explorer "${folderPath}"`;
      cy.exec(command, { log: false });
    } else if (Cypress.platform === 'darwin') {
      // Execute macOS-specific command for local execution
      cy.exec(`open "${folderPath}"`, { log: false });
    } else if (Cypress.platform === 'linux') {
      let isRemoteExecution = false;
      const rmiServerHostname = Cypress.env('java.rmi.server.hostname');

      if (rmiServerHostname && rmiServerHostname !== '') {
        isRemoteExecution = true;
        console.log('Executing remotely');
      } else {
        console.log('Executing locally');
      }

      if (isRemoteExecution && remoteLinuxHost && remoteLinuxUsername) {
        if (folderPath.startsWith('\\\\')) {
          const shareCommand = `smbclient ${folderPath.replace(/\\/g, '/')}`;
          const sshCommand = `ssh ${remoteLinuxUsername}@${remoteLinuxHost} '${shareCommand}'`;
          cy.exec(sshCommand, { log: false });
        } else {
          const command = `xdg-open "${folderPath}"`;
          const sshCommand = `ssh ${remoteLinuxUsername}@${remoteLinuxHost} '${command}'`;
          cy.exec(sshCommand, { log: false });
        }
      } else {
        cy.exec(`xdg-open "${folderPath}"`, { log: false });
      }
    } else {
      throw new Error('Opening folder is not supported on this platform.');
    }
  }

  static generateMochawesomeReport() {
    // Get the required values from the UIConstantsHelper class or any other source
    const suiteCount = 1;
    const testCount = UIConstantHelper.PASSED_TC_COUNTER + UIConstantHelper.FAILED_TC_COUNTER + UIConstantHelper.SKIPPED_TC_COUNTER;
    const passCount = UIConstantHelper.PASSED_TC_COUNTER;
    const pendingCount = UIConstantHelper.SKIPPED_TC_COUNTER;
    const failureCount = UIConstantHelper.FAILED_TC_COUNTER;
    const startTime = UIConstantHelper.TEST_START_DATE;
    const endTime = UIConstantHelper.TEST_END_DATE;
    const duration = UIConstantHelper.TOTAL_DURATION;
    const projectRoot = Cypress.config('projectRoot');
    const testReportsFolderPath = path.join(projectRoot, 'test-Reports');
    // Generate the mochawesome report object
    const mochawesomeReport = {
      stats: {
        suites: suiteCount,
        tests: testCount,
        passes: passCount,
        pending: pendingCount,
        failures: failureCount,
        start: startTime,
        end: endTime,
        duration: duration,
      },
      results: [],
      suites: [],
      meta: {
        mochawesomeVersion: '3.1.0',
        mochawesomeOptions: {},
        mochawesomeCLIOptions: {},
        reportTitle: 'Automation Report | Securian Financial',
        favicon: 'https://assetlibrary.securian.com/content/dam/securian/web-assets/brand/favicons/favicon.ico',
        logo: 'https://www.securian.com/content/dam/securian/content-assets/cse/sf-logo-rgb-bk-wordmark.svg',
      },

      config: {
        reportDir: testReportsFolderPath,
        reportFilename: 'mochawesome-report.json',
      },
    };

    // Write the mochawesome report object to a JSON file
    const reportPath = 'reports/mochawesome-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(mochawesomeReport, null, 2));
    console.log('Mochawesome report generated:', reportPath);

    // Read custom CSS and JavaScript files
    const cssFilePath = path.join(__dirname, '..', '..', 'custom', 'css', 'custom-styles.css');
    const jsFilePath = path.join(__dirname, '..', '..', 'custom', 'js', 'custom-scripts.js');
    const customCss = fs.readFileSync(cssFilePath, 'utf8');
    const customJs = fs.readFileSync(jsFilePath, 'utf8');

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // Extract the date portion in the format 'YYYY-MM-DD'
    const timestamp = now.getTime(); // Get the current timestamp
    const reportName = `report_${formattedDate}_${timestamp}.html`;

    const htmlReportPath = path.join(UIConstantHelper.EXTENT_REPORT_FOLDER, reportName);
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mochawesome Report</title>
          <style>${customCss}</style>
          <script>${customJs}</script>
        </head>
        <body>
          <h1>Mochawesome Report</h1>
          <!-- Rest of the HTML report content -->
        </body>
      </html>
    `;
    fs.writeFileSync(htmlReportPath, htmlContent);
    console.log('Generated HTML report with custom CSS and JavaScript:', htmlReportPath);
  }
}

module.exports = CypressUtils;
