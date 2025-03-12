# Property Connect

Property Connect is a rental management application that allows users to browse available properties, schedule viewings, and contact property owners. It features a Node.js backend and a React frontend.

## Features
- **Authentication**: User registration and login.
- **Homepage**: Displays available rentals.
- **Search & Filtering**: Users can search properties by location, price range, and property type.
- **Booking & Purchase**: Schedule a rental, buy a rental, and contact the property owner.
- **Seller Panel**: Manage your property listings.

## Tech Stack
- **Backend**: Node.js, Express, MySQL
- **Frontend**: React.js, TailWind
- **Database**: MySQL


## Installation
### Prerequisites
- Node.js installed
- MySQL installed

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/property-connect.git
   cd property-connect/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | /rentals             | Get all available rentals         |
| GET    | /rentals/:id         | Get details of a specific rental  |
| POST   | /register            | Register a new user               |
| POST   | /login               | Authenticate user login           |
| POST   | /upload-rental       | Upload a new rental property      |

## License
This project is licensed under the MIT License.