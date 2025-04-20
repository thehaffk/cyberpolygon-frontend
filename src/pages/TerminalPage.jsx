import React, { useState, useEffect, useRef } from 'react';
import { TerminalWebSocket } from '../api';
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
    if (!selectedTask) {
      setConnectionStatus('disconnected');
      return;
    }

    try {
      wsRef.current = new TerminalWebSocket(selectedTask.id);
      setConnectionStatus('connecting');

      wsRef.current.onMessage = (data) => {
        if (data.type === 'output') {
          setOutput(prev => [...prev, { type: 'output', content: data.output }]);
        } else if (data.type === 'error') {
          setError(data.error);
          setConnectionStatus('error');
        }
      };

      wsRef.current.onError = (error) => {
        console.error('WebSocket error:', error);
        setError('Ошибка подключения к терминалу');
        setConnectionStatus('error');
      };

      wsRef.current.onClose = () => {
        setConnectionStatus('disconnected');
      };

      wsRef.current.connect();
      setConnectionStatus('connected');

    } catch (err) {
      console.error('Failed to connect:', err);
      setError(err.message);
      setConnectionStatus('error');
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, [selectedTask]);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setOutput([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!command.trim() || connectionStatus !== 'connected') return;

    wsRef.current.send(command);
    setOutput(prev => [...prev, { type: 'command', content: command }]);
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
                {line.content}
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