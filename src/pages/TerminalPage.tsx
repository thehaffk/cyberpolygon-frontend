import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

interface TerminalMessage {
  type: 'system' | 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const TerminalPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Автоматическая прокрутка к последнему сообщению
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  // Фокус на поле ввода
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [connected]);

  // Подключение к WebSocket
  const connectToTerminal = () => {
    try {
      setLoading(true);
      setError(null);

      // Создаем новый WebSocket с токеном пользователя для авторизации
      const token = localStorage.getItem('token');
      const socket = new WebSocket(`ws://localhost:8000/ws/terminal/?token=${token}`);

      socket.onopen = () => {
        setConnected(true);
        setLoading(false);
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: 'Соединение установлено. Добро пожаловать в терминал!',
            timestamp: new Date()
          }
        ]);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'terminal_output') {
            setMessages(prev => [
              ...prev,
              {
                type: data.error ? 'error' : 'output',
                content: data.content,
                timestamp: new Date()
              }
            ]);
          } else if (data.type === 'system_message') {
            setMessages(prev => [
              ...prev,
              {
                type: 'system',
                content: data.content,
                timestamp: new Date()
              }
            ]);
          }
        } catch (err) {
          console.error('Ошибка при обработке сообщения:', err);
          setMessages(prev => [
            ...prev,
            {
              type: 'error',
              content: 'Ошибка при обработке сообщения от сервера',
              timestamp: new Date()
            }
          ]);
        }
      };

      socket.onerror = (event) => {
        console.error('WebSocket ошибка:', event);
        setError('Ошибка соединения. Пожалуйста, попробуйте позже.');
        setLoading(false);
        setConnected(false);
      };

      socket.onclose = (event) => {
        setConnected(false);
        setMessages(prev => [
          ...prev,
          {
            type: 'system',
            content: `Соединение закрыто: ${event.reason || 'Нет причины'}`,
            timestamp: new Date()
          }
        ]);
      };

      socketRef.current = socket;
    } catch (err) {
      console.error('Ошибка подключения к терминалу:', err);
      setError('Не удалось подключиться к терминалу. Пожалуйста, проверьте соединение и повторите попытку.');
      setLoading(false);
    }
  };

  // Обработка отправки команды
  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !connected || !socketRef.current) return;

    // Добавляем введенную команду в историю сообщений
    setMessages(prev => [
      ...prev,
      {
        type: 'input',
        content: `$ ${input}`,
        timestamp: new Date()
      }
    ]);

    // Отправляем команду на сервер
    socketRef.current.send(JSON.stringify({
      type: 'command',
      content: input
    }));

    // Очищаем поле ввода
    setInput('');
  };

  // Отключение от терминала
  const disconnectTerminal = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setConnected(false);
      setMessages(prev => [
        ...prev,
        {
          type: 'system',
          content: 'Соединение закрыто пользователем',
          timestamp: new Date()
        }
      ]);
    }
  };

  // Перезапуск терминала
  const restartTerminal = () => {
    disconnectTerminal();
    setMessages([]);
    setTimeout(() => {
      connectToTerminal();
    }, 500);
  };

  // Функция для форматирования времени
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Терминал
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Доступ к виртуальному терминалу для выполнения задач
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {connected ? 'Активная сессия' : 'Терминал отключен'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {!connected && !loading ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrowIcon />}
                    onClick={connectToTerminal}
                  >
                    Подключиться
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<RefreshIcon />}
                      onClick={restartTerminal}
                      disabled={loading}
                    >
                      Перезапустить
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<PowerSettingsNewIcon />}
                      onClick={disconnectTerminal}
                      disabled={loading || !connected}
                    >
                      Отключить
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress />
              </Box>
            )}

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper
              sx={{
                height: 400,
                p: 2,
                backgroundColor: '#1E1E1E',
                color: '#FFFFFF',
                fontFamily: 'monospace',
                overflow: 'auto',
                border: '1px solid #333',
                borderRadius: 1,
              }}
              ref={terminalRef}
            >
              {messages.map((message, index) => (
                <Box key={index} sx={{ mb: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  <Box component="span" sx={{ color: '#666', mr: 1 }}>
                    [{formatTime(message.timestamp)}]
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      color:
                        message.type === 'system'
                          ? '#3498db'
                          : message.type === 'input'
                          ? '#2ecc71'
                          : message.type === 'error'
                          ? '#e74c3c'
                          : '#f1c40f'
                    }}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))}
            </Paper>

            <Box
              component="form"
              onSubmit={handleSendCommand}
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333',
                borderRadius: 1,
                p: 1,
              }}
            >
              <Box component="span" sx={{ color: '#2ecc71', mr: 1, fontFamily: 'monospace' }}>
                {user?.username || 'user'}@terminal:~$
              </Box>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!connected}
                ref={inputRef}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                }}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: { xs: '100%', md: 300 } }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Полезная информация
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" paragraph>
              Это виртуальный терминал Linux, ограниченный для учебных целей.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Основные команды:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>ls - показать файлы</li>
              <li>cd - изменить директорию</li>
              <li>cat - просмотр файла</li>
              <li>pwd - текущий путь</li>
              <li>help - справка</li>
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>
              Используйте терминал для решения практических заданий по Linux и кибербезопасности.
            </Alert>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default TerminalPage; 