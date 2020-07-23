import styled, { css } from '@emotion/native';

export const root = {
    /* spacing */
    'space2' : css`0.125rem`,
    '--space-4': css`0.25rem`,
    '--space-6': css`0.375rem`,
    // '--space-8': 0.5rem,
    // '--space-10': 0.625rem,
    // '--space-12': 0.75rem,
    // '--space-14': 0.875rem,
    // '--space-16': 1rem,
    // '--space-18': 1.125rem,
    // '--space-20': 1.25rem,
    // '--space-24': 1.5rem,
    // '--space-28': 1.75rem,
    // '--space-32': 2rem,
    // '--space-40': 2.5rem,
    // '--space-48': 3rem,
    // -'-space-56': 3.5rem,
    // '--space-64': 4rem,
    // '--space-72': 4.5rem,
    /* typography */
    font12: css`0.75rem`,
    // --font-14: 0.875rem;
    // --font-16: 1rem;
    // --font-18: 1.125rem;
    // --font-20: 1.25rem;
    // --font-24: 1.5rem;
    font28: css`1.75rem`,
    // --font-32: 2rem;
    // --font-36: 2.25rem;
    // --font-40: 2.5rem;
    // --font-44: 2.75rem;
    // --font-48: 3rem;
    // --font-56: 3.5rem;
    // --font-64: 4rem;
    // --font-72: 4.5rem;
    // --font-96: 6rem;
    // --font-104: 6.5rem;

    /* colors */

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
        /* Warm Gray */
    '--color-warm-gray-100': '#F8F7F6',
    '--color-warm-gray-200': '#EFEDEB',
    '--color-warm-gray-300': '#D9D4CE',
    '--color-warm-gray-400': '#BDB7B2',
    '--color-warm-gray-500': '#9D9690',
    '--color-warm-gray-600': '#7B7570',
    '--color-warm-gray-700': '#605B58',
    '--color-warm-gray-800': '#3D3A38',
    '--color-warm-gray-900': '#242322',
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
    '--color-orange-100': '#fffaf0',
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
//   /* Indigo */
//   --color-indigo-100: #ebf4ff;
//   --color-indigo-200: #c3dafe;
//   --color-indigo-300: #a3bffa;
//   --color-indigo-400: #7f9cf5;
//   --color-indigo-500: #667eea;
//   --color-indigo-600: #5a67d8;
//   --color-indigo-700: #4c51bf;
//   --color-indigo-800: #434190;
//   --color-indigo-900: #3c366b;
//   /* Purple */
//   --color-purple-100: #faf5ff;
//   --color-purple-200: #e9d8fd;
//   --color-purple-300: #d6bcfa;
//   --color-purple-400: #b794f4;
//   --color-purple-500: #9f7aea;
//   --color-purple-600: #805ad5;
//   --color-purple-700: #6b46c1;
//   --color-purple-800: #553c9a;
//   --color-purple-900: #44337a;
//   /* Pink */
//   --color-pink-100: #fff5f7;
//   --color-pink-200: #fed7e2;
//   --color-pink-300: #fbb6ce;
//   --color-pink-400: #f687b3;
//   --color-pink-500: #ed64a6;
//   --color-pink-600: #d53f8c;
//   --color-pink-700: #b83280;
//   --color-pink-800: #97266d;
//   --color-pink-900: #702459;
}

export const colors = {
    primary: '#104587'
};
