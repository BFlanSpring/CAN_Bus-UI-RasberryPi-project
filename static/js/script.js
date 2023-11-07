

const canvas = document.getElementById("gaugeCanvas");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 26;

const gaugeImages = {
    "Boost_Pressure": "static/assets/Images/Boost_Pressure.png",
    "Engine_Temp": "static/assets/Images/Engine_Temp.png",
    "Fuel_Pressure": "static/assets/Images/Fuel_Pressure.png",
    "O2": "static/assets/Images/O2.png",
    "Oil_Pressure": "static/assets/Images/Oil_Pressure.png",
    "Oil_Temp": "static/assets/Images/Oil_Temp.png",
}

function drawNumber(context, x, y, value) {
    context.fillStyle = "white";
    context.font = "30px Arial"; // Adjust the font size and style as needed
    context.textAlign = "center";
    context.fillText(value.toString(), x, y);
}

function drawGaugeAndNumber(value) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gauge background (half-circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius , Math.PI, 0);
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 8; // Adjust this value for the thickness of the gauge
    ctx.stroke();

    // Draw the gauge value arc
    ctx.beginPath();
    const startAngle = Math.PI; // Start at the same position as the half-circle background
    const endAngle = Math.PI + (value / 100) * Math.PI; // End at the desired value position
    ctx.arc(centerX, centerY, radius + 18, startAngle, endAngle);
    ctx.strokeStyle = "green"; // Adjust the color for the gauge value
    ctx.lineWidth = 17; // Adjust this value for the thickness of the gauge
    ctx.stroke();

    // Draw the value using the drawNumber function
    drawNumber(ctx, centerX, centerY + 30, value); // Adjust the position (centerY + 60) for proper placement
    const imageSize = 90;
    const imageOffsetY= 20;
    const image = new Image();
    const imageX = centerX - imageSize / 2;
    const imageY = centerY - imageSize / 2 - imageOffsetY;
    image.src = "static/assets/Images/Engine_Temp.png"; // Pass the image URL as a parameter
    image.onload = function () {
        console.log("Image Loaded");
        // Once the image is loaded, draw it above the number
        ctx.drawImage(image, imageX, imageY, imageSize, imageSize); // Adjust the position as needed
    };
}

// Simulated value from ECU CAN bus
let ecuValue = 30;

function updateECUValue() {
    const ecuUpdateInterval = 1000;
    setTimeout(updateECUValue, ecuUpdateInterval);
    // Simulate updating the value from the ECU CAN bus
    /////////////////////////// ecuValue = (ecuValue + 1) % 101;//////////////////////////////////////////////////////////////

    // Update the gauge and number display with the ECU value
    drawGaugeAndNumber(ecuValue);

    requestAnimationFrame(updateECUValue);
}

// Start updating with ECU values
updateECUValue();





/////////////////////////////////////////////////////////////////////////


// Function to create a gauge canvas with an associated image URL
// document.addEventListener('DOMContentLoaded', function () {

// function createGaugeCanvas(canvasId, imageUrl) {
//     const canvas = document.getElementById(canvasId);
//     if (!canvas) {
//         console.error(`Canvas element with ID '${canvasId}' not found.`);
//         return null;
//     }
//     const ctx = canvas.getContext("2d");
//     const centerX = canvas.width / 2;
//     const centerY = canvas.height / 2;
//     const radius = canvas.width / 2 - 26;

//     return { canvas, ctx, centerX, centerY, radius, imageUrl };
// }

// // Function to draw the gauge background
// function drawGaugeBackground(ctx) {
//     ctx.beginPath();
//     ctx.arc(ctx.centerX, ctx.centerY, ctx.radius, Math.PI, 0);
//     ctx.strokeStyle = "lightgray";
//     ctx.lineWidth = 8;
//     ctx.stroke();
// }

// // Function to draw the gauge value arc
// function drawGaugeValue(ctx, value) {
//     const startAngle = Math.PI;
//     const endAngle = Math.PI + (value / 100) * Math.PI;
//     ctx.beginPath();
//     ctx.arc(ctx.centerX, ctx.centerY, ctx.radius + 18, startAngle, endAngle);
//     ctx.strokeStyle = "green";
//     ctx.lineWidth = 17;
//     ctx.stroke();
// }

// // Function to draw the gauge number
// function drawGaugeNumber(ctx, value) {
//     ctx.fillStyle = "white";
//     ctx.font = "30px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText(value.toString(), ctx.centerX, ctx.centerY + 30);
// }

// // Function to draw an image on the gauge canvas
// function drawGaugeImage(ctx, imageUrl) {
//     const imageSize = 90;
//     const imageOffsetY = 20;
//     const imageX = ctx.centerX - imageSize / 2;
//     const imageY = ctx.centerY - imageSize / 2 - imageOffsetY;

//     const image = new Image();
//     image.src = imageUrl;
//     image.onload = function () {
//         ctx.drawImage(image, imageX, imageY, imageSize, imageSize);
//     };
// }

// // Function to update a gauge with a new value
// function updateGauge(canvasData, value) {
//     const { ctx, imageUrl } = canvasData;

//     // Clear the canvas
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//     // Draw gauge components
//     drawGaugeBackground(ctx);
//     drawGaugeValue(ctx, value);
//     drawGaugeNumber(ctx, value);
//     drawGaugeImage(ctx, imageUrl);
// }

// // Example usage:
// // const engineTempCanvas = createGaugeCanvas('engineTempCanvas', 'static/assets/Images/Engine_Temp.png');
// // const boostPressureCanvas = createGaugeCanvas('boostPressureCanvas', 'static/assets/Images/Boost_Pressure.png');

// // Simulated ECU values


// function updateECUValues() {
//     // Simulate updating ECU values
//     engineTempValue = (engineTempValue + 1) % 101;
//     boostPressureValue = (boostPressureValue + 1) % 101;

//     // Update gauges with new values
//     updateGauge(engineTempCanvas, engineTempValue);
//     updateGauge(boostPressureCanvas, boostPressureValue);

//     requestAnimationFrame(updateECUValues);
// }

// // Start updating ECU values
// updateECUValues();

// // You can add additional code here to handle user interactions and dynamically create/update gauges as needed.

// });