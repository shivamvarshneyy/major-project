// Hardcoded meal data (with images)
const meals = {
  breakfast: [
    { 
      name: "Oatmeal with Fruits", 
      calories: 250, 
      ingredients: "Oats, Milk, Berries, Banana", 
      image: "oatmeal.jpeg" // Ensure this is the correct image path
    },
    { 
      name: "Scrambled Eggs with Spinach", 
      calories: 300, 
      ingredients: "Eggs, Spinach, Olive oil", 
      image: "scrambled-eggs.jpeg" // Ensure this is the correct image path
    }
  ],
  lunch: [
    { 
      name: "Chicken Salad", 
      calories: 400, 
      ingredients: "Chicken, Lettuce, Tomatoes, Olive oil", 
      image: "chicken-salad.jpeg" // Ensure this is the correct image path
    },
    { 
      name: "Vegetarian Wrap", 
      calories: 350, 
      ingredients: "Whole wheat wrap, Hummus, Avocado, Cucumber", 
      image: "vegetarian-wrap.jpeg" // Ensure this is the correct image path
    }
  ],
  dinner: [
    { 
      name: "Grilled Salmon", 
      calories: 500, 
      ingredients: "Salmon, Olive oil, Broccoli, Quinoa", 
      image: "grilled-salmon.jpeg" // Ensure this is the correct image path
    },
    { 
      name: "Tofu Stir Fry", 
      calories: 450, 
      ingredients: "Tofu, Bell peppers, Broccoli, Soy sauce", 
      image: "tofu-stirfry.jpeg" // Ensure this is the correct image path
    }
  ]
};

// Generate meal plan based on user inputs
function generateMealPlan() {
  const age = document.getElementById('age').value;
  const heightFeet = document.getElementById('height-feet').value;
  const heightInches = document.getElementById('height-inches').value;
  const weight = document.getElementById('weight').value;
  const gender = document.getElementById('gender').value;
  const activityLevel = document.getElementById('activity-level').value;
  const goal = document.getElementById('goal').value;

  // Calculate Total Daily Energy Expenditure (TDEE) - a simplified version
  const tdee = calculateTDEE(age, heightFeet, heightInches, weight, gender, activityLevel);

  // Adjust calorie goal based on user preference (lose, maintain, gain)
  let targetCalories = tdee;
  if (goal === "lose") targetCalories -= 500;  // Reduce calories for weight loss
  if (goal === "gain") targetCalories += 500; // Increase calories for weight gain

  // Generate meal plan based on target calories
  const mealPlan = createMealPlan(targetCalories);

  // Display the meal plan
  const mealPlanOutput = document.getElementById('meal-plan-output');
  mealPlanOutput.innerHTML = mealPlan;
  document.getElementById('meal-plan-section').classList.remove('hidden');
  document.getElementById('form-section').classList.add('hidden');
}

// Calculate Total Daily Energy Expenditure (TDEE)
function calculateTDEE(age, heightFeet, heightInches, weight, gender, activityLevel) {
  const height = (parseInt(heightFeet) * 12 + parseInt(heightInches)) * 2.54; // Convert to cm
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  
  let activityFactor = 1.2;
  if (activityLevel === 'lightly-active') activityFactor = 1.375;
  if (activityLevel === 'moderately-active') activityFactor = 1.55;
  if (activityLevel === 'very-active') activityFactor = 1.725;
  
  return bmr * activityFactor;
}

// Create meal plan based on target calories
function createMealPlan(targetCalories) {
  let plan = '';
  let totalCalories = 0;

  // Loop through meals (breakfast, lunch, dinner) and add meals to plan
  ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
    const mealOptions = meals[mealType];
    const selectedMeal = mealOptions[Math.floor(Math.random() * mealOptions.length)];
    totalCalories += selectedMeal.calories;
    plan += `
      <h3>${mealType.charAt(0).toUpperCase() + mealType.slice(1)} 
        <i class="fas fa-utensils"></i>  <!-- Font Awesome Icon -->
      </h3>
      <p><strong>${selectedMeal.name}</strong> - ${selectedMeal.calories} calories</p>
      <p>Ingredients: ${selectedMeal.ingredients}</p>
      <img src="${selectedMeal.image}" alt="${selectedMeal.name}" style="width: 150px; height: 150px; object-fit: cover;">
    `;
  });

  plan += `<h3>Total Calories: ${totalCalories} kcal</h3>`;
  return plan;
}

// Reset form
function resetForm() {
  document.getElementById('details-form').reset();
  document.getElementById('meal-plan-section').classList.add('hidden');
  document.getElementById('form-section').classList.remove('hidden');
}
