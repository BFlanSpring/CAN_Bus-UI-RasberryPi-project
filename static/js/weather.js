const template = document.getElementById("hour-row-template");
const container = document.getElementById("hourly-data");

// Function to update and display the current time
function updateCurrentTime() {
    const currentTimeElement = document.getElementById("current-time");

    // Get the current time
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Format hours, minutes, and seconds with leading zeros
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    // Display the time in the element
    currentTimeElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Call the function to initialize the current time
updateCurrentTime();

// Function to update the first row of hourly data table based on the current hour
function updateFirstRow() {
    const firstRow = container.querySelector(".hour-row");

    // Get the current hour
    const currentHour = new Date().getHours();

    // Find the data for the current hour
    const currentHourData = hourly_data_list.find(data => {
        const hour = new Date(data.time).getHours();
        return hour === currentHour;
    });

    if (currentHourData) {
        // Fill in the template with the data for the current hour
        firstRow.querySelector("[data-day]").textContent = formatDate(currentHourData.time);
        firstRow.querySelector("[data-time]").textContent = formatTime(currentHourData.time);
        firstRow.querySelector("[data-icon]").src = getWeatherIcon(currentHourData.weathercode);
        firstRow.querySelector("[data-temp-low]").textContent = currentHourData.temperature_2m;
        firstRow.querySelector("[data-precip]").textContent = currentHourData.precipitation;
        firstRow.querySelector("[data-wind]").textContent = currentHourData.windspeed_10m;
    }
}

// Loop through the hourly_data_list and populate rows
for (let i = 0; i < 5; i++) {
    // Calculate the hour for this row
    const currentHour = new Date().getHours();
    const hour = (currentHour + i) % 24;

    // Clone the template content for each hour
    const hourTemplate = template.content.cloneNode(true);

    // Fill in the template with the data for the current hour
    const hourData = hourly_data_list[i];
    hourTemplate.querySelector("[data-day]").textContent = formatDate(hourData.time);
    hourTemplate.querySelector("[data-time]").textContent = formatTime(hourData.time);
    hourTemplate.querySelector("[data-icon]").src = getWeatherIcon(hourData.weathercode);
    hourTemplate.querySelector("[data-temp-low]").textContent = hourData.temperature_2m;
    hourTemplate.querySelector("[data-precip]").textContent = hourData.precipitation;
    hourTemplate.querySelector("[data-wind]").textContent = hourData.windspeed_10m;

    // Append the populated template to the container
    container.appendChild(hourTemplate);
}

// Set an interval to update the current time and first row every second (1000 milliseconds)
setInterval(() => {
    updateCurrentTime(); // Update the current time
    const currentHour = new Date().getHours();
    if (currentHour % 1 === 0) {
        updateFirstRow(); // Update the first row when hour changes
    }
}, 1000);


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Function to format the time as needed
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
}

function getWeatherIcon(weatherCode) {
    let weatherIcon = 'default.png'; // Default icon URL

    // Map weather codes to icon filenames
    if (weatherCode = 0 ) {
        weatherIcon = 'sunny.png';
    } else if (weatherCode = 1 | 2 | 3) {
        weatherIcon = 'partly-cloudy.png';
    } else if (weatherCode >= 5 && weatherCode <= 100) {
        weatherIcon = 'rain.png';
    }

    return `static/assets/Images/${weatherIcon}`;
}
