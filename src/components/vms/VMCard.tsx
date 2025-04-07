import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { VirtualMachine } from '../../types/vm';

interface VMCardProps {
  vm: VirtualMachine;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onReset: (id: number) => void;
}

const MotionCard = motion(Card);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
      return 'success';
    case 'stopped':
      return 'error';
    case 'error':
      return 'error';
    default:
      return 'default';
  }
};

const VMCard: React.FC<VMCardProps> = ({ vm, onStart, onStop, onReset }) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      role="article"
      aria-labelledby={`vm-title-${vm.id}`}
    >
      <CardHeader
        title={vm.name}
        titleTypographyProps={{ id: `vm-title-${vm.id}` }}
        action={
          <Chip
            label={vm.status}
            color={getStatusColor(vm.status)}
            size="small"
            aria-label={`Статус: ${vm.status}`}
          />
        }
      />
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            IP: {vm.ip}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            CPU: {vm.cpu_cores} ядер
          </Typography>
          <Typography variant="body2" color="text.secondary">
            RAM: {vm.ram} GB
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Диск: {vm.disk_size} GB
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onStart(vm.id)}
          disabled={vm.status === 'running'}
          variant="contained"
          color="primary"
          aria-label={`Запустить виртуальную машину ${vm.name}`}
        >
          Запустить
        </Button>
        <Button
          onClick={() => onStop(vm.id)}
          disabled={vm.status === 'stopped'}
          variant="contained"
          color="error"
          aria-label={`Остановить виртуальную машину ${vm.name}`}
        >
          Остановить
        </Button>
        <Button
          onClick={() => onReset(vm.id)}
          variant="outlined"
          color="primary"
          aria-label={`Сбросить виртуальную машину ${vm.name}`}
        >
          Сбросить
        </Button>
      </CardActions>
    </MotionCard>
  );
};

export default VMCard; 