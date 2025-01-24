# Shampoo Sage

Shampoo Sage is an AI-powered web application that provides personalized shampoo recommendations based on individual hair profiles. Using advanced algorithms and a comprehensive database of hair care products, Shampoo Sage helps users find the perfect shampoo for their unique hair type and concerns.

## Features

- Personalized shampoo recommendations based on individual hair profiles
- Detailed hair profile questionnaire for users to input their preferences and needs
- AI-powered analysis using Gemini API for tailored product suggestions
- Responsive and modern user interface with a vibrant color scheme
- Hair care tips and featured products showcase
- Integration with the Gemini API for real-time shampoo recommendations

## Technologies Used

- **Next.js 14 (App Router)**: Full-stack framework for building the application
- **React**: Library for building user interfaces
- **TypeScript**: Typed JavaScript for better code quality and maintainability
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui components**: Beautiful and accessible UI components for faster development
- **Google Generative AI (Gemini API)**: AI-powered shampoo recommendation engine

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm** (v7 or later)

## Installation

1. **Clone the repository**:
   - git clone https://github.com/MeeksonJr/next-shampoo
   - cd shampoo-sage


2. **Install dependencies**:
   - npm install
   

3. **Set up environment variables**: 
   Create a \`.env.local\` file in the root directory and add your Gemini API key:
   \`\`\`
   GEMINI_API_KEY=your_api_key_here
   \`\`\`

4. **Configure additional settings** (if any): 
   If you are using any third-party services or specific configurations, add them to your \`.env.local\` file or update the necessary configuration files.

## Usage

1. Start the development server:
   - npm run dev

2. Open your browser and navigate to \`http://localhost:3000\`.

3. Complete the hair profile questionnaire by providing information about your hair type, concerns, and preferences.

4. Submit the form to receive your personalized shampoo recommendation, along with usage tips and alternative options.

5. Explore the hair care tips and featured products sections for additional information and product suggestions.

## Project Structure

- app/: Contains the main application code
  - components/: Reusable React components (e.g., ShampooForm, ResultsDisplay)
  - api/: API routes for server-side functionality (e.g., analyze-shampoo)
- public/: Static assets (images, fonts, etc.)

## Contributing

We welcome contributions to Shampoo Sage! Please follow these steps to contribute:

1. Fork the repository on GitHub
2. Clone your fork to your local machine:
   - git clone https://github.com/MeeksonJr/next-shampoo.git
3. - Create a new branch:
   - git checkout -b feature/your-feature-name
4. Make your changes and commit them:
   - git commit -m 'Add some feature'
5. Push to your branch:
   - git push origin feature/your-feature-name
6. Submit a pull request from your fork to the main repository.

Please make sure to:
- Update tests as appropriate
- Follow the existing coding style for consistency
- Maintain the vibrant and appealing color scheme in any UI changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators of Next.js, React, and Tailwind CSS for their amazing tools
- Shoutout to the shadcn/ui team for their beautiful and accessible components
- Special thanks to Google for providing the Gemini API for AI-powered recommendations

## Contact

If you have any questions or feedback, feel free to:

- Open an issue on this repository
- Contact the maintainers directly via GitHub
- Email us at d.mohamed1504@gmail.com

Happy hair care with Shampoo Sage! 💆‍♀️💆‍♂️

This README provides a comprehensive overview of the Shampoo Sage project, including its features, technologies used, installation instructions, usage guidelines, project structure, and contribution information. It's designed to help developers quickly understand the project and get started with development or deployment.

