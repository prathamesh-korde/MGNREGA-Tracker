const mongoose = require('mongoose');
const DistrictMaster = require('../models/DistrictMaster');
const DistrictPerformance = require('../models/DistrictPerformance');
require('dotenv').config();

// Sample data for Maharashtra state
const maharashtraDistricts = [
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH01', districtName: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH02', districtName: 'Pune', latitude: 18.5204, longitude: 73.8567 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH03', districtName: 'Nagpur', latitude: 21.1458, longitude: 79.0882 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH04', districtName: 'Nashik', latitude: 19.9975, longitude: 73.7898 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH05', districtName: 'Aurangabad', latitude: 19.8762, longitude: 75.3433 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH06', districtName: 'Thane', latitude: 19.2183, longitude: 72.9781 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH07', districtName: 'Solapur', latitude: 17.6599, longitude: 75.9064 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH08', districtName: 'Ahmednagar', latitude: 19.0948, longitude: 74.7480 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH09', districtName: 'Kolhapur', latitude: 16.7050, longitude: 74.2433 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH10', districtName: 'Amravati', latitude: 20.9374, longitude: 77.7796 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH11', districtName: 'Sangli', latitude: 16.8524, longitude: 74.5815 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH12', districtName: 'Jalgaon', latitude: 21.0077, longitude: 75.5626 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH13', districtName: 'Satara', latitude: 17.6805, longitude: 74.0183 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH14', districtName: 'Akola', latitude: 20.7333, longitude: 77.0000 },
  { stateCode: 'MH', stateName: 'Maharashtra', districtCode: 'MH15', districtName: 'Latur', latitude: 18.3984, longitude: 76.5604 },
];

// Function to generate random performance data
function generatePerformanceData(district, financialYear, month) {
  const totalJobCards = Math.floor(Math.random() * 100000) + 50000;
  const activeJobCards = Math.floor(totalJobCards * (0.4 + Math.random() * 0.3));
  const budgetAllocated = Math.floor(Math.random() * 500000000) + 200000000;
  const budgetUtilized = Math.floor(budgetAllocated * (0.6 + Math.random() * 0.3));

  return {
    stateCode: district.stateCode,
    stateName: district.stateName,
    districtCode: district.districtCode,
    districtName: district.districtName,
    financialYear,
    month,
    totalJobCards,
    activeJobCards,
    employmentProvided: Math.floor(activeJobCards * (0.7 + Math.random() * 0.2)),
    personDaysGenerated: Math.floor(activeJobCards * (40 + Math.random() * 50)),
    averageDaysPerHousehold: Math.floor(30 + Math.random() * 40),
    workCompleted: Math.floor(Math.random() * 500) + 200,
    workInProgress: Math.floor(Math.random() * 300) + 100,
    budgetAllocated,
    budgetUtilized,
    utilizationPercentage: Math.floor((budgetUtilized / budgetAllocated) * 100),
    wagesPaid: Math.floor(budgetUtilized * 0.7),
    materialCost: Math.floor(budgetUtilized * 0.3),
  };
}

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await DistrictMaster.deleteMany({});
    await DistrictPerformance.deleteMany({});
    console.log('Cleared existing data');

    // Insert district master data
    await DistrictMaster.insertMany(maharashtraDistricts);
    console.log('Seeded district master data');

    // Generate performance data for last 12 months
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const financialYear = '2024-25';
    
    const performanceData = [];
    
    for (const district of maharashtraDistricts) {
      for (let i = 0; i < 12; i++) {
        performanceData.push(generatePerformanceData(district, financialYear, months[i]));
      }
    }

    // Also add data for previous year
    const prevFinancialYear = '2023-24';
    for (const district of maharashtraDistricts) {
      for (let i = 0; i < 12; i++) {
        performanceData.push(generatePerformanceData(district, prevFinancialYear, months[i]));
      }
    }

    await DistrictPerformance.insertMany(performanceData);
    console.log('Seeded performance data');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
