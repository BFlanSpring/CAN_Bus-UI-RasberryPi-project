const template = document.getElementById("hour-row-template");
const container = document.getElementById("hourly-data");

// Define a function to update the current_time variable with hours and minutes
function updateCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    current_time = `${formattedHours}:${formattedMinutes}`;
}

// Call the function to initialize the current_time variable
updateCurrentTime();

// Set an interval to update the current_time variable every minute (60000 milliseconds)
setInterval(updateCurrentTime, 60000); // Update every minute

// Get the current time
const currentTime = new Date();
const currentHour = currentTime.getHours();

// Loop through the hourly_data_list
for (let i = 0; i < 5; i++) {
    // Calculate the hour for this row
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

// You might want to implement the following helper functions if not already done:

// Function to format the date as needed
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
