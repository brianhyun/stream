# Stream: An Interactive Messaging Hub

Stream is an innovative messaging application designed to streamline communication through text messages. Seamlessly integrated with Twilio, Stream allows users to send messages to a designated phone number, which are then efficiently stored in a secure database. With a user-friendly frontend, Stream provides an intuitive interface to explore and interact with all the messages sent to the bulletin.

<!-- [![Watch the Demo Video](https://img.youtube.com/vi/D9I9Ok4Qszw/0.jpg)](https://www.youtube.com/watch?v=D9I9Ok4Qszw) -->

## Table of Contents

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

## Features

- Search for addresses using the Mapbox API and place markers on a map.
- Calculate the geometric median of the addresses.
- Recommend restaurants around the geometric median using the Yelp Fusion API.
- User-friendly interface with interactive maps and restaurant listings.

## Prerequisites

- Node.js and npm installed on your system.
- Mapbox API key.
- Yelp Fusion API key.

## Installation

1. Clone the repository:

```
git clone https://github.com/brianhyun/meet_in_the_middle.git
cd meet_in_the_middle
```

2. Install dependencies for the frontend and backend:

```
cd frontend
npm install
cd ../backend
npm install
```

## Usage

1. Start the backend server:

cd backend
npm run dev

2. Start the frontend development server:

cd frontend
npm run start

3. Open your browser and navigate to `http://localhost:3001` to use the application.

## API Keys

To use the Mapbox API and Yelp Fusion API, you need to obtain API keys from Mapbox and Yelp.

1. Update the `.env` file in the `frontend` directory with your Mapbox API key:

REACT_APP_MAPBOX_ACCESS_TOKEN=your_mapbox_api_key

2. Update the `.env` files in the `env` directory of the `backend` directory with your API keys:

YELP_API_KEY=your_yelp_api_key

## Future Improvements and Development Plans

### Current Developments

- Send message to phone number and store that phone number in the database.

### Code Refactoring and Technical Enhancements

- _express-generator-typescript_ is overkill; only a single route is needed for retrieving the restaurant data.
- Move each section of the page to a separate file and use the context API to manage shared state across the components.

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

- Thanks to Mapbox and Yelp for providing their APIs. All restaurant images are from the Yelp API.
- Hat tip to the developers of React, Express.js, and other open-source libraries used in this project.
