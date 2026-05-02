/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
	it('renders title and description with selected styles', () => {
		render(
			<Title
				title="Заголовок"
				description="Описание"
				shortTitle="short"
				titleStyle="title-white"
				descriptionStyle="description-white"
			/>,
		);

		expect(screen.getByRole('heading', { name: 'Заголовок' })).toBeInTheDocument();
		expect(screen.getByText('Описание')).toBeInTheDocument();
	});
});
