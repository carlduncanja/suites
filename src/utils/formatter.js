import numeral from 'numeral';
import moment from 'moment';

export let isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export let isValidNumber = (value) => {
    return typeof value === 'number';
};

export let currencyFormatter = (num) => {
    return numeral(num).format('0,0.00');
};

export let numberFormatter = (num) => {
    return numeral(num).format('0,0');
};

export let numberLetterFormatter = (num) => {
    return numeral(num).format('0.0a');
};

export let formatDate = (date, format = "MMM D, YYYY") => {
    return date ? moment(date).format(format) : "";
};
