# Stream: An Interactive Messaging Hub

Stream is a comprehensive messaging platform designed to seamlessly capture, organize, and present text messages in real-time. The project consists of a backend built with Koa.js, which serves as a secure intermediary between Twilio-enabled phone numbers and an SQLite database. On the frontend, a dynamic React application provides users with an interactive interface to explore and interact with the messages stored in the database.

<!-- [![Watch the Demo Video](https://img.youtube.com/vi/D9I9Ok4Qszw/0.jpg)](https://www.youtube.com/watch?v=D9I9Ok4Qszw) -->

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Keys](#api-keys)
- [Future Improvements and Development Plans](#future-improvements-and-development-plans)
- [Existing Bugs](#existing-bugs)
- [Project Credits and Development Timeline](#project-credits-and-development-timeline)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Motivation

This project is driven by the desire to explore new technologies like Remix for React, Koa.js for Node.js backends (an area I haven't extensively worked with), and SQLite. The goal is to gain practical experience and broaden skills in modern full-stack development.

## Features

- Send messages to a Twilio-verified phone number and have them logged to a public site.

## Prerequisites

- Node.js and npm installed on your system.
- Twilio phone number.
- Twilio auth token and account SID.
- ngrok auth token and static domain.

## Installation

1. Clone the repository:

```
git clone https://github.com/brianhyun/stream.git
cd stream
```

2. Install dependencies for the frontend and backend:

```
cd frontend
npm install
cd ../backend
npm install
```

## Usage

1. Start the frontend and backend servers:

npm run start

2. Open your browser and navigate to `http://localhost:PORT` at the PORT specified by the Remix prompt.

3. Send a text to the Twilio phone number and refresh to view the latest message.

## API Keys

To use ngrok and the Twilio API, you need to obtain keys from ngrok and Twilio.

1. Update the `.env` file in the `backend` directory with your API keys:

TWILIO_REGISTERED_PHONE_NUMBER=your_twilio_registered_phone_number
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
NGROK_AUTH_TOKEN=your_ngrok_auth_token
NGROK_STATIC_DOMAIN=your_ngrok_static_domain

## Future Improvements and Development Plans

### Current Developments

- Allow editing of posts via phone.
- Send confirmation message that message was posted.
- Allow multimedia uploads, e.g., images and videos.

### Code Refactoring and Technical Enhancements

- Move db, routes, and helper functions to separate directories.

### User Interface

-

### Enhanced Accessibility

-

### Customization

-

## Existing Bugs

-

## Project Credits and Development Timeline

### Developer

- **Brian Hyun** - Sole Developer

### Project Timeline

- **Project Start Date:** 01/19/24
- **Project Completion Date:** TBD
- **Estimated Total Hours:** TBD

## License

This project is licensed under the [MIT License](LICENSE.md) - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- Thanks to ngrok and Twilio for providing their APIs.
- Hat tip to the developers of React, Koa.js, SQLite and other open-source libraries used in this project.
