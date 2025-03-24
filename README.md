# Cook Master - Your AI-Powered Recipe Hub

Cook Master is a mobile application built with React Native and managed by Expo, designed to revolutionize your cooking experience. Discover a world of culinary inspiration with our extensive recipe library, let our AI Recipe Generator create personalized recipes based on your ingredients and preferences, or use our innovative Image-to-Recipe feature to identify ingredients in a photo and suggest corresponding recipes!

**Key Features:**

- **Extensive Recipe Library:** Explore a vast, well-organized collection of recipes covering diverse cuisines, dietary needs, and skill levels. Each recipe includes:

  - Detailed, step-by-step instructions.
  - Complete ingredient lists with accurate measurements.
  - High-quality, mouthwatering photos.
  - User ratings and reviews.

- **AI Recipe Generator:** Unleash your culinary creativity with our powerful AI Recipe Generator. Simply input:

  - Available ingredients.
  - Dietary restrictions (e.g., vegetarian, vegan, gluten-free).
  - Desired cuisine (e.g., Italian, Mexican, Asian).
  - Preferred cooking time.
  - The AI will generate a unique recipe tailored to your specifications, complete with instructions and an estimated nutritional breakdown.

- **Image-to-Recipe (AI-Powered):** Take a photo of ingredients using the in-app camera, and our intelligent AI will:

  - Identify the ingredients in the image.
  - Suggest recipes that utilize those ingredients.
  - Offer recipe variations based on the detected ingredients.
  - Provide potential substitutions if certain ingredients are missing.

- **User-Friendly Interface:** Navigate effortlessly through the app with a clean, intuitive, and responsive design. Enjoy a seamless experience on both iOS and Android devices.
- **Expo Managed:** Leveraging the Expo platform for a simplified and efficient development workflow, allowing for faster iteration and deployment.
- **Recipe Saving & Collections:** Save your favorite recipes to your personal collection for easy access. Organize your recipes into custom collections based on cuisine, meal type, or occasion.
- **Meal Planning:** Plan your meals for the week with our integrated meal planner. Add recipes to specific days and meals, and generate a consolidated shopping list.
- **Smart Shopping Lists:** Automatically generate shopping lists based on the recipes you've selected. The shopping list intelligently groups ingredients by category for efficient grocery shopping. You can also manually add items to the list.
- **Offline Access:** Access your saved recipes and meal plans even without an internet connection.
- **Search & Filtering:** Easily find the perfect recipe using our powerful search and filtering capabilities. Filter by ingredients, cuisine, dietary restrictions, cooking time, and more.

**Tech Stack:**

- **React Native:** Building cross-platform mobile applications with a native look and feel.
- **Expo:** Streamlining React Native development with a comprehensive set of tools and services.
- **Redux:** Managing application state for predictable and efficient data flow.
- **Redux Persist:** Presisting app state across app restarts, even offline.
- **Axios:** Making HTTP requests to our backend API and external services.
- **Styled Components:** Writing CSS-in-JS for maintainable and reusable styling.
- **Expo Router:** Managing navigation between screens within the app using the file base approach.
- **Supabase:** Provides database services and authentication
- **OpenAI API:** Powering the AI Recipe Generator and potentially assisting with ingredient-based recipe suggestions with state-of-the-art natural language processing. Hosted on a serverless function using Netlify Functions.
- **Computer Vision API:** Powering the Image-to-Recipe feature.custom-trained model.
- **Expo-Camera:** Facilitates taking pictures from within the application.

**Architecture:**

The app follows a modular architecture, separating concerns into distinct components:

- **Components:** Reusable UI elements such as recipe cards, ingredient lists, and buttons.
- **Screens:** Individual screens of the app, such as the recipe library, recipe details, AI Recipe Generator, and the Camera Screen.
- **Redux Store:** Manages application state, including user authentication, saved recipes, shopping lists, and potentially image processing results.
- **API Service:** Handles communication with the backend API for fetching recipes, generating recipes, user authentication, and interacting with the Computer Vision API.
- **Camera Service:** Handles camera access, image capture, and image processing tasks.
- **Helpers/Utils:** Utility functions for formatting data, handling errors, and other common tasks.

**API Endpoints:**

- `/recipes`: Fetch a list of recipes (GET).
- `/recipes/:id`: Fetch a specific recipe by ID (GET).
- `/ai-generate`: Generate a recipe based on provided ingredients and preferences (POST). This endpoint calls the Netlify Function that interacts with the OpenAI API.
- `/users/register`: Register a new user (POST).
- `/users/login`: Authenticate an existing user (POST).
- `/users/favorites`: Fetch a user's favorite recipes (GET).
- `/users/favorites/:recipeId`: Add or remove a recipe from a user's favorites (POST/DELETE).
- `/image-to-recipe`: Send an image to the server for ingredient identification and recipe suggestions (POST). This endpoint would trigger the AWS Lambda function for image processing and AI interaction.

**Getting Started:**

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:Hashmozy/cook-master.git
   cd cook-master
   ```

2. **Install Dependencies:**

   ```bash
   npm install  # or yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```
   OPENAI_API_KEY=[YOUR_OPENAI_API_KEY]
   SUPABASE_URL=[YOUR_SUPABASE_URL]
   SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
   COMPUTER_VISION_API_KEY=[YOUR_COMPUTER_VISION_API_KEY]
   COMPUTER_VISION_API_URL=[YOUR_COMPUTER_VISION_API_URL] #The URL where your vision API is hosted
   ```

   _Replace the bracketed placeholders with your actual API keys and Supabase credentials._ _The `COMPUTER*VISION*_` variables are only needed if your Computer Vision API requires authentication.\*

4. **Start the Expo Development Server:**

   ```bash
   npx expo start
   ```

   This will open the Expo Developer Tools in your web browser. You can then use the QR code to run the app on your iOS or Android device, or use an emulator.

5. **Database Setup (Supabase):**

   - Create a Supabase project at [supabase.com](https://supabase.com).
   - Create the necessary tables in your Supabase database. Example Schema:

     ```sql
     -- Users table
     CREATE TABLE users (
         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         created_at TIMESTAMPTZ DEFAULT NOW()
     );

     -- Recipes table
     CREATE TABLE recipes (
         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
         title VARCHAR(255) NOT NULL,
         ingredients TEXT NOT NULL,
         instructions TEXT NOT NULL,
         image_url VARCHAR(255),
         created_at TIMESTAMPTZ DEFAULT NOW()
     );

     -- User favorites
     CREATE TABLE user_favorites (
         user_id UUID REFERENCES users(id),
         recipe_id UUID REFERENCES recipes(id),
         PRIMARY KEY (user_id, recipe_id)
     );

     --  Example of generated recipe by OpenAI
     CREATE TABLE generated_recipes (
         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
         title VARCHAR(255) NOT NULL,
         ingredients TEXT NOT NULL,
         instructions TEXT NOT NULL,
         user_prompt TEXT,
         created_at TIMESTAMPTZ DEFAULT NOW()
     );
     ```

   - Enable Row Level Security (RLS) as needed for data privacy and security. Create policies to control which users can access and modify data.

6. **Running on iOS or Android:**

   Follow the instructions provided by Expo CLI after running `npx expo start`. You'll likely need to install the Expo Go app on your mobile device.

**License:**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Disclaimer:**

The AI Recipe Generator and Image-to-Recipe features are based on machine learning and may not always produce perfect or safe recipes. Always use your own judgment and culinary expertise when preparing food. Ingredient identification may not be perfectly accurate. Consult with a qualified professional for dietary advice.
