export const validatePhone = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, '');

    const phonePattern = /^[78][0-9]{10}$/;
    const belarusPhonePattern = /^(?:375|80)[0-9]{9}$/;
    return phonePattern.test(cleanedPhone) || belarusPhonePattern.test(cleanedPhone);
};
