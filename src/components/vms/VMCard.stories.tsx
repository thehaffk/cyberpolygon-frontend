import type { Meta, StoryObj } from '@storybook/react';
import VMCard from './VMCard';

const meta: Meta<typeof VMCard> = {
  title: 'Components/VMs/VMCard',
  component: VMCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VMCard>;

const mockVM = {
  id: 1,
  name: 'Test VM',
  status: 'running',
  ip: '192.168.1.100',
  cpu_cores: 2,
  ram: 4,
  disk_size: 50,
  task: 1,
};

export const Running: Story = {
  args: {
    vm: mockVM,
    onStart: () => console.log('Start clicked'),
    onStop: () => console.log('Stop clicked'),
    onReset: () => console.log('Reset clicked'),
  },
};

export const Stopped: Story = {
  args: {
    vm: { ...mockVM, status: 'stopped' },
    onStart: () => console.log('Start clicked'),
    onStop: () => console.log('Stop clicked'),
    onReset: () => console.log('Reset clicked'),
  },
};

export const Error: Story = {
  args: {
    vm: { ...mockVM, status: 'error' },
    onStart: () => console.log('Start clicked'),
    onStop: () => console.log('Stop clicked'),
    onReset: () => console.log('Reset clicked'),
  },
}; 