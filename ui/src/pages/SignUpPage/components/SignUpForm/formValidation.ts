export const validateForm = (formData) => Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: validateField(formData[key]) }), {});

const validateField = (value) => !!value && value.length > 0;
export const validatePasswords = (password, confirmPassword) => password === confirmPassword;

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
