import numeral from 'numeral';
import moment from 'moment';

export let isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export let isValidDOB = (date) => {
    let isValid = moment(date).isBefore(new Date())
    return isValid
}

export let isValidNumber = (value) => {
    return typeof value === 'number';
};

export let currencyFormatter = (num) => {
    return numeral(num).format('0,0.00');
};

export let numberFormatter = (num) => {
    return numeral(num).format('0,0');
};

export let numberSingleDecimalFormater = (num) => {
    return numeral(num).format('0,0.0');
}

export let numberLetterFormatter = (num) => {
    return numeral(num).format('0.0a');
};

export let formatDate = (date, format = "MMM D, YYYY") => {
    return date ? moment(date).format(format) : "";
};

export let transformToSentence = (word) => {
    let newWord = word.replace(/([A-Z])/g, " $1")
    return newWord.charAt(0).toUpperCase() + newWord.slice(1);
}

export let calcAge = (dob) =>{
    let today = new Date()
    let dateObject  = new Date(dob)
    let age = today.getFullYear() - dateObject.getFullYear()
    let month = today.getMonth() - dateObject.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < dateObject.getDate())){
        age --
    }
    return age
}

