import {FeedbackItem} from "../interface/FeedbackModal.props";
import {validatePhone} from "./validatePhone";
import {validateEmail} from "./validateEmail";

export const validateForm = (formDataState: FeedbackItem, isConsentGiven: boolean) => ({
    name: formDataState.name ? "" : "Введите ваше имя",
    phone: formDataState.phone ? (validatePhone(formDataState.phone) ? "" : "Неверный формат номера телефона!") : "Введите ваш номер телефона",
    email: formDataState.email && !validateEmail(formDataState.email) ? "Неверный формат email." : "",
    message: formDataState.message ? "" : "Введите сообщение",
    consent: isConsentGiven ? "" : "Необходимо согласие с пользовательским соглашением",
});