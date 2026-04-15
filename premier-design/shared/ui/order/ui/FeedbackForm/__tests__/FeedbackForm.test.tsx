/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackForm from '../FeedbackForm';

describe('FeedbackForm', () => {
    it('shows validation errors when required fields are empty', async () => {
        const onSubmit = jest.fn().mockResolvedValue(undefined);
        const user = userEvent.setup();
        render(<FeedbackForm onSubmit={onSubmit}/>);

        await user.click(screen.getByRole('button', {name: 'Отправить заявку'}));

        expect(await screen.findByText('Введите ваше имя')).toBeInTheDocument();
        expect(await screen.findByText('Введите ваш номер телефона')).toBeInTheDocument();
        expect(await screen.findByText('Введите сообщение')).toBeInTheDocument();
        expect(await screen.findByText('Необходимо согласие с пользовательским соглашением')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('submits valid payload and strips phone punctuation', async () => {
        const onSubmit = jest.fn().mockResolvedValue(undefined);
        const user = userEvent.setup();
        render(<FeedbackForm onSubmit={onSubmit}/>);

        await user.type(screen.getByPlaceholderText('Введите ваше имя'), 'Иван Иванов');
        await user.type(screen.getByPlaceholderText('Введите ваш номер телефона'), '291234567');
        await user.type(screen.getByPlaceholderText('Введите ваш email (необязательно)'), 'ivan@test.by');
        await user.type(screen.getByPlaceholderText('Введите ваше сообщение'), 'Нужен расчет и консультация');
        await user.click(screen.getByRole('checkbox'));
        await user.click(screen.getByRole('button', {name: 'Отправить заявку'}));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            name: 'Иван Иванов',
            phone: '375291234567',
            email: 'ivan@test.by',
            message: 'Нужен расчет и консультация',
            consent: false,
        });
    });
});
