import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const basePrompt = `As a professional hair care expert, consider these characteristics:

Hair Type: ${hairType}
Scalp Type: ${scalpType}
Hair Concerns: ${hairConcerns.join(", ")}
Color Treated: ${isColorTreated ? "Yes" : "No"}
Wash Frequency: ${hairWashFrequency}
Preferred Fragrance: ${preferredFragrance}

Based on this information, `;

    let prompt;
    switch (step) {
      case "brand":
        prompt =
          basePrompt +
          "recommend a specific shampoo brand and product name. Respond with only the brand and product name, nothing else.";
        break;
      case "reason":
        prompt =
          basePrompt +
          "explain in detail why the recommended shampoo is suitable for this hair profile. Provide a paragraph of explanation.";
        break;
      case "price":
        prompt =
          basePrompt +
          "estimate the price range of the recommended shampoo. Respond with only $, $$, or $$$, where $ is affordable, $$ is mid-range, and $$$ is premium.";
        break;
      case "ingredients":
        prompt =
          basePrompt +
          "list 3-5 key ingredients of the recommended shampoo. Respond with only a comma-separated list of ingredients.";
        break;
      case "alternatives":
        prompt =
          basePrompt +
          "suggest two alternative shampoo brands. Respond with only the two brand names separated by a comma.";
        break;
      case "tips":
        prompt =
          basePrompt +
          "provide 3 specific tips for using the recommended shampoo and maintaining healthy hair based on this profile. Respond with a numbered list of 3 tips.";
        break;
      default:
        return Response.json({ error: "Invalid step" }, { status: 400 });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({ response: text.trim() });
  } catch (error) {
    console.error("Error getting recommendation:", error);
    return Response.json(
      { error: "Failed to get recommendation", message: error.message },
      { status: 500 }
    );
  }
}
