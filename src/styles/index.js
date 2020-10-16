import styled, {css} from '@emotion/native';

export const root = {
    space: {
        /* spacing */
        '--space-2': '2px',
        '--space-4': '4px',
        '--space-6': '6px',
        '--space-8': '8px',
        '--space-10': '10px',
        '--space-12': '12px',
        '--space-14': '14px',
        '--space-16': '16px',
        '--space-18': '18px',
        '--space-20': '20px',
        '--space-24': '24px',
        '--space-26': '26px',
        '--space-28': '28px',
        '--space-32': '32px',
        '--space-40': '40px',
        '--space-48': '48px',
        '--space-56': '56px',
        '--space-64': '64px',
        '--space-72': '72px',

        // SUITES
        '--space-30': '30px',
    },

    /* colors */

    // ##### SUITES
    colors: {
        /* Base */
        '--color-black': '#000000',
        '--color-white': '#ffffff',
        '--color-transparent': css`transparent`,
        /* Cool Gray */
        '--color-gray-100': '#F6F8F8',
        '--color-gray-200': '#EDF0F2',
        '--color-gray-300': '#D3D9DE',
        '--color-gray-400': '#B3BDC6',
        '--color-gray-500': '#8D9AA5',
        '--color-gray-600': '#6E7B87',
        '--color-gray-700': '#525B64',
        '--color-gray-800': '#373B3E',
        '--color-gray-900': '#222426',
        /* Neutral Gray */
        '--color-neutral-gray-100': '#F7F7F7',
        '--color-neutral-gray-200': '#EDEDED',
        '--color-neutral-gray-300': '#D4D4D4',
        '--color-neutral-gray-400': '#B8B8B8',
        '--color-neutral-gray-500': '#969696',
        '--color-neutral-gray-600': '#757575',
        '--color-neutral-gray-700': '#5C5C5C',
        '--color-neutral-gray-800': '#3B3B3B',
        '--color-neutral-gray-900': '#232323',
        /* Red */
        '--color-red-100': '#fff5f5',
        '--color-red-200': '#fed7d7',
        '--color-red-300': '#feb2b2',
        '--color-red-400': '#fc8181',
        '--color-red-500': '#f56565',
        '--color-red-600': '#e53e3e',
        '--color-red-700': '#c53030',
        '--color-red-800': '#9b2c2c',
        '--color-red-900': '#742a2a',
        /* Orange */
        '--color-orange-100': 'p#fffaf0',
        '--color-orange-200': '#feebc8',
        '--color-orange-300': '#fbd38d',
        '--color-orange-400': '#f6ad55',
        '--color-orange-500': '#ed8936',
        '--color-orange-600': '#dd6b20',
        '--color-orange-700': '#c05621',
        '--color-orange-800': '#9c4221',
        '--color-orange-900': '#7b341e',
        /* Yellow */
        '--color-yellow-100': '#fffff0',
        '--color-yellow-200': '#fefcbf',
        '--color-yellow-300': '#faf089',
        '--color-yellow-400': '#f6e05e',
        '--color-yellow-500': '#ecc94b',
        '--color-yellow-600': '#d69e2e',
        '--color-yellow-700': '#b7791f',
        '--color-yellow-800': '#975a16',
        '--color-yellow-900': '#744210',
        /* Green */
        '--color-green-100': '#f0fff4',
        '--color-green-200': '#c6f6d5',
        '--color-green-300': '#9ae6b4',
        '--color-green-400': '#68d391',
        '--color-green-500': '#48bb78',
        '--color-green-600': '#38a169',
        '--color-green-700': '#2f855a',
        '--color-green-800': '#276749',
        '--color-green-900': '#22543d',
        /* Teal */
        '--color-teal-100': '#e6fffa',
        '--color-teal-200': '#b2f5ea',
        '--color-teal-300': '#81e6d9',
        '--color-teal-400': '#4fd1c5',
        '--color-teal-500': '#38b2ac',
        '--color-teal-600': '#319795',
        '--color-teal-700': '#2c7a7b',
        '--color-teal-800': '#285e61',
        '--color-teal-900': '#234e52',
        /* Blue */
        '--color-blue-100': '#ebf8ff',
        '--color-blue-200': '#bee3f8',
        '--color-blue-300': '#90cdf4',
        '--color-blue-400': '#63b3ed',
        '--color-blue-500': '#4299e1',
        '--color-blue-600': '#3182ce',
        '--color-blue-700': '#2b6cb0',
        '--color-blue-800': '#2c5282',
        '--color-blue-900': '#2a4365',
        /* Indigo */
        '--color-indigo-100': '#ebf4ff',
        '--color-indigo-200': '#c3dafe',
        '--color-indigo-300': '#a3bffa',
        '--color-indigo-400': '#7f9cf5',
        '--color-indigo-500': '#667eea',
        '--color-indigo-600': '#5a67d8',
        '--color-indigo-700': '#4c51bf',
        '--color-indigo-800': '#434190',
        '--color-indigo-900': '#3c366b',
        /* Purple */
        '--color-purple-100': '#faf5ff',
        '--color-purple-200': '#e9d8fd',
        '--color-purple-300': '#d6bcfa',
        '--color-purple-400': '#b794f4',
        '--color-purple-500': '#9f7aea',
        '--color-purple-600': '#805ad5',
        '--color-purple-700': '#6b46c1',
        '--color-purple-800': '#553c9a',
        '--color-purple-900': '#44337a',
        /* Pink */
        '--color-pink-100': '#fff5f7',
        '--color-pink-200': '#fed7e2',
        '--color-pink-300': '#fbb6ce',
        '--color-pink-400': '#f687b3',
        '--color-pink-500': '#ed64a6',
        '--color-pink-600': '#d53f8c',
        '--color-pink-700': '#b83280',
        '--color-pink-800': '#97266d',
        '--color-pink-900': '#702459',
        // ##### SUITES
        '--company': '#104587',
        '--company-pale': '#769AC7',
        '--accent-button': '#0CB0E7',
        '--accent-line': '#00A9CE',
        '--gradient-color': 'linear-gradient(180deg, #99C2E3 0%, #83AED1 100%)',
        // WHITE
        '--default-shade-white': '#FFFFFF',
        '--default-neutral-gray': '#FAFAFA',
    },
    font: {
        '--cart-text': {
            fontSize: 10,
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 10,
        },
        '--actions-title': {
            fontSize: 10,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 10,
        },
        '--calenday-weekday': {
            fontSize: 12,
            fontWeight: '750',
            fontStyle: 'normal',
            lineHeight: 12,
        },
        // XS - SMALL
        '--text-xs-regular': {
            fontSize: 12,
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 12,
        },
        '--text-xs-light': {
            fontSize: 12,
            fontWeight: '300',
            fontStyle: 'normal',
            lineHeight: 12,
        },
        '--text-xs-medium': {
            fontSize: 12,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 12,
        },
        '--text-xs-bold': {
            fontSize: 12,
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: 12,
        },
        // SM - SMALL
        '--text-sm-regular': {
            fontSize: 14,
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 14,
        },
        '--text-sm-medium': {
            fontSize: 14,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 14,
        },
        '--text-sm-bold': {
            fontSize: 14,
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: 14,
        },

        // BASE
        '--confirm-title': {
            fontSize: 16,
            fontWeight: '600',
            fontStyle: 'normal',
            lineHeight: 16,
        },
        '--confirm-message': {
            fontSize: 17,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 16,
        },
        '--text-base-regular': {
            fontSize: 16,
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 16,
        },
        '--text-base-medium': {
            fontSize: 16,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 16,
        },
        '--text-base-bold': {
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: 16,
        },

        //  - LARGE
        '--text-lg-regular': {
            fontSize: 18,
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 18,
        },

        // XL - LARGE
        '--text-xl-medium': {
            fontSize: 20,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 20,
        },
        // 2XL - LARGE
        '--text-2xl-medium': {
            fontSize: 24,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 24,
        },
        // 3XL - LARGE
        '--text-3xl-medium': {
            fontSize: 30,
            fontWeight: '500',
            fontStyle: 'normal',
            lineHeight: 30,
        },
        '--text-3xl-bold': {
            fontSize: 30,
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: 30,
        },
    },

    shadow: {
        // SUITES
        '--shadow-identifier': '0px 1px 4px rgba(63, 199, 244, 0.4)',
        // shadow-md
        '--shadow-md': '0px 4px 6px rgba(0, 0, 0, 0.1))',
        '--shadow-lg': '0px 4px 6px rgba(0, 0, 0, 0.05)',
        '--drop-shadow-md': 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.06)), drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
    },
};

export const colors = {primary: '#104587'};

export const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0.2,
        height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 3,
};
