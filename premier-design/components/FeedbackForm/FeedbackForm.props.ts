export interface FeedbackItem {
    name: string;
    phone: string;
    email: string;
    message: string;
}
export interface FeedbackFormProps {
    onSubmit: (data: FormData) => void;
}
