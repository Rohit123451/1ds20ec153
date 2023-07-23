const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = 'http://20.244.56.144/train/trains';

// Middleware to handle the JSON response
app.use(express.json());

// GET endpoint to retrieve train schedules, seat availability, and pricing
app.get('/trains', async (req, res) => {
  try {
    // Fetching data from the John Doe Railway Server
    const trainsData = await getTrainData();
    
    // Filter trains departing in the next 12 hours (excluding trains in the next 30 minutes)
    const twelveHoursFromNow = Date.now() + 12 * 60 * 60 * 1000;
    const filteredTrains = trainsData.filter(train => {
      const departureTime = getMillisecondsFromTime(train.departureTime);
      return departureTime > Date.now() && departureTime < twelveHoursFromNow;
    });
    
    // Sort the filtered trains based on price, available seats, and departure time
    filteredTrains.sort((a, b) => {
      if (a.price.AC !== b.price.AC) {
        return a.price.AC - b.price.AC; // Ascending order of AC ticket price
      } else if (a.seatsAvailable.AC !== b.seatsAvailable.AC) {
        return b.seatsAvailable.AC - a.seatsAvailable.AC; // Descending order of AC seats availability
      } else {
        const aDepartureTime = getMillisecondsFromTime(a.departureTime);
        const bDepartureTime = getMillisecondsFromTime(b.departureTime);
        return aDepartureTime - bDepartureTime; // Descending order of departure time (after considering delays)
      }
    });

    res.json(filteredTrains);
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to get train data from the John Doe Railway Server
async function getTrainData() {
  const authToken = await getAuthToken();
  const headers = { Authorization: `Bearer ${authToken}` };
  const response = await axios.get(BASE_URL, { headers });
  return response.data;
}

// Function to get the Authorization Token
async function getAuthToken() {
  const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = 'http://20.244.56.144/train/trains';
let authToken = ''; // Store the authentication token once obtained

// Middleware to handle the JSON response
app.use(express.json());

// Middleware to authenticate requests with the obtained token
app.use((req, res, next) => {
  if (!authToken) {
    getAuthToken()
      .then(token => {
        authToken = token;
        next();
      })
      .catch(err => {
        console.error('Error obtaining authentication token:', err.message);
        res.status(500).json({ error: 'Authentication failed' });
      });
  } else {
    next();
  }
});

// GET endpoint to retrieve train schedules, seat availability, and pricing
app.get('/trains', async (req, res) => {
  try {
    // Fetching data from the John Doe Railway Server
    const trainsData = await getTrainData();
    
    // Filter trains departing in the next 12 hours (excluding trains in the next 30 minutes)
    const twelveHoursFromNow = Date.now() + 12 * 60 * 60 * 1000;
    const filteredTrains = trainsData.filter(train => {
      const departureTime = getMillisecondsFromTime(train.departureTime);
      return departureTime > Date.now() && departureTime < twelveHoursFromNow;
    });
    
    // Sort the filtered trains based on price, available seats, and departure time
    filteredTrains.sort((a, b) => {
      if (a.price.AC !== b.price.AC) {
        return a.price.AC - b.price.AC; // Ascending order of AC ticket price
      } else if (a.seatsAvailable.AC !== b.seatsAvailable.AC) {
        return b.seatsAvailable.AC - a.seatsAvailable.AC; // Descending order of AC seats availability
      } else {
        const aDepartureTime = getMillisecondsFromTime(a.departureTime);
        const bDepartureTime = getMillisecondsFromTime(b.departureTime);
        return aDepartureTime - bDepartureTime; // Descending order of departure time (after considering delays)
      }
    });

    res.json(filteredTrains);
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to get train data from the John Doe Railway Server
async function getTrainData() {
  const headers = { Authorization: `Bearer ${authToken}` };
  const response = await axios.get(BASE_URL, { headers });
  return response.data;
}

// Function to get the Authorization Token
async function getAuthToken() {
  // Replace with the actual registration and authentication logic based on the provided API documentation
  // For testing purposes, use a mocked token
  return 'mocked_auth_token';
}

// Helper function to convert hours, minutes, and seconds to milliseconds
function getMillisecondsFromTime(time) {
  const { Hours, Minutes, Seconds } = time;
  return new Date().setHours(Hours, Minutes, Seconds, 0);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  return 'mocked_auth_token';
}

// Helper function to convert hours, minutes, and seconds to milliseconds
function getMillisecondsFromTime(time) {
  const { Hours, Minutes, Seconds } = time;
  return new Date().setHours(Hours, Minutes, Seconds, 0);
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
