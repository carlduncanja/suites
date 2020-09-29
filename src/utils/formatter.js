import numeral from 'numeral';
import moment from 'moment';

export const isValidEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email)
        .toLowerCase());
};

export const handleNumberValidation = (value, maxLength = 0) => {
    if (maxLength > 0 && (value.toString().length > maxLength)) return null;
    if (/^\d+$/g.test(value) || !value) return value;
};

export const formatTrn = value => value.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');

export const formatNumber = value => value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

export const isValidDOB = date => moment(date)
    .isBefore(new Date());

export const isValidNumber = value => typeof value === 'number';

export const currencyFormatter = num => numeral(num)
    .format('0,0.00');

export const numberFormatter = num => numeral(num)
    .format('0,0');

export const numberSingleDecimalFormater = num => numeral(num)
    .format('0,0.0');

export const numberLetterFormatter = num => numeral(num)
    .format('0.0a');

export const formatDate = (date, format = 'MMM D, YYYY') => (date ? moment(date)
    .format(format) : '');

export const transformToSentence = word => {
    const newWord = word.replace(/([A-Z])/g, ' $1');
    return newWord.charAt(0)
        .toUpperCase() + newWord.slice(1);
};

export const calcAge = dob => {
    const today = new Date();
    const dateObject = new Date(dob);
    let age = today.getFullYear() - dateObject.getFullYear();
    const month = today.getMonth() - dateObject.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dateObject.getDate())) {
        age--;
    }
    return age;
};
