# ShortLink Analytics Dashboard


## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup) <!-- If applicable -->
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Security & Compliance](#security--compliance)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

The **ShortLink Analytics Dashboard** is a comprehensive web-based application designed to empower marketers, advertisers, and businesses by providing an efficient URL shortening service coupled with in-depth analytics. Users can create short, memorable URLs for their campaigns, monitor their performance in real-time, and derive actionable insights to optimize their marketing strategies.

## Features

### User Authentication & Management
- **Registration & Login:** Secure user onboarding with JWT-based authentication.
- **Subscription Plans:** Support for different user tiers (e.g., FREE, PREMIUM) with varying features and limitations.

### URL Shortening
- **Custom Aliases:** Users can create personalized shortcodes for their URLs.
- **Automatic Shortcode Generation:** Generates unique shortcodes using libraries like `nanoid`.
- **Redirection:** Seamless redirection from short URLs to their original destinations.

### Analytics & Reporting
- **Click Tracking:** Monitors the number of clicks each short URL receives.
- **Geographic Insights:** Displays the geographic locations of visitors.
- **Device & Browser Data:** Analyzes the devices and browsers used by visitors.
- **Referrer Information:** Identifies sources driving traffic to the short URLs.
- **Real-Time Data:** Provides live monitoring of URL performance.

### Dashboard Interface
- **Interactive Charts & Graphs:** Visualize data using libraries like Recharts in React.
- **Filters & Search:** Allows users to filter analytics based on date ranges, campaigns, locations, etc.
- **Export Reports:** Enables exporting of data in formats like CSV or PDF for offline analysis.

### Security & Compliance
- **Input Validation & Sanitization:** Ensures all incoming data is validated and sanitized.
- **Rate Limiting:** Prevents abuse by limiting the number of requests from a single IP.
- **Secure HTTP Headers:** Utilizes Helmet to set secure HTTP headers.
- **Data Encryption:** Encrypts sensitive data both at rest and in transit.
- **Compliance:** Adheres to data privacy regulations like GDPR through data anonymization and user consent mechanisms.

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT (jsonwebtoken)
- **Logging:** Winston
- **Validation:** express-validator
- **Security:** Helmet, express-rate-limit
- **Utilities:** nanoid, UA-Parser-JS, IP Geolocation APIs (e.g., MaxMind GeoIP2)

### Frontend
*(If applicable, otherwise remove)*
- **Library:** React.js
- **Visualization:** Recharts
- **HTTP Client:** Axios
- **Routing:** React Router
- **State Management:** Redux or React Context API


## Architecture


The application follows a **Modular MVC** architecture, separating concerns across different layers:

1. **Database Layer:** Prisma ORM connects to MongoDB Atlas, managing data models and relationships.
2. **Backend Layer:** Express.js serves API endpoints, handling business logic through controllers.
3. **Frontend Layer:** React.js interfaces with the backend APIs, presenting data via interactive dashboards.
4. **Security Layer:** Middleware implementations ensure secure data handling and compliance with regulations.

## Setup & Installation

### Prerequisites
- **Node.js** (v14.x or later)
- **npm** 
- **MongoDB Atlas** account for database hosting
- **Git** for version control


### Backend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Grundrak/shortlink-analytics-dashboard.git
   cd shortlink-analytics-dashboard/server