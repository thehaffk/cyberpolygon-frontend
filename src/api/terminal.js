import axiosInstance from './axiosInstance';

export class TerminalWebSocket {
  constructor(taskId) {
    this.taskId = taskId;
    this.socket = null;
    this.onMessage = null;
    this.onError = null;
    this.onClose = null;
    this.isConnected = false;
  }

  connect() {
    if (this.socket) {
      this.disconnect();
    }

    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    this.socket = new WebSocket(`${baseUrl}/ws/ssh/?token=${token}`);

    this.socket.onopen = () => {
      this.isConnected = true;
      this.connectToTask();
    };

    this.socket.onmessage = (event) => {
      if (this.onMessage) {
        try {
          const data = JSON.parse(event.data);
          this.onMessage(data);
        } catch (error) {
          console.error('Error parsing message:', error);
          this.onMessage({ type: 'error', error: 'Ошибка обработки сообщения' });
        }
      }
    };

    this.socket.onerror = (error) => {
      this.isConnected = false;
      if (this.onError) {
        this.onError(error);
      }
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      if (this.onClose) {
        this.onClose();
      }
    };
  }

  connectToTask() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = {
        type: 'connect',
        task_id: this.taskId
      };
      this.socket.send(JSON.stringify(message));
    }
  }

  send(command) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = {
        type: 'command',
        command: command
      };
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }

  close() {
    this.disconnect();
  }
}

export const getTerminalUrl = async () => {
  const response = await axiosInstance.get('/terminal/url/');
  return response.data.url;
}; 