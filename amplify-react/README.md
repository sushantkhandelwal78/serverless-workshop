## Amplify React

Basic Authentication flow, including: User Sign-Up, User Sign-In, Multi-Factor Authentication, User Sign-Out.

### 1. Deploy with the AWS Amplify Console

The AWS Amplify Console provides hosting for Fullstack Serverless Web-apps. Deploy this app to your AWS account with a single click:

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/nnthanh101/sls-app)

The Amplify Console will fork this repo in your GitHub account, and then build and deploy your backend and frontend in a single workflow. Your app will be available at `https://master.~appid~.amplifyapp.com`.

### 2. Run locally with the Amplify CLI

2.1. Clone the repo that was just forked in your account

  ```
  git clone git@github.com:<username>/sls-app.git

  cd sls-app && npm install
  ```

2.2. Import the backend environment deployed by the Amplify Console to your repo (the `amplify/team-provider.json` file contains information on all backend environments in your AWS account). The GIF below shows how you to copy the `amplify env import` command from the Amplify Console. 

<img src="https://github.com/nnthanh101/sls-app/blob/master/amplify-react/README/import-backend.gif" width="800"/>

2.3. Paste this command into your terminal at the root of your repo. You should see the `amplify/team-provider.json` updated with a backend named `amplify`.

  ```
  amplify pull
  ```


2.4. Run locally

  ```
  npm start
  ```

### 3. Features

3.1. [x] React-Boilerplate

    * [x] npx create-react-app amplify-react

    * [ ] src/test: Test-cases https://dev.to/kelvin9877/how-to-write-tests-for-react-in-2020-4oai

    * [ ] src/assets: *.css *.scss

    * [ ] src/components: Header (Home & UserProfile icons)

        * [ ] Home - Drop-down menu: https://job4u.io | Source Code: https://gitlab.com/job4u/job4u-web

        * [ ] Home - Route: https://chatbot.job4u.io | Source Code: https://gitlab.com/job4u/ChatbotWeb

        * [ ] User Profile: https://survey.aws.job4u.io/ | Source Code:: https://github.com/nnthanh101/appsync-survey-tool

    * [ ] Material UI --> Material Dashboard React: https://www.creative-tim.com/product/material-dashboard-react?partner=104080  

3.2. [ ] User Authentication with the Amplify Framework

    * [ ] `npm install -g @aws-amplify/cli`

    * [ ] `amplify configure`