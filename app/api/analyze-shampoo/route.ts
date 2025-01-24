import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI client with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    // Parse the incoming request JSON
    const data = await req.json();
    const {
      hairType,
      scalpType,
      hairConcerns,
      isColorTreated,
      hairWashFrequency,
      preferredFragrance,
      step,
    } = data;

    // Validate required fields
    if (!hairType || !scalpType || !hairConcerns || !step) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct the base prompt
    const basePrompt = `As a professional hair care expert, consider these characteristics:

Hair Type: ${hairType}
Scalp Type: ${scalpType}
Hair Concerns: ${hairConcerns.join(", ")}
Color Treated: ${isColorTreated ? "Yes" : "No"}
Wash Frequency: ${hairWashFrequency}
Preferred Fragrance: ${preferredFragrance}

Based on this information, `;

    // Generate the specific prompt based on the requested step
    let prompt;
    switch (step) {
      case "brand":
        prompt =
          basePrompt +
          "recommend a shampoo brand and product name. Respond with only the brand and product name, nothing else.";
        break;
      case "reason":
        prompt =
          basePrompt +
          "explain in detail why this shampoo is suitable for this hair profile. Provide a paragraph of explanation. Try to be detailed and understanding of the hair profile.";
        break;
      case "price":
        prompt =
          basePrompt +
          "estimate the price range of the recommended shampoo. Respond with only $, $$, or $$$, where $ is affordable, $$ is mid-range, and $$$ is premium.";
        break;
      case "ingredients":
        prompt =
          basePrompt +
          "list 6 key ingredients of the recommended shampoo. Respond with only a comma-separated list of ingredients.";
        break;
      case "alternatives":
        prompt =
          basePrompt +
          "suggest 4 alternative shampoo brands. Respond with only the 4 brand names separated by a comma.";
        break;
      case "tips":
        prompt =
          basePrompt +
          "provide 3-5 specific tips for using the recommended shampoo and maintaining healthy hair based on this profile. Respond with a numbered list of 3-5 tips.";
        break;
      default:
        return Response.json({ error: "Invalid step" }, { status: 400 });
    }

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Ensure a valid response is returned
    if (!text) {
      return Response.json({ error: "No response from the AI model" }, { status: 500 });
    }

    return Response.json({ response: text.trim() });
  } catch (error) {
    console.error("Error getting recommendation:", error);

    // Handle known error types
    if (error instanceof Error) {
      return Response.json(
        { error: "Failed to get recommendation", message: error.message },
        { status: 500 }
      );
    }

    // Handle unexpected cases
    return Response.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
