import type {Meta, StoryObj} from '@storybook/nextjs-vite';
import React, {useState} from 'react';

import {UiButton} from './UiButton';
import {UiDialog} from './UiDialog';

const meta = {
	title: 'Primitives/UiDialog',
	component: UiDialog,
	parameters: {layout: 'centered'},
	tags: ['autodocs'],
} satisfies Meta<typeof UiDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		open: false,
		onOpenChange: () => undefined,
		overlayClassName: 'dialogOverlay',
		contentClassName: 'dialogContent',
		children: null,
	},
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<UiButton onClick={() => setOpen(true)}>Open Dialog</UiButton>
				<UiDialog open={open} onOpenChange={setOpen} overlayClassName="dialogOverlay" contentClassName="dialogContent">
					<div className="dialogStoryBody">
						<strong>Headless Dialog Primitive</strong>
						<p>Dialog surface is controlled by external styles and project tokens.</p>
						<UiButton variant="secondary" onClick={() => setOpen(false)}>
							Close
						</UiButton>
					</div>
				</UiDialog>
				<style>{`
          .dialogOverlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            z-index: var(--z-overlay);
          }
          .dialogStoryBody {
            display: grid;
            gap: 0.75rem;
          }
          .dialogContent {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: min(28rem, 90vw);
            background: var(--color-surface);
            color: var(--color-text);
            padding: 1rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: var(--z-toast);
          }
        `}</style>
			</>
		);
	},
};
