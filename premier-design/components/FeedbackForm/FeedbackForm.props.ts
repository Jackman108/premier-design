export interface FeedbackItem {
    name: string;
    phone: string;
    email: string;
    message: string;
}
export interface FeedbackFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
