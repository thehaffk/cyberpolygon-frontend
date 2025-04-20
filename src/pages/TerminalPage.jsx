import React, { useState, useEffect, useRef } from 'react';
import { TerminalWebSocket, getTerminalUrl } from '../api/terminal';
import { getTasks } from '../api/tasks';

const TerminalPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [output, setOutput] = useState([]);
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const terminalRef = useRef(null);
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [terminal, setTerminal] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks({ type: 'terminal' });
        setTasks(data);
      } catch (err) {
        setError('Не удалось загрузить задания');
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      let socket = null;

      const connectToTerminal = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Get terminal URL for the selected task
          const wsUrl = await getTerminalUrl(selectedTask);
          
          // Create and connect WebSocket
          socket = new TerminalWebSocket(
            wsUrl,
            // onMessage
            (event) => {
              let message;
              try {
                message = JSON.parse(event.data);
              } catch (e) {
                // If not JSON, use raw data
                message = { type: 'output', data: event.data };
              }
              
              if (message.type === 'output') {
                // Add output to terminal
                setOutput(prev => [...prev, { type: 'output', data: message.data }]);
              } else if (message.type === 'error') {
                setError(message.data || 'Ошибка соединения с терминалом');
              }
            },
            // onError
            (error) => {
              console.error('Terminal WebSocket error:', error);
              setConnected(false);
              setError('Ошибка соединения с терминалом');
            },
            // onClose
            () => {
              setConnected(false);
            },
            // onOpen
            () => {
              setConnected(true);
              setLoading(false);
            }
          );
          
          socket.connect();
          setTerminal(socket);
        } catch (err) {
          console.error('Terminal connection error:', err);
          setError('Не удалось подключиться к терминалу');
          setLoading(false);
        }
      };

      connectToTerminal();

      return () => {
        if (socket) {
          socket.close();
        }
      };
    }
  }, [selectedTask]);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setOutput([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!command.trim() || !terminal || !connected) return;
    
    // Add command to output with $ prefix
    setOutput(prev => [...prev, { type: 'command', data: `$ ${command}` }]);
    
    // Send command to WebSocket
    terminal.send(JSON.stringify({
      type: 'command',
      command: command
    }));
    
    // Clear command input
    setCommand('');
  };

  if (loading) {
    return <div className="loading">Загрузка заданий...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="terminal-page">
      <div className="task-selector">
        <h3>Выберите задание:</h3>
        <select 
          value={selectedTask?.id || ''} 
          onChange={(e) => {
            const task = tasks.find(t => t.id === parseInt(e.target.value));
            handleTaskSelect(task);
          }}
        >
          <option value="">Выберите задание</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {selectedTask && (
        <div className="terminal-container">
          <div className="terminal-header">
            <h2>{selectedTask.title}</h2>
            <div className={`status ${connectionStatus}`}>
              {connectionStatus}
            </div>
          </div>

          <div className="terminal-output" ref={terminalRef}>
            {output.map((line, index) => (
              <div key={index} className={`line ${line.type}`}>
                {line.type === 'command' && '$ '}
                {line.data}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="terminal-input">
            <span className="prompt">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder={
                connectionStatus === 'connected' 
                  ? 'Введите команду...' 
                  : 'Подключение к терминалу...'
              }
              disabled={connectionStatus !== 'connected'}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default TerminalPage; 