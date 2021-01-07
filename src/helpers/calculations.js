import numeral from 'numeral';

/**
 * BMI is calculated by m/h^2 where m is the mass (in kilograms) and h is the height (in metres)
 *
 * @param height cm
 * @param weight kg
 */
export const calculateBmi = (height, weight) => {
    // convert centimetres height to m(etres)
    const metreHeight = (height / 100) || 0; // defaulting just in case

    // calculate bmi value based on formula
    const bmiResult = (weight / Math.pow(metreHeight, 2)) || 0; // defaulting just in case

    return Number(numeral(bmiResult).format('0.0'));
};
