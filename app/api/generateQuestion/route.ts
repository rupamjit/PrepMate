import { db } from "@/firebase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!); // Use server-side env variable

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result =
      await model.generateContent(`Prepare questions for a job interview.
      The job role is ${role}.
      The job experience level is ${level}.
      The tech stack used in the job is: ${techstack}.
      The focus between behavioural and technical questions should lean towards: ${type}.
      The amount of questions required is: ${amount}.
      Please return only the questions in this format:
      ["Question 1", "Question 2", "Question 3"]
    `);

    const response = await result.response;
    const questionsText = response.text();

    console.log("Generated Questions:", questionsText);

    let questions: string[];

    try {
      questions = JSON.parse(questionsText);
    } catch (err) {
      throw new Error("Invalid JSON format received from AI.");
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions,
      finalized: true,
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true, questions }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
