const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = 'http://20.244.56.144/train/trains';


app.use(express.json());


app.get('/trains', async (req, res) => {
  try {

    const trainsData = await getTrainData();


    const twelveHoursFromNow = Date.now() + 12 * 60 * 60 * 1000;
    const filteredTrains = trainsData.filter(train => {
      const departureTime = getMillisecondsFromTime(train.departureTime);
      return departureTime > Date.now() && departureTime < twelveHoursFromNow;
    });


    filteredTrains.sort((a, b) => {
      if (a.price.AC !== b.price.AC) {
        return a.price.AC - b.price.AC;
      } else if (a.seatsAvailable.AC !== b.seatsAvailable.AC) {
        return b.seatsAvailable.AC - a.seatsAvailable.AC;
      } else {
        const aDepartureTime = getMillisecondsFromTime(a.departureTime);
        const bDepartureTime = getMillisecondsFromTime(b.departureTime);
        return aDepartureTime - bDepartureTime;
      }
    });

    res.json(filteredTrains);
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function getTrainData() {
  const authToken = await getAuthToken();
  const headers = { Authorization: `Bearer ${authToken}` };
  const response = await axios.get(BASE_URL, { headers });
  return response.data;
}


async function getAuthToken() {
  const express = require('express');
  const axios = require('axios');

  const app = express();
  const PORT = process.env.PORT || 3000;
  const BASE_URL = 'http://20.244.56.144/train/trains';
  let authToken = '';


  app.use(express.json());


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


  app.get('/trains', async (req, res) => {
    try {

      const trainsData = await getTrainData();


      const twelveHoursFromNow = Date.now() + 12 * 60 * 60 * 1000;
      const filteredTrains = trainsData.filter(train => {
        const departureTime = getMillisecondsFromTime(train.departureTime);
        return departureTime > Date.now() && departureTime < twelveHoursFromNow;
      });


      filteredTrains.sort((a, b) => {
        if (a.price.AC !== b.price.AC) {
          return a.price.AC - b.price.AC;
        } else if (a.seatsAvailable.AC !== b.seatsAvailable.AC) {
          return b.seatsAvailable.AC - a.seatsAvailable.AC;
        } else {
          const aDepartureTime = getMillisecondsFromTime(a.departureTime);
          const bDepartureTime = getMillisecondsFromTime(b.departureTime);
          return aDepartureTime - bDepartureTime;
        }
      });

      res.json(filteredTrains);
    } catch (error) {
      console.error('Error fetching train data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  async function getTrainData() {
    const headers = { Authorization: `Bearer ${authToken}` };
    const response = await axios.get(BASE_URL, { headers });
    return response.data;
  }


  async function getAuthToken() {
    const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = 'http://20.244.56.144/train/trains';
let authToken = '';


app.use(express.json());


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


app.get('/trains', async (req, res) => {
  try {
  
    const trainsData = await getTrainData();
    
   
    const twelveHoursFromNow = Date.now() + 12 * 60 * 60 * 1000;
    const filteredTrains = trainsData.filter(train => {
      const departureTime = getMillisecondsFromTime(train.departureTime);
      return departureTime > Date.now() && departureTime < twelveHoursFromNow;
    });
    
   
    filteredTrains.sort((a, b) => {
      if (a.price.AC !== b.price.AC) {
        return a.price.AC - b.price.AC; 
      } else if (a.seatsAvailable.AC !== b.seatsAvailable.AC) {
        return b.seatsAvailable.AC - a.seatsAvailable.AC; 
      } else {
        const aDepartureTime = getMillisecondsFromTime(a.departureTime);
        const bDepartureTime = getMillisecondsFromTime(b.departureTime);
        return aDepartureTime - bDepartureTime; 
      }
    });

    res.json(filteredTrains);
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function getTrainData() {
  const headers = { Authorization: `Bearer ${authToken}` };
  const response = await axios.get(BASE_URL, { headers });
  return response.data;
}


async function getAuthToken() {
 
  return 'mocked_auth_token';
}


function getMillisecondsFromTime(time) {
  const { Hours, Minutes, Seconds } = time;
  return new Date().setHours(Hours, Minutes, Seconds, 0);
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


    return 'mocked_auth_token';
  }

 
  function getMillisecondsFromTime(time) {
    const { Hours, Minutes, Seconds } = time;
    return new Date().setHours(Hours, Minutes, Seconds, 0);
  }


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return 'mocked_auth_token';
}


function getMillisecondsFromTime(time) {
  const { Hours, Minutes, Seconds } = time;
  return new Date().setHours(Hours, Minutes, Seconds, 0);
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
