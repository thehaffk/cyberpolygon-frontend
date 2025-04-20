import { Terminal } from 'xterm';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.terminal = null;
  }

  connect(terminalInstance) {
    this.terminal = terminalInstance;
    const token = localStorage.getItem('token');
    
    if (!token) {
      if (this.terminal) {
        this.terminal.write('\r\n\x1b[31mОшибка: Отсутствует токен авторизации\x1b[0m\r\n');
      }
      return;
    }
    
    this.socket = new WebSocket(`ws://localhost:8000/ws/ssh/?token=${token}`);
    
    this.socket.onopen = () => {
      if (this.terminal) {
        this.terminal.write('\r\n\x1b[32mСоединение установлено\x1b[0m\r\n');
      }
    };
    
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.output && this.terminal) {
          this.terminal.write(data.output);
        }
        if (data.error && this.terminal) {
          this.terminal.write(`\r\n\x1b[31mОшибка: ${data.error}\x1b[0m\r\n`);
        }
      } catch (error) {
        if (typeof event.data === 'string' && this.terminal) {
          this.terminal.write(event.data);
        }
      }
    };
    
    this.socket.onclose = () => {
      if (this.terminal) {
        this.terminal.write('\r\n\x1b[33mСоединение закрыто\x1b[0m\r\n');
      }
    };
    
    this.socket.onerror = (error) => {
      if (this.terminal) {
        this.terminal.write(`\r\n\x1b[31mОшибка соединения\x1b[0m\r\n`);
      }
      console.error('WebSocket error:', error);
    };
  }
  
  sendCommand(command) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ command }));
    } else if (this.terminal) {
      this.terminal.write('\r\n\x1b[31mОшибка: Соединение не установлено\x1b[0m\r\n');
    }
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.terminal = null;
  }
}

export const websocketService = new WebSocketService(); 