import React, { useEffect, useRef, useState } from 'react';

const TerminalPage = () => {
  const terminalRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commands, setCommands] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    // Приветственное сообщение
    setCommands([
      { type: 'system', text: 'Добро пожаловать в терминал Киберполигона!' },
      { type: 'system', text: 'Используйте команду help для получения списка доступных команд.' },
    ]);

    // Фокус на вводе
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  // Имитация обработки команд
  const processCommand = (cmd) => {
    const command = cmd.trim();
    
    if (!command) return;
    
    // Добавляем команду в историю
    setCommandHistory(prev => [command, ...prev.slice(0, 19)]);
    setHistoryIndex(-1);
    
    // Добавляем введенную команду в терминал
    setCommands(prev => [...prev, { type: 'input', text: command }]);
    
    // Обработка команд
    switch (command) {
      case 'help':
        setCommands(prev => [
          ...prev,
          { type: 'output', text: 'Доступные команды:' },
          { type: 'output', text: '  help       - показать список команд' },
          { type: 'output', text: '  clear      - очистить терминал' },
          { type: 'output', text: '  ls         - показать файлы в текущей директории' },
          { type: 'output', text: '  cat [file] - показать содержимое файла' },
          { type: 'output', text: '  exit       - выйти из терминала' },
          { type: 'output', text: '  whoami     - показать текущего пользователя' },
          { type: 'output', text: '  date       - показать текущую дату и время' },
          { type: 'output', text: '  ping       - проверить соединение' },
        ]);
        break;
        
      case 'clear':
        setCommands([]);
        break;
        
      case 'ls':
        setCommands(prev => [
          ...prev,
          { type: 'output', text: 'tasks/' },
          { type: 'output', text: 'images/' },
          { type: 'output', text: 'readme.txt' },
          { type: 'output', text: 'flag.txt' },
        ]);
        break;
        
      case 'cat readme.txt':
        setCommands(prev => [
          ...prev,
          { type: 'output', text: '=== README ===' },
          { type: 'output', text: 'Добро пожаловать на Киберполигон!' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Этот терминал предоставляет доступ к виртуальной среде,' },
          { type: 'output', text: 'где вы можете практиковать навыки кибербезопасности.' },
          { type: 'output', text: '' },
          { type: 'output', text: 'Используйте команду help для получения списка доступных команд.' },
        ]);
        break;
        
      case 'cat flag.txt':
        setCommands(prev => [
          ...prev,
          { type: 'error', text: 'Отказано в доступе. Требуются права администратора.' },
        ]);
        break;
        
      case 'whoami':
        setCommands(prev => [
          ...prev,
          { type: 'output', text: 'user@cyberpolygon' },
        ]);
        break;
        
      case 'date':
        setCommands(prev => [
          ...prev,
          { type: 'output', text: new Date().toString() },
        ]);
        break;
        
      case 'ping':
        setCommands(prev => [
          ...prev,
          { type: 'output', text: 'PING cyberpolygon.ru (192.168.1.1): 56 data bytes' },
          { type: 'output', text: '64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=15.253 ms' },
          { type: 'output', text: '64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=13.814 ms' },
          { type: 'output', text: '64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=12.612 ms' },
          { type: 'output', text: '' },
          { type: 'output', text: '--- cyberpolygon.ru ping statistics ---' },
          { type: 'output', text: '3 packets transmitted, 3 packets received, 0.0% packet loss' },
          { type: 'output', text: 'round-trip min/avg/max/stddev = 12.612/13.893/15.253/1.091 ms' },
        ]);
        break;
        
      case 'exit':
        setCommands(prev => [
          ...prev,
          { type: 'system', text: 'Выход из терминала...' },
          { type: 'system', text: 'Соединение закрыто.' },
        ]);
        setConnected(false);
        break;
        
      default:
        if (command.startsWith('cd ')) {
          setCommands(prev => [
            ...prev,
            { type: 'output', text: `Переход в директорию: ${command.substring(3)}` },
          ]);
        } else {
          setCommands(prev => [
            ...prev,
            { type: 'error', text: `Команда не найдена: ${command}` },
            { type: 'error', text: 'Используйте help для списка доступных команд.' },
          ]);
        }
    }
  };

  // Обработка нажатий клавиш
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  // Подключение к "терминалу"
  const connectToTerminal = () => {
    setLoading(true);
    setError(null);

    // Имитация подключения
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
      setCommands([
        { type: 'system', text: 'Соединение установлено' },
        { type: 'system', text: 'Добро пожаловать в терминал Киберполигона!' },
        { type: 'system', text: 'Используйте команду help для получения списка доступных команд.' },
      ]);
      
      if (terminalRef.current) {
        terminalRef.current.focus();
      }
    }, 1500);
  };

  // Отключение от терминала
  const disconnectTerminal = () => {
    setConnected(false);
    setCommands([
      { type: 'system', text: 'Соединение закрыто.' },
      { type: 'system', text: 'Нажмите "Подключиться" для соединения с сервером.' },
    ]);
  };

  // Перезапуск терминала
  const restartTerminal = () => {
    disconnectTerminal();
    setTimeout(() => {
      connectToTerminal();
    }, 500);
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(90deg, #6a00ff, #00f0ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.5rem'
      }}>
        Терминал
      </h1>
      
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto 30px',
        color: 'var(--text-gray)',
        fontSize: '1.1rem'
      }}>
        Доступ к виртуальной среде для выполнения практических заданий по кибербезопасности.
        Используйте команду help для получения списка доступных команд.
      </p>
      
      {error && (
        <div style={{
          backgroundColor: 'rgba(255, 68, 68, 0.1)',
          color: '#ff4444',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '0.9rem',
          border: '1px solid rgba(255, 68, 68, 0.3)'
        }}>
          {error}
        </div>
      )}
      
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: 'var(--card-shadow)',
        marginBottom: '20px',
        border: '1px solid rgba(106, 0, 255, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: connected ? '#4CAF50' : loading ? '#FFC107' : '#FF5252'
            }} />
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              {connected ? 'Подключено' : loading ? 'Подключение...' : 'Отключено'}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            {!connected && !loading ? (
              <button
                onClick={connectToTerminal}
                style={{
                  padding: '8px 15px',
                  backgroundColor: 'var(--accent-purple)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                </svg>
                Подключиться
              </button>
            ) : (
              <>
                <button
                  onClick={restartTerminal}
                  disabled={loading}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-light)',
                    border: '1px solid var(--accent-purple)',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="var(--text-light)"/>
                  </svg>
                  Перезапустить
                </button>
                
                <button
                  onClick={disconnectTerminal}
                  disabled={loading || !connected}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: 'transparent',
                    color: '#FF5252',
                    border: '1px solid #FF5252',
                    borderRadius: '5px',
                    cursor: loading || !connected ? 'not-allowed' : 'pointer',
                    opacity: loading || !connected ? 0.5 : 1,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 3H11V13H13V3ZM17.83 5.17L16.41 6.59C17.99 7.86 19 9.81 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 9.81 6.01 7.86 7.58 6.58L6.17 5.17C4.23 6.82 3 9.26 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 9.26 19.77 6.82 17.83 5.17Z" fill="#FF5252"/>
                  </svg>
                  Отключить
                </button>
              </>
            )}
          </div>
        </div>
        
        <div
          style={{
            height: '500px',
            width: '100%',
            backgroundColor: '#0f1118',
            borderRadius: '8px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '14px',
            color: '#f8f8f2',
            padding: '15px',
            overflowY: 'auto',
            border: '1px solid rgba(106, 0, 255, 0.2)'
          }}
        >
          {commands.map((cmd, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {cmd.type === 'input' ? (
                <div>
                  <span style={{ color: '#bd93f9' }}>user@cyberpolygon</span>
                  <span style={{ color: '#f8f8f2' }}>:</span>
                  <span style={{ color: '#8be9fd' }}>~$</span>
                  <span style={{ marginLeft: '8px' }}>{cmd.text}</span>
                </div>
              ) : cmd.type === 'error' ? (
                <div style={{ color: '#ff5555' }}>{cmd.text}</div>
              ) : cmd.type === 'system' ? (
                <div style={{ color: '#50fa7b' }}>{cmd.text}</div>
              ) : (
                <div>{cmd.text}</div>
              )}
            </div>
          ))}
          
          {connected && !loading && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#bd93f9' }}>user@cyberpolygon</span>
              <span style={{ color: '#f8f8f2' }}>:</span>
              <span style={{ color: '#8be9fd' }}>~$</span>
              <input
                ref={terminalRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#f8f8f2',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '14px',
                  marginLeft: '8px',
                  outline: 'none',
                  width: 'calc(100% - 150px)'
                }}
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid rgba(106, 0, 255, 0.2)'
      }}>
        <h2 style={{
          fontSize: '1.3rem',
          marginBottom: '15px',
          color: 'var(--text-light)'
        }}>
          Советы по использованию
        </h2>
        
        <ul style={{
          color: 'var(--text-gray)',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          paddingLeft: '20px'
        }}>
          <li>Используйте команду <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '4px' }}>help</code> для получения списка доступных команд</li>
          <li>Для очистки терминала используйте команду <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '4px' }}>clear</code></li>
          <li>Используйте стрелки вверх и вниз для навигации по истории команд</li>
          <li>Если терминал не отвечает, используйте кнопку "Перезапустить"</li>
          <li>Для навигации по файловой системе используйте команды <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '4px' }}>cd</code>, <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '4px' }}>ls</code></li>
          <li>Для просмотра содержимого файлов используйте <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 5px', borderRadius: '4px' }}>cat filename</code></li>
        </ul>
      </div>
    </div>
  );
};

export default TerminalPage; 