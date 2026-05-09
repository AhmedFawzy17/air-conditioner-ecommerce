import { apiClient } from './apiClient';

export interface ChatResponse {
  message: string;
}

export const ChatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    return apiClient.post('/chatbot/message', { message });
  }
};
