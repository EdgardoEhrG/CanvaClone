import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Footer } from '@/features/components/footer';

const meta = {
  component: Footer,
  title: 'Example/Footer',
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
