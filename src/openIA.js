import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export  default async function chat(prompt) {

  try {
    
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Tu es un assistant utile." },
      { role: "user", content: prompt  }
    ],
  });

  return response.choices[0].message.content;
    
  } catch (error) {
    console.log('erreur de prompt :',error)
    return 'erreur de prompt '
    
  }
  
}


