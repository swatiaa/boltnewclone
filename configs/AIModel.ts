// @ts-ignore
import { createClient } from 'tach-ai';

const client = createClient();

const codeGenerationSystemPrompt = "Generate a Project in React app. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />. also you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}";

export const chatSession = {
  sendMessage: async (prompt: string) => {
    const response = await client.chat.completions.create({
      model: 'MiniMaxAI/MiniMax-M2',
      messages: [{ role: 'user', content: prompt }],
      stream: false
    });
    
    return {
      response: {
        text: () => response.choices[0].message.content
      }
    };
  }
};

export const GenAICode = {
  sendMessage: async (prompt: string) => {
    const response = await client.chat.completions.create({
      model: 'MiniMaxAI/MiniMax-M2',
      messages: [
        { role: 'system', content: codeGenerationSystemPrompt },
        { role: 'user', content: prompt }
      ],
      stream: false
    });
    
    return {
      response: {
        text: () => response.choices[0].message.content
      }
    };
  }
};