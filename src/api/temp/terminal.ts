interface TerminalMessage {
  type: string;
  command?: string;
  output?: string;
  error?: string;
  task_id?: number;
}

class TerminalService {
  private ws: WebSocket | null = null;
  private token: string | null = null;
  private messageHandlers: ((message: TerminalMessage) => void)[] = [];
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimeout: number = 3000;
  private reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;
  
  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  connect(onOpen?: () => void, onClose?: () => void): void {
    if (!this.token) {
      console.error('Cannot connect to terminal: No authentication token found');
      return;
    }
    
    try {
      const wsUrl = `ws://localhost:8000/ws/ssh/?token=${this.token}`;
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('Terminal WebSocket connection established');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        if (onOpen) onOpen();
      };
      
      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as TerminalMessage;
          this.messageHandlers.forEach(handler => handler(message));
        } catch (error) {
          console.error('Error parsing terminal message:', error);
        }
      };
      
      this.ws.onclose = () => {
        console.log('Terminal WebSocket connection closed');
        this.isConnected = false;
        if (onClose) onClose();
        
        // Try to reconnect
        this.tryReconnect();
      };
      
      this.ws.onerror = (error) => {
        console.error('Terminal WebSocket error:', error);
        this.isConnected = false;
      };
    } catch (error) {
      console.error('Error connecting to terminal:', error);
    }
  }
  
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
    
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
  }
  
  private tryReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached. Please refresh the page.');
      return;
    }
    
    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    this.reconnectTimeoutId = setTimeout(() => {
      this.connect();
    }, this.reconnectTimeout);
  }
  
  connectToTask(taskId: number): void {
    if (!this.isConnected || !this.ws) {
      console.error('Cannot connect to task: WebSocket not connected');
      return;
    }
    
    const message: TerminalMessage = {
      type: 'connect',
      task_id: taskId
    };
    
    this.ws.send(JSON.stringify(message));
  }
  
  sendCommand(command: string): void {
    if (!this.isConnected || !this.ws) {
      console.error('Cannot send command: WebSocket not connected');
      return;
    }
    
    const message: TerminalMessage = {
      type: 'command',
      command
    };
    
    this.ws.send(JSON.stringify(message));
  }
  
  onMessage(handler: (message: TerminalMessage) => void): void {
    this.messageHandlers.push(handler);
  }
  
  removeMessageHandler(handler: (message: TerminalMessage) => void): void {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }
  
  isConnectedToTerminal(): boolean {
    return this.isConnected;
  }
}

export default new TerminalService(); 