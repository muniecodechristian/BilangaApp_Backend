import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: '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',
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



