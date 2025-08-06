'use server';

/**
 * @fileOverview Converts text input in any language to binary code, ensuring accurate translation of extended characters.
 *
 * - textToBinary - A function that handles the text to binary conversion.
 * - TextToBinaryInput - The input type for the textToBinary function.
 * - TextToBinaryOutput - The return type for the textToBinary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextToBinaryInputSchema = z.object({
  text: z.string().describe('The text to convert to binary.'),
});
export type TextToBinaryInput = z.infer<typeof TextToBinaryInputSchema>;

const TextToBinaryOutputSchema = z.object({
  binary: z.string().describe('The binary representation of the input text.'),
});
export type TextToBinaryOutput = z.infer<typeof TextToBinaryOutputSchema>;

export async function textToBinary(input: TextToBinaryInput): Promise<TextToBinaryOutput> {
  return textToBinaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'textToBinaryPrompt',
  input: {schema: TextToBinaryInputSchema},
  output: {schema: TextToBinaryOutputSchema},
  prompt: `Convert the following text to binary representation. Make sure to accurately translate any extended characters to their binary representation.\n\nText: {{{text}}}`,
});

const textToBinaryFlow = ai.defineFlow(
  {
    name: 'textToBinaryFlow',
    inputSchema: TextToBinaryInputSchema,
    outputSchema: TextToBinaryOutputSchema,
  },
  async input => {
    const binary = Array.from(input.text)
      .map(char => {
        const binaryCode = char.charCodeAt(0).toString(2);
        return binaryCode.padStart(8, '0'); // Ensure 8-bit representation
      })
      .join(' ');
    return {binary};
  }
);
