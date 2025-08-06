
'use server'

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
    const binary = Array.from(text)
      .map(char => {
        const binaryCode = char.charCodeAt(0).toString(2);
        return binaryCode.padStart(8, '0'); // Ensure 8-bit representation
      })
      .join(' ');
      
    if (binary) {
      return { success: binary };
    } else {
      return { error: "Conversion failed to produce a result." };
    }
  } catch (error) {
    console.error("Conversion Error:", error);
    return { error: "An unexpected server error occurred. Please try again later." };
  }
}
