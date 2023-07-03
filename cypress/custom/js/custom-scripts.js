// Create the splash page container
const splashPage = document.createElement('div');
splashPage.id = 'splash-page';
splashPage.style.width = '100%';
splashPage.style.height = '100%';
splashPage.style.position = 'fixed';
splashPage.style.top = '0';
splashPage.style.left = '0';
splashPage.style.backgroundColor = '#f9f9f9';
splashPage.style.display = 'flex';
splashPage.style.flexDirection = 'column';
splashPage.style.justifyContent = 'center';
splashPage.style.alignItems = 'center';

// Create the main logo element
const mainLogo = document.createElement('img');
mainLogo.src = 'https://www.securian.com/content/dam/securian/content-assets/cse/sf-logo-rgb-bk-wordmark.svg';
mainLogo.alt = 'Main Logo';
mainLogo.style.width = '150px';
splashPage.appendChild(mainLogo);

// Create the title element
const titleElement = document.createElement('h1');
titleElement.textContent = 'Welcome to Securian Financial';
titleElement.style.textAlign = 'center';
titleElement.style.fontFamily = 'Arial, sans-serif';
splashPage.appendChild(titleElement);

// Create the subtitle element
const subtitleElement = document.createElement('h2');
subtitleElement.textContent = 'Automation Execution Report';
subtitleElement.style.textAlign = 'center';
subtitleElement.style.fontFamily = 'Arial, sans-serif';
splashPage.appendChild(subtitleElement);

// Create the watch container
const watchContainer = document.createElement('div');
watchContainer.style.width = '300px';
watchContainer.style.height = '300px';
watchContainer.style.marginTop = '40px';
watchContainer.style.position = 'relative';

// Create the watch background
const watchBackground = document.createElement('div');
watchBackground.style.width = '100%';
watchBackground.style.height = '100%';
watchBackground.style.backgroundColor = '#fff';
watchBackground.style.borderRadius = '50%';
watchBackground.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
watchBackground.style.position = 'relative';

// Create the second logo element
const secondLogo = document.createElement('img');
secondLogo.src = 'https://www.securian.com/content/dam/securian/web-assets/brand/Securian_Emblem_RGB.svg';
secondLogo.alt = 'Second Logo';
secondLogo.style.width = '80px';
secondLogo.style.position = 'absolute';
secondLogo.style.top = 'calc(50% - 40px)';
secondLogo.style.left = 'calc(50% - 40px)';
secondLogo.style.animation = 'logo-rotation 6s infinite linear';
watchBackground.appendChild(secondLogo);

// Create the watch numbers
for (let i = 1; i <= 12; i++) {
  const number = document.createElement('div');
  number.textContent = i;
  number.style.position = 'absolute';
  number.style.top = '50%';
  number.style.left = '50%';
  number.style.transformOrigin = '50% 0';
  number.style.transform = `rotate(${i * 30}deg) translateY(-129px)`;
  number.style.fontFamily = 'Arial, sans-serif';
  number.style.fontSize = '18px';
  number.style.fontWeight = 'bold';
  number.style.color = '#000';
  number.style.textAlign = 'center';
  watchBackground.appendChild(number);
}
// Create the hour hand
const hourHand = document.createElement('div');
hourHand.style.width = '4px';
hourHand.style.height = '70px';
hourHand.style.backgroundColor = '#000';
hourHand.style.position = 'absolute';
hourHand.style.top = 'calc(50% - 70px)';
hourHand.style.left = 'calc(50% - 2px)';
hourHand.style.transformOrigin = '50% 70%';
watchBackground.appendChild(hourHand);

// Create the minute hand
const minuteHand = document.createElement('div');
minuteHand.style.width = '2px';
minuteHand.style.height = '90px';
minuteHand.style.backgroundColor = '#000';
minuteHand.style.position = 'absolute';
minuteHand.style.top = 'calc(50% - 90px)';
minuteHand.style.left = 'calc(50% - 1px)';
minuteHand.style.transformOrigin = '50% 90%';
watchBackground.appendChild(minuteHand);

// Create the second hand
const secondHand = document.createElement('div');
secondHand.style.width = '1px';
secondHand.style.height = '100px';
secondHand.style.backgroundColor = '#ff0000';
secondHand.style.position = 'absolute';
secondHand.style.top = 'calc(50% - 121px)';
secondHand.style.left = 'calc(50% - 3.5px)';
secondHand.style.transformOrigin = '50% 100%';
watchBackground.appendChild(secondHand);

// Update the current time
function updateTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  hourHand.style.transform = `rotate(${(hours * 30) + (minutes * 0.5)}deg)`;
  minuteHand.style.transform = `rotate(${(minutes * 6) + (seconds * 0.1)}deg)`;
  secondHand.style.transform = `rotate(${seconds * 6}deg)`;

  setTimeout(updateTime, 1000);
}

updateTime();



// Append the watch background to the watch container
watchContainer.appendChild(watchBackground);

// Append the watch container to the splash page
splashPage.appendChild(watchContainer);

// Append the splash page to the document body
document.body.appendChild(splashPage);

// Simulate loading time
setTimeout(() => {
  splashPage.style.display = 'none';
}, 10000); // Change the duration (in milliseconds) as per your preference