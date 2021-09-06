<div align="center">
  <h1>Suites Mobile</h1>
  <strong>Suites table application 📱</strong>
</div>




## Suites Mobile App

------

*TBD: Short project description*



## 🏗 Build Status

------

*TBD: Project build status if any*


## 🗂 Tech Stack & Project Dependencies

------

Tech Stack

- [React Native](https://reactnative.dev/docs/getting-started)
- [Expo](https://docs.expo.io)


## Requirements

- [Document Management Server](https://influx.smssoftwarestudio.com/insight/document-management-service/swagger)
- [Document Generation Service](https://influx.smssoftwarestudio.com/insight/document-generation-service/swagger)
- [Suites API]()
- [Expo CLI](https://docs.expo.io/workflow/expo-cli/)




## 🔧  Project Setup

------

Follow the following steps for setting up this project on ur local maching.

1. #### Installing External Dependencies

   - Run the command **`npm install expo-cli --global`** to install Expo
   - After Expo is installs, run the command `expo login -u <<username>> -p <<password>>` login to expo for push notifications. 

2. #### Running the project:

   - run **`npm install`** to install the packages
   - run **`npm start`** to start expo sever
   - if the applicant wasn't loading on the device automatically, 
   using the same terminal press `i` or `a` to run on `ios` or `android` respectively 



## 🦺 Style & Coding Guidelines

------

*TBD: List of coding patterns and guideline to following.*
*TBD: link to other readme that further explain coding styles.* 



## 🚀 Deployment

------

### Transporter
- log into Apple account on transporter.
- run `npm run build:ios:simulator`.
- drag and drop `ipa` file into transporter.

> *NB*: ensure the account has developer permissions 

### Fastlane 
- run `./deploy` to run fastlane script (NB. Ensure fastlane is installed on PC before execution of script)
> *NB*: ensure that the developer account that is being used has maintainer role.

## 🧪 Tests

------

*TBD: Testing Steps*



## *⃣ Available Scripts 

- `npm un build:ios:simulator` used to prepare release candidates. This generates application that to be loaded onto iOS simulators
- `npm run build:ios` used to prepare build file for production. Generates .ipa file that is uploaded to the apple store.
- `npm run start` for local development starts up `expo` application on ios simulator.

------

*TBD: Scripts used*


