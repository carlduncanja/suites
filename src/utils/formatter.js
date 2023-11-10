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

export const formatTrn = value => value?.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');

/**
 * Formats 10- and 11-digit phone numbers to include hyphens. It strips the phone number of any
 * non-numeric characters before formatting.
 * @param {string} phoneNumber - The telephone number to edit.
 */
export const formatPhoneNumber = phoneNumber => {
    const sanitizationRegex = /\D/g;
    const formattingRegex = /^(1)?(\d{3})(\d{3})(\d{4})$/;

    const sanitizedPhoneNum = phoneNumber.replace(sanitizationRegex, "");
    
    return sanitizedPhoneNum.replace(formattingRegex, (match, prefix, part1, part2, part3) => {
        if(phoneNumber.length === 11){
            return `${prefix}-${part1}-${part2}-${part3}`;
        } else {
            return `${part1}-${part2}-${part3}`;
        }
    })
}

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
    const newWord = word?.replace(/([A-Z])/g, ' $1');
    return newWord?.charAt(0)
        .toUpperCase() + newWord?.slice(1);
};

export const transformToTitleCase = (string, splitCharacter = ' ') => {
    let sentence = string.toLowerCase().split(splitCharacter);
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    return sentence.join(' ');
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

export const checkObjectProperty = (object, key) => object && key in object && object[key] !== undefined && object[key] !== null;

export const mergeObjectArraysWithKeyValue = (arrOld = [], arrNew = [], key = '', value) => {
    arrOld.map(arrOldObj => {
        if (arrOldObj[key] === value) {
            arrNew.map(arrNewObj => {
                if (arrNewObj[key] === value) arrOldObj = {...arrOldObj, ...arrNewObj};
            });
        }
    });
    return arrOld;
};

export const mergeObjectArraysByKey = (arrOld = [], arrNew = [], key = '') => {
    arrOld.map(arrOldObj => {
        arrNew.forEach(arrNewObj => {
            if (arrOldObj[key] === arrNewObj[key]) {
                arrOldObj = {...arrOldObj, ...arrNewObj};
            }
        });
    });
    return arrOld;
}; 

// used to convert different between two dates into hours 
export const  dateDifferenceToHours = (endTime,startTime) =>{
    return Math.ceil((Math.abs(endTime-startTime)*(0.00000027777777777778)))
}

export const formatToCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
