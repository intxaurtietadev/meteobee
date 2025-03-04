<template>
  <div>
    <!-- Main title of the page, explaining what data is shown -->
    <h2>Honey Production and Weather Data (2021-2024)</h2>
    
    <!-- Subheading explaining the chart will display data for these regions -->
    <h3>Honey Production and Weather Data for (Andalucia, Castilla y Leon, Extremadura):</h3>
    
    <!-- Loop over each year and display its respective chart -->
    <div v-for="year in years" :key="year">
      <!-- Display the year in a heading -->
      <h3>{{ year }}</h3>
      
      <!-- Dynamically create the chart for each year, calling the function getChartUrl(year) -->
      <img :src="getChartUrl(year)" alt="Weather and Honey Production Chart" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'HoneyProduction', // Name of the component

  setup() {
    // Define the years we are interested in (2021-2024)
    const years = ['2021', '2022', '2023', '2024'];

    // List of regions to display in the chart
    const regions = ['Andalucía', 'Castilla y León', 'Extremadura'];

    // Data for each year, structured in an object for easier access
    const honeyProductionData = {
      '2021': [7359.7, 5448.5, 4251.1],
      '2022': [7500.0, 5500.0, 4300.0],
      '2023': [7600.0, 5600.0, 4400.0],
      '2024': [7700.0, 5700.0, 4500.0]
    };

    const temperatureData = {
      '2021': [18.5, 13.5, 16.8],
      '2022': [19.0, 13.6, 17.0],
      '2023': [19.2, 13.7, 17.2],
      '2024': [19.5, 14.0, 17.5]
    };

    const humidityData = {
      '2021': [55, 50, 60],
      '2022': [53, 58, 47],
      '2023': [52, 59, 48],
      '2024': [51, 60, 49]
    };

    const solarRadiationData = {
      '2021': [7.7, 5.8, 8.0],
      '2022': [7.8, 5.9, 8.1],
      '2023': [8.0, 6.0, 8.2],
      '2024': [8.2, 6.1, 8.3]
    };

    const precipitationData = {
      '2021': [600, 450, 500],
      '2022': [650, 470, 510],
      '2023': [700, 490, 520],
      '2024': [750, 510, 530]
    };

    // Function to generate QuickChart URL for a specific year
    const getChartUrl = (year) => {
      // Chart configuration, defining the chart's type and appearance
      const chartConfig = {
        type: 'bar', // Set chart type to 'bar'
        
        // Data that will be plotted on the chart
        data: {
          labels: regions, // X-axis labels (regions)
          
          // Datasets corresponding to different variables
          datasets: [
            {
              label: `${year} Honey Production (Tons)`, // Label for honey production
              data: honeyProductionData[year], // Data for the specific year (honey production)
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color (honey production)
              borderColor: 'rgb(75, 192, 192)', // Border color for the bars
              borderWidth: 1 // Border width
            },
            {
              label: `${year} Temperature (°C)`, // Label for temperature
              data: temperatureData[year], // Data for the specific year (temperature)
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color (temperature)
              borderColor: 'rgb(255, 99, 132)', // Border color for the bars
              borderWidth: 1 // Border width
            },
            {
              label: `${year} Humidity (%)`, // Label for humidity
              data: humidityData[year], // Data for the specific year (humidity)
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bar color (humidity)
              borderColor: 'rgb(54, 162, 235)', // Border color for the bars
              borderWidth: 1 // Border width
            },
            {
              label: `${year} Solar Radiation (hrs/day)`, // Label for solar radiation
              data: solarRadiationData[year], // Data for the specific year (solar radiation)
              backgroundColor: 'rgba(153, 102, 255, 0.2)', // Bar color (solar radiation)
              borderColor: 'rgb(153, 102, 255)', // Border color for the bars
              borderWidth: 1 // Border width
            },
            {
              label: `${year} Precipitation (mm/year)`, // Label for precipitation
              data: precipitationData[year], // Data for the specific year (precipitation)
              backgroundColor: 'rgba(255, 159, 64, 0.2)', // Bar color (precipitation)
              borderColor: 'rgb(255, 159, 64)', // Border color for the bars
              borderWidth: 1 // Border width
            }
          ]
        },
        
        // Chart options
        options: {
          responsive: true, // Make the chart responsive
          plugins: {
            title: {
              display: true, // Display the title on the chart
              text: `Weather and Honey Production Data for ${year}` // Title for the chart, dynamically set
            },
            datalabels: {
              display: true, // Display the data labels on each bar
              color: 'black', // Color of the data labels
              font: {
                weight: 'bold', // Make the font bold
                size: 12 // Set the font size
              },
              formatter: (value) => value.toFixed(2) // Format the value to 2 decimal places
            }
          },
          scales: {
            x: {
              stacked: true // Stack the bars for each region
            },
            y: {
              beginAtZero: true ,// Ensure the Y-axis starts from zero
              grid: {
                color: '#4D6C32',
              }
            }
          }
        }
      };

      // Return the QuickChart URL with encoded chart configuration
      return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    };

    // Return the reactive variables and methods so they can be accessed in the template
    return { years, getChartUrl };
  }
};
</script>

<style scoped>
/* Styling for the page */
h1 {
  font-size: 2rem; /* Title font size */
  text-align: center; /* Center the title */
}

img {
  display: block; /* Make image a block element */
  margin: 20px auto; /* Center the image with a margin */
  max-width: 100%; /* Ensure the image scales to fit the container */
  height: auto; /* Maintain aspect ratio */
}
</style>
