
'use server'

import { textToBinary } from "@/ai/flows/text-to-binary";
import { z } from "zod";

const inputSchema = z.object({
  text: z.string().min(1, "Text cannot be empty."),
});

type ConversionState = {
  success?: string;
  error?: string;
};

export async function convertTextToBinaryAction(values: z.infer<typeof inputSchema>): Promise<ConversionState> {
  const validatedFields = inputSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input. Please enter some text." };
  }
  
  try {
    const { text } = validatedFields.data;
    const result = await textToBinary({ text });
    if (result && result.binary) {
      return { success: result.binary };
    } else {
      return { error: "Conversion failed to produce a result." };
    }
  } catch (error) {
    console.error("Conversion Error:", error);
    return { error: "An unexpected server error occurred. Please try again later." };
  }
}
