export const validatePhone = (phone: string) => {
    // Регулярные выражения для проверки номера телефона (Россия, Беларусь)
    const phonePattern = /^(?:\+7|8)[\s\(\)\-0-9]{10,15}$/; // Россия
    const belarusPhonePattern = /^(?:\+375|80)[\s\(\)\-0-9]{9,15}$/; // Беларусь
    return phonePattern.test(phone) || belarusPhonePattern.test(phone);
};