import { GoogleGenAI, Type } from "@google/genai";
import { TabmisRow } from "../types";

export const parseUnstructuredData = async (text: string): Promise<Partial<TabmisRow>[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following text which contains accounting transaction data for Vietnam Treasury (TABMIS).
    Extract relevant fields into a structured JSON array.
    
    The text might look like invoices, messages, or rough notes.
    Try to infer missing fields using standard TABMIS defaults if possible (e.g. taxType '01').
    Format dates as DDMMYYYY.
    
    Text to analyze:
    "${text}"
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            transNum: { type: Type.STRING },
            transType: { type: Type.STRING },
            description: { type: Type.STRING },
            voucherNum: { type: Type.STRING },
            voucherDate: { type: Type.STRING },
            debitAccount: { type: Type.STRING },
            creditAccount: { type: Type.STRING },
            amount: { type: Type.STRING },
            taxChapter: { type: Type.STRING },
            taxDate: { type: Type.STRING },
            taxType: { type: Type.STRING },
            collectingAgency: { type: Type.STRING },
            taxId: { type: Type.STRING },
            taxpayerName: { type: Type.STRING },
            collectionAccount: { type: Type.STRING },
          }
        }
      }
    }
  });

  if (response.text) {
    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      return [];
    }
  }
  return [];
};
