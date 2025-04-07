class TerminalWebSocket {
  constructor(taskId) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    this.ws = new WebSocket(`ws://localhost:8000/ws/ssh/?token=${token}&task=${taskId}`);
    this.messageHandlers = new Set();
    this.errorHandlers = new Set();
    this.closeHandlers = new Set();

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageHandlers.forEach(handler => handler(data));
    };

    this.ws.onerror = (error) => {
      this.errorHandlers.forEach(handler => handler(error));
    };

    this.ws.onclose = (event) => {
      this.closeHandlers.forEach(handler => handler(event));
    };
  }

  onMessage(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onError(handler) {
    this.errorHandlers.add(handler);
    return () => this.errorHandlers.delete(handler);
  }

  onClose(handler) {
    this.closeHandlers.add(handler);
    return () => this.closeHandlers.delete(handler);
  }

  send(command) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ command }));
    }
  }

  close() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }
}

export default TerminalWebSocket; 