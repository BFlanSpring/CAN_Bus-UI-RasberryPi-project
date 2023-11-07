document.addEventListener("DOMContentLoaded", initializeGauges);

function initializeGauges() {
    const gaugeContainer = document.getElementById("gaugeContainer");
    if (!gaugeContainer) {
        return;
    }
    const gaugeImages = {
        "Boost_Pressure": new Image(),
        "Engine_Temp": new Image(),
        "Fuel_Pressure": new Image(),
        "O2": new Image(),
        "Oil_Pressure": new Image(),
        "Oil_Temp": new Image(),
    };

    // Set the source URLs for the images
    gaugeImages["Boost_Pressure"].src = "static/assets/Images/Boost_Pressure.png";
    gaugeImages["Engine_Temp"].src = "static/assets/Images/Engine_Temp.png";
    gaugeImages["Fuel_Pressure"].src = "static/assets/Images/Fuel_Pressure.png";
    gaugeImages["O2"].src = "static/assets/Images/O2.png";
    gaugeImages["Oil_Pressure"].src = "static/assets/Images/Oil_Pressure.png";
    gaugeImages["Oil_Temp"].src = "static/assets/Images/Oil_Temp.png";

    const gaugeTypes = {
        "Engine_Temp": {
            image: gaugeImages["Engine_Temp"],
            unit: "°F", 
            title: "Engine Temp",
            fill_color: "rgba(135, 213, 225, 0.9)",
            safeLevel: "215",
            warningLevel: "235"
        },
        "Boost_Pressure": {
            image: gaugeImages["Boost_Pressure"],
            unit: "PSI",
            title: "Boost Pressure",
            safeLevel: "15",
            warningLevel: "25"
        },
        "Fuel_Pressure": {
            image: gaugeImages["Fuel_Pressure"],
            unit: "PSI",
            title: "Fuel Pressure",
            safeLevel: "40",
            warningLevel: "60"
        },
        "O2": {
            image: gaugeImages["O2"],
            unit: "Ratio 1",
            title: "Air/Fuel",
            safeLevel: "13.8",
            warningLevel: "14.5"
        },
        "Oil_Pressure": {
            image: gaugeImages["Oil_Pressure"],
            unit: "PSI", 
            title: "Oil Pressure",
            safeLevel: "50",
            warningLevel: "110"
        },
        "Oil_Temp": {
            image: gaugeImages["Oil_Temp"],
            unit: "°F",
            title: "Oil Temp",
            safeLevel: "180",
            warningLevel: "225"
            
        }
    };
    

    // Create an object to keep track of canvas elements
    const canvasElements = {};

    function drawNumber(context, x, y, value, unit) {
        const boxWidth = 200; // Width of the background box
        const boxHeight = 70; // Height of the background box
        const boxX = x - boxWidth / 2; // Adjust the X coordinate as needed
        const boxY = y - boxHeight / 2; // Adjust the Y coordinate as needed
        const cornerRadius = 10; // Adjust the corner radius as needed
    
        // Draw the background box with rounded corners
        context.fillStyle = "rgba(224, 142, 38, 1)"; // Background color with alpha for transparency
        context.beginPath();
        context.moveTo(boxX + cornerRadius, boxY);
        context.lineTo(boxX + boxWidth - cornerRadius, boxY);
        context.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + cornerRadius);
        context.lineTo(boxX + boxWidth, boxY + boxHeight - cornerRadius);
        context.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - cornerRadius, boxY + boxHeight);
        context.lineTo(boxX + cornerRadius, boxY + boxHeight);
        context.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - cornerRadius);
        context.lineTo(boxX, boxY + cornerRadius);
        context.quadraticCurveTo(boxX, boxY, boxX + cornerRadius, boxY);
        context.closePath();
        context.fill();
    
        context.fillStyle = "white";
        context.font = "50px Arial";
        context.textAlign = "center";
        context.fillText(value.toString(), x, y+15);
    }
    
    

    function drawTitle(context, x, y, title) {
        context.fillStyle = "white";
        context.font = "30px Arial"; // Adjust the font size as needed
        context.textAlign = "center";
        context.fillText(title, x, y);
    }


    function drawGaugeAndNumber(value, gaugeType) {
        const container = document.getElementById("gaugeContainer");

        // Check if the canvas for this gauge type already exists and clear it
        if (canvasElements[gaugeType]) {
            container.removeChild(canvasElements[gaugeType]);
        }

        const canvas = document.createElement("canvas");
        canvas.id = `${gaugeType.toLowerCase()}Canvas`;
        canvas.width = 300;
        canvas.height = 300;

        // Store the canvas element
        canvasElements[gaugeType] = canvas;

        container.appendChild(canvas);

        const ctx = document.getElementById(canvas.id).getContext("2d");

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 26;

        const image = gaugeTypes[gaugeType].image; // Reuse the preloaded image

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI, 0);
        ctx.strokeStyle = "lightgray";
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.beginPath();
        const startAngle = Math.PI;
        const endAngle = Math.PI + (value / (gaugeTypes[gaugeType].warningLevel * 1.3)) * Math.PI;

        const gaugeColor = calculateGaugeColor(value, gaugeTypes[gaugeType].safeLevel, gaugeTypes[gaugeType].warningLevel); // Calculate the gauge color
        ctx.arc(centerX, centerY, radius + 18, startAngle, endAngle);
        ctx.strokeStyle = gaugeColor;
        ctx.lineWidth = 17;
        ctx.stroke();

        drawTitle(ctx, centerX, centerY+50, gaugeTypes[gaugeType].title)
        drawNumber(ctx, centerX, centerY + 105, value);
        

        const imageSize = 115;
        const imageOffsetY = 40;
        const imageX = centerX - imageSize / 2;
        const imageY = centerY - imageSize / 2 - imageOffsetY;

        // Draw the preloaded image
        ctx.drawImage(image, imageX, imageY, imageSize, imageSize);
    }

    function calculateGaugeColor(value, safeLevel, warningLevel) {
        if (value <= safeLevel) {
            // Green color for safe level
            return "green";
        } else if (value <= warningLevel) {
            // Yellow color for warning level
            const ratio = (value - safeLevel) / (warningLevel - safeLevel);
            return `rgba(255, ${255 * (1 - ratio)}, 0, 1)`; // Transition to yellow
        } else {
            // Red color for dangerous level
            const ratio = (value - warningLevel) / (100 - warningLevel);
            return `rgba(255, 0, 0, 1)`; // Transition to red
        }
    }
    

    // Example of creating a new gauge with a new ctx based on gauge type
    let ecuValue1 =235;
    let ecuValue2 = 20;
    let ecuValue3 = 30;
    let ecuValue4 = 13.2;
    let ecuValue5 = 180;
    let ecuValue6 = 112;



    const logButton = document.getElementById("logButton");
    let is_Logging_Enabled = false;

    logButton.addEventListener("click", () => {
        is_Logging_Enabled = !is_Logging_Enabled; // Toggle the logging state
        logButton.textContent = is_Logging_Enabled ? "Stop Logging" : "Log Data";
        const message = is_Logging_Enabled ? "Logging is now enabled" : "Logging is now disabled";

        // Send an AJAX request to the server to update the logging state
        fetch("/update-logging", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isLoggingEnabled: is_Logging_Enabled }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error("Error updating logging state:", error);
        });
    });

    function updateECUValues() {
        const ecuUpdateInterval = 100;
        setTimeout(updateECUValues, ecuUpdateInterval);

        // Update each gauge separately
        drawGaugeAndNumber(ecuValue1, "Engine_Temp");
        drawGaugeAndNumber(ecuValue2, "Boost_Pressure");
        drawGaugeAndNumber(ecuValue3, "Fuel_Pressure");
        drawGaugeAndNumber(ecuValue4, "O2");
        drawGaugeAndNumber(ecuValue5, "Oil_Temp");
        drawGaugeAndNumber(ecuValue6, "Oil_Pressure");

        if (is_Logging_Enabled) {
            // Log the data to your server
            logDataToServer(ecuValue1, ecuValue2, ecuValue3, ecuValue4, ecuValue5, ecuValue6);
        }
    }

    function logDataToServer(value1, value2, value3, value4, value5, value6) {
        // Create a JSON object with the data
        const data = {
            Engine_Temp: value1,
            Boost_Pressure: value2,
            Fuel_Pressure: value3,
            O2: value4,
            Oil_Temp: value5,
            Oil_Pressure: value6,
        };

        // Send a POST request to your server to log the data
        fetch("/log-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data logged successfully:", data);
            })
            .catch((error) => {
                console.error("Error logging data:", error);
            });
    }

    // Start updating with ECU values
    updateECUValues();
}

    // function updateECUValues() {
    //     const ecuUpdateInterval = 10;
    //     setTimeout(updateECUValues, ecuUpdateInterval);

    //     // Update each gauge separately
    //     drawGaugeAndNumber(ecuValue1, "Engine_Temp");
    //     drawGaugeAndNumber(ecuValue2, "Boost_Pressure");
    //     drawGaugeAndNumber(ecuValue3, "Fuel_Pressure");
    //     drawGaugeAndNumber(ecuValue4, "O2");
    //     drawGaugeAndNumber(ecuValue5, "Oil_Temp");
    //     drawGaugeAndNumber(ecuValue6, "Oil_Pressure");

    // }

    // Start updating with ECU values

