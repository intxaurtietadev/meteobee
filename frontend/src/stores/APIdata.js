import { defineStore } from 'pinia';

export const useAPIdata = defineStore('APIdata', {
  state: () => ({
    municipioSelected: null,
    meteoData0: {  
      date: 0,
      precipitation: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      max_humidity: 0,
      min_humidity: 0,
      wind: 0,
      uv_index: 0
     }, 
     meteoData1: {  
      date: 0,
      precipitation: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      max_humidity: 0,
      min_humidity: 0,
      wind: 0,
      uv_index: 0
     }, 
     meteoData2: {  
      date: 0,
      precipitation: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      max_humidity: 0,
      min_humidity: 0,
      wind: 0,
      uv_index: 0
     }, 
     meteoData3: {  
      date: 0,
      precipitation: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      max_humidity: 0,
      min_humidity: 0,
      wind: 0,
      uv_index: 0
     }, 
     meteoData4: {  
      date: 0,
      precipitation: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      max_humidity: 0,
      min_humidity: 0,
      wind: 0,
      uv_index: 0
     }, 
     meteoData5: {  
      date: 0,
      precipitation: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      max_humidity: 0,
      min_humidity: 0,
      wind: 0,
      uv_index: 0
     }, 
     meteoData6: {  
      date: 0,
      precipitation: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      max_humidity: 0,
      min_humidity: 0,
      wind: 0,
      uv_index: 0
     }, 

  }),

  actions: {
    setMunicipioSelected(municipio) {
      this.municipioSelected = municipio;
    },
    async fetchWeatherData(municipio) {
       this.setMunicipioSelected(municipio);
        const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZ20ubmVyZWFAZ21haWwuY29tIiwianRpIjoiNTZjZDU1NTEtMjJhOS00Yzk0LWE1NDAtMTdmZDkxZjY5OGYyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDAwNTYwMTMsInVzZXJJZCI6IjU2Y2Q1NTUxLTIyYTktNGM5NC1hNTQwLTE3ZmQ5MWY2OThmMiIsInJvbGUiOiIifQ.Zw95iuaxZ6Ggso8KFtFURogSvIT17uCbKXlHsVtScKc"; 
        let urlMeteo = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${municipio}/?api_key=${apiKey}`;

        const response = await fetch(urlMeteo);
        const data = await response.json();
        const urlData = data.datos;

        const response2 = await fetch(urlData);
        const data2 = await response2.json();

        console.log(data2);

        this.meteoData0 = {
          date: data2[0].prediccion.dia[0].fecha,
          precipitation: data2[0].prediccion.dia[0].probPrecipitacion[0].value ,
          snow: data2[0].prediccion.dia[0].cotaNieveProv[0].value,
          max_temp: data2[0].prediccion.dia[0].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[0].temperatura.minima,
          max_humidity: data2[0].prediccion.dia[0].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[0].humedadRelativa.minima,
          wind: data2[0].prediccion.dia[0].viento[0].velocidad,
          uv_index:  data2[0].prediccion.dia[0].uvMax
        };

        this.meteoData1 = {
          date: data2[0].prediccion.dia[1].fecha,
          precipitation: data2[0].prediccion.dia[1].probPrecipitacion[0].value ,
          snow: data2[0].prediccion.dia[1].cotaNieveProv[0].value,
          max_temp: data2[0].prediccion.dia[1].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[1].temperatura.minima,
          max_humidity: data2[0].prediccion.dia[1].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[1].humedadRelativa.minima,
          wind: data2[0].prediccion.dia[0].viento[1].velocidad,
          uv_index:  data2[0].prediccion.dia[1].uvMax
        };

        this.meteoData2 = {
          date: data2[0].prediccion.dia[2].fecha,
          precipitation: data2[0].prediccion.dia[2].probPrecipitacion[0].value ,
          snow: data2[0].prediccion.dia[2].cotaNieveProv[0].value,
          max_temp: data2[0].prediccion.dia[2].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[2].temperatura.minima,
          max_humidity: data2[0].prediccion.dia[2].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[2].humedadRelativa.minima,
          wind: data2[0].prediccion.dia[0].viento[2].velocidad,
          uv_index:  data2[0].prediccion.dia[2].uvMax
        };

        this.meteoData3 = {
          date: data2[0].prediccion.dia[3].fecha,
          precipitation: data2[0].prediccion.dia[3].probPrecipitacion[0].value ,
          snow: data2[0].prediccion.dia[3].cotaNieveProv[0].value,
          max_temp: data2[0].prediccion.dia[3].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[3].temperatura.minima,
          max_humidity: data2[0].prediccion.dia[3].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[3].humedadRelativa.minima,
          wind: data2[0].prediccion.dia[0].viento[3].velocidad,
          uv_index:  data2[0].prediccion.dia[3].uvMax
        };

        this.meteoData4 = {
          date: data2[0].prediccion.dia[4].fecha,
          precipitation: data2[0].prediccion.dia[4].probPrecipitacion[0].value ,
          snow: data2[0].prediccion.dia[4].cotaNieveProv[0].value,
          max_temp: data2[0].prediccion.dia[4].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[4].temperatura.minima,
          max_humidity: data2[0].prediccion.dia[4].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[4].humedadRelativa.minima,
          wind: data2[0].prediccion.dia[0].viento[4].velocidad,
          uv_index:  data2[0].prediccion.dia[4].uvMax
        };

        this.meteoData5 = {
          date: data2[0].prediccion.dia[5].fecha,
          precipitation: data2[0].prediccion.dia[5].probPrecipitacion[0].value ,
          snow: data2[0].prediccion.dia[5].cotaNieveProv[0].value,
          max_temp: data2[0].prediccion.dia[5].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[5].temperatura.minima,
          max_humidity: data2[0].prediccion.dia[5].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[5].humedadRelativa.minima,
          wind: data2[0].prediccion.dia[0].viento[5].velocidad,
          uv_index:  data2[0].prediccion.dia[5].uvMax
        };

        this.meteoData6 = {
          date: data2[0].prediccion.dia[6].fecha,
          precipitation: data2[0].prediccion.dia[6].probPrecipitacion[0].value ,
          snow: data2[0].prediccion.dia[6].cotaNieveProv[0].value,
          max_temp: data2[0].prediccion.dia[6].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[6].temperatura.minima,
          max_humidity: data2[0].prediccion.dia[6].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[6].humedadRelativa.minima,
          wind: data2[0].prediccion.dia[0].viento[6].velocidad,
          uv_index:  data2[0].prediccion.dia[6].uvMax
        };
        
        console.log(this.meteoData0);
        console.log(this.meteoData1);
        console.log(this.meteoData2);
        console.log(this.meteoData3);
        console.log(this.meteoData4);
        console.log(this.meteoData5);
        console.log(this.meteoData6);
        
        
      },
      reset() {
        this.meteoData0 = {  
          date: 0,
          precipitation: 0,
          snow: 0,
          max_temp: 0,
          min_temp: 0,
          max_humidity: 0,
          min_humidity: 0,
          wind: 0,
          uv_index: 0
        };
      },

  },
  persist: true 
})