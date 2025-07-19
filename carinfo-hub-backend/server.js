

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

// Add this line to define the absolute path to cars.json
const carsDataPath = path.join(__dirname, 'cars.json');
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(cors());

app.get('/api/cars', (req, res) => {
  fs.readFile(carsDataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Unable to fetch car data' });
    }
    
    const cars = JSON.parse(data);
    const { brand, fuel } = req.query;
    
    let filteredCars = cars;

    if (brand) {
      filteredCars = filteredCars.filter(car => 
        car.name.toLowerCase().includes(brand.toLowerCase())
      );
    }

    if (fuel) {
      filteredCars = filteredCars.filter(car => 
        car.fuel.toLowerCase() === fuel.toLowerCase()
      );
    }

    res.json(filteredCars);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

//find your 

app.get('/api/search', (req, res) => {
  fs.readFile(carsDataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load car data' });

    const cars = JSON.parse(data);
    const { name = '', fuel = '' } = req.query;

    const results = cars.filter(car => {
      const matchesName = car.name.toLowerCase().includes(name.toLowerCase());
      const matchesFuel = fuel ? car.fuel.toLowerCase() === fuel.toLowerCase() : true;
      return matchesName && matchesFuel;
    });

    res.json(results);
  });
});

// Add new search endpoint
app.get('/api/search/cars', (req, res) => {
  fs.readFile(carsDataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load car data' });

    const cars = JSON.parse(data);
    const { budget, fuel, transmission } = req.query;

    let filteredCars = cars;

    // Filter by fuel type and transmission remain the same
    if (fuel) {
      filteredCars = filteredCars.filter(car => car.fuel === fuel);
    }

    if (transmission) {
      filteredCars = filteredCars.filter(car => car.transmission === transmission);
    }

    // Updated price filtering logic
    if (budget) {
      filteredCars = filteredCars.filter(car => {
        // Extract numeric value from price string (e.g., "₹10.87 Lakh" -> 10.87)
        const priceInLakhs = parseFloat(car.price.replace(/[^\d.]/g, ''));
        // Convert to actual value in rupees
        const priceValue = priceInLakhs * 100000;

        switch (budget) {
          case 'under5':
            return priceInLakhs < 5;
          case '5to10':
            return priceInLakhs >= 5 && priceInLakhs <= 10;
          case '10to15':
            return priceInLakhs > 10 && priceInLakhs <= 15;
          case '15plus':
            return priceInLakhs > 15;
          default:
            return true;
        }
      });
    }

    res.json(filteredCars);
  });
});

// Add reset endpoint after existing endpoints
app.get('/api/search/reset', (req, res) => {
  fs.readFile(carsDataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load car data' });
    const cars = JSON.parse(data);
    res.json(cars);
  });
});

function updateDisabledOptions() {
  const selected1 = car1Select.value;
  const selected2 = car2Select.value;

  Array.from(car1Select.options).forEach(opt => {
    opt.disabled = opt.value === selected2;
  });

  Array.from(car2Select.options).forEach(opt => {
    opt.disabled = opt.value === selected1;
  });
}
