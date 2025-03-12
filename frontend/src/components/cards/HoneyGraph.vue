<template>
  <div>
    <!-- Main title of the page, explaining the data shown -->
    <h2>Honey Production and Weather Data (2024)</h2>
    
    <!-- Subheading explaining the regions -->
    <h3>Honey Production and Weather Data for (Andalucia, Castilla y Leon, Extremadura):</h3>
    
    <!-- Loop through each year (2021-2024) and display a chart for each -->
    <div v-for="year in years" :key="year">
      <!-- Display the current year -->
      <h4>{{ year }}</h4>
      
      <!-- Create and display the chart for the current year using the getChartUrl function -->
      <img :src="getChartUrl(year)" alt="Weather and Honey Production Chart" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'; // Import Vue functions needed for reactivity

export default {
  name: 'HoneyProduction', // Name of the Vue component

  setup() {
    // Define an array of years (2021 to 2024) that we are interested in
    const years = [ '2024'];

    // Define an array of regions where the data will be displayed
    const regions = ['Andalucía', 'Castilla y León', 'Extremadura'];

    // Define data for honey production (in KT) for each region and year
    const honeyProductionData = {
      '2021': [7.3597, 5.4485, 4.2511],
      '2022': [4.7791, 3.8779, 6.3472],
      '2023': [3.9531, 4.3973, 3.5584],
      '2024': [4.8526, 4.9972, 3.9834]
    };

    // Define data for temperature (in °C) for each region and year
    const temperatureData = {
      '2021': [18.5, 13.5, 16.8],
      '2022': [19.0, 13.6, 17.0],
      '2023': [19.2, 13.7, 17.2],
      '2024': [19.5, 14.0, 17.5]
    };

    // Define data for humidity (in %) for each region and year
    const humidityData = {
      '2021': [55, 50, 60],
      '2022': [53, 58, 47],
      '2023': [52, 59, 48],
      '2024': [51, 60, 49]
    };

    // Define data for solar radiation (in hrs/day) for each region and year
    const solarRadiationData = {
      '2021': [7.7, 5.8, 8.0],
      '2022': [7.8, 5.9, 8.1],
      '2023': [8.0, 6.0, 8.2],
      '2024': [8.2, 6.1, 8.3]
    };

    // Define data for precipitation (in mm/month) for each region and year
    const precipitationData = {
      '2021': [78.56, 117.15, 53.45],
      '2022': [133.75, 128.77, 71.04],
      '2023': [100.26, 114.69, 43.88],
      '2024': [137.31, 128.10, 65.82]
    };

    // Function that generates a chart URL for a specific year
    const getChartUrl = (year) => {
      // Chart configuration object, setting up chart appearance
      const chartConfig = {
        type: 'bar', // Type of chart is a bar chart

        data: {
          labels: regions, // X-axis will have the regions as labels

          datasets: [
            {
              label: `${year} Honey Production (KTons)`, // Dataset label for honey production
              data: honeyProductionData[year], // Data for honey production in that year
              backgroundColor: '#4D6C32', // Honey production bars will be green
              borderColor: 'white', // White border around bars
              borderWidth: 1 // Border width
            },
            {
              label: `${year} Temperature (°C)`, // Dataset label for temperature
              data: temperatureData[year], // Data for temperature in that year
              backgroundColor: 'red', // Temperature bars will be red
              borderColor: 'white',
              borderWidth: 1
            },
            {
              label: `${year} Humidity (%)`, // Dataset label for humidity
              data: humidityData[year], // Data for humidity in that year
              backgroundColor: '#4A9BA9', // Humidity bars will be teal
              borderColor: 'white',
              borderWidth: 1
            },
            {
              label: `${year} Solar Radiation (hrs/day)`, // Dataset label for solar radiation
              data: solarRadiationData[year], // Data for solar radiation in that year
              backgroundColor: '#2D4254', // Solar radiation bars will be dark blue
              borderColor: 'white',
              borderWidth: 1
            },
            {
              label: `${year} Precipitation (mm/year)`, // Dataset label for precipitation
              data: precipitationData[year], // Data for precipitation in that year
              backgroundColor: '#A3D55D', // Precipitation bars will be light green
              borderColor: 'white',
              borderWidth: 1
            }
          ]
        },

        options: {
          responsive: true, // Ensure the chart resizes for different screen sizes
          plugins: {
            title: {
              display: true, // Display the title on the chart
              text: `Weather and Honey Production Data for ${year}` // Dynamic title based on the year
            },
            datalabels: {
              display: true, // Display data labels on the chart bars
              color: 'black', // Color of the data labels
              font: {
                weight: 'bold', // Make the font bold
                size: 12 // Set the font size for the labels
              },
              formatter: (value) => value.toFixed(2) // Format data values to 2 decimal places
            }
          },
          scales: {
            x: {
              stacked: true // Stack the bars for each region in the chart
            },
            legend: {
              labels: {
                fontColor: 'blue',
                fontSize: 200,
              }
            },
            y: {
              beginAtZero: true, // Ensure Y-axis starts at 0
              grid: {
                color: '#4D6C32', // Grid color
              }
            }
          }
        }
      };

      // Return the generated URL for the chart with the encoded configuration
      return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    };

    // Return the reactive data (years) and function (getChartUrl) to the template
    return { years, getChartUrl };
  }
};
</script>

<style scoped>



h1 {
  font-size: 2rem;
  text-align: center; 
}

img {
  display: block;
  margin: 20px auto; 
  max-width: 100%;
  height: auto;
}
</style>
