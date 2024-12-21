let currentStep = 1;
let meals = [];
let totalCalories = 0;

function nextStep() {
    // Validate the current step's inputs before moving to the next step
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const inputs = currentStepElement.querySelectorAll('input, select');
    let valid = true;

    // Check if all required inputs are filled
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            valid = false;
        }
    });

    if (!valid) {
        alert("Please fill in all required fields.");
        return; // Stop the function if inputs are invalid
    }

    // Hide current step
    currentStepElement.style.display = 'none';

    // Increment step
    currentStep++;

    // Show next step
    const nextStepElement = document.getElementById(`step${currentStep}`);
    if (nextStepElement) {
        nextStepElement.style.display = 'block';
    }

    // If we are on the last step, show the confirmation message
    if (currentStep === 3) {
        const name = document.getElementById('name').value;
        document.getElementById('displayName').innerText = name;
    }
}

function finishSetup() {
    // Hide setup section and show dashboard
    document.getElementById('setup').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

    // Display user name and calorie goal in the dashboard
    const name = document.getElementById('name').value;
    const calorieGoal = document.getElementById('calorieGoal').value;
    document.getElementById('userName').innerText = name;
    document.getElementById('dailyGoal').innerText = calorieGoal;
}

function logMeal() {
    const mealName = document.getElementById('mealName').value;
    const mealCalories = parseInt(document.getElementById('mealCalories').value, 10);

    if (mealName && mealCalories) {
        meals.push({ name: mealName, calories: mealCalories });
        totalCalories += mealCalories;

        // Update the displayed total calories consumed
        document.getElementById('caloriesConsumed').innerText = totalCalories;

        // Display the meal in the meal list
        const mealList = document.getElementById('mealList');
        const listItem = document.createElement('li');
        listItem.textContent = `${mealName}: ${mealCalories} kcal`;
        mealList.appendChild(listItem);

        // Clear input fields
        document.getElementById('mealName').value = '';
        document.getElementById('mealCalories').value = '';

        // Check if total calories reached the goal
        const calorieGoal = parseInt(document.getElementById('dailyGoal').innerText, 10);
        if (totalCalories >= calorieGoal) {
            alert("You've reached your daily calorie goal! Click to download your meal log.");
            generatePDF();
        }
    } else {
        alert("Please enter a meal name and calories.");
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Meal Log", 10, 10);
    meals.forEach((meal, index) => {
        doc.text(`${index + 1}. ${meal.name}: ${meal.calories} kcal`, 10, 20 + (index * 10));
    });
    doc.text(`Total Calories: ${totalCalories} kcal`, 10, 20 + (meals.length * 10));

    doc.save("meal-log.pdf");
}