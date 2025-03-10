import { defineStore } from 'pinia';
import municipiosData from "@/assets/Municipios.json";

export const useAPIdata = defineStore('APIdata', {
  state: () => ({
    provinciaSelected: null,
    municipioSelected: null,
    muniSel: null,
    meteoData0: {  
      date: 0,
      precipitation: 0,
      precipitation06: 0,
      precipitation12: 0,
      precipitation18: 0,
      precipitation24: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      temp06: 0,
      temp12: 0,
      temp18: 0,
      temp24: 0,
      max_humidity: 0,
      min_humidity: 0,
      humidity06: 0,
      humidity12: 0,
      humidity18: 0,
      humidity24: 0,
      wind: 0,
      wind06: 0,
      wind12: 0,
      wind18: 0,
      wind24: 0,
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
    setProvinciaSelected(provincia) {
      this.provinciaSelected = provincia;
    },

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
          precipitation: data2[0].prediccion.dia[0].probPrecipitacion[0].value,
          precipitation06: data2[0].prediccion.dia[0].probPrecipitacion[3].value,
          precipitation12: data2[0].prediccion.dia[0].probPrecipitacion[4].value,
          precipitation18: data2[0].prediccion.dia[0].probPrecipitacion[5].value,
          precipitation24: data2[0].prediccion.dia[0].probPrecipitacion[6].value,
          snow: data2[0].prediccion.dia[0].cotaNieveProv[0].value || 0,
          max_temp: data2[0].prediccion.dia[0].temperatura.maxima,
          min_temp: data2[0].prediccion.dia[0].temperatura.minima,
          temp06: data2[0].prediccion.dia[0].temperatura.dato[0].value,
          temp12: data2[0].prediccion.dia[0].temperatura.dato[1].value,
          temp18: data2[0].prediccion.dia[0].temperatura.dato[2].value,
          temp24: data2[0].prediccion.dia[0].temperatura.dato[3].value,
          max_humidity: data2[0].prediccion.dia[0].humedadRelativa.maxima,
          min_humidity: data2[0].prediccion.dia[0].humedadRelativa.minima,
          humidity06: data2[0].prediccion.dia[0].humedadRelativa.dato[0].value,
          humidity12: data2[0].prediccion.dia[0].humedadRelativa.dato[1].value, 
          humidity18: data2[0].prediccion.dia[0].humedadRelativa.dato[2].value,
          humidity24: data2[0].prediccion.dia[0].humedadRelativa.dato[3].value,
          wind: data2[0].prediccion.dia[0].viento[0].velocidad,
          wind06: data2[0].prediccion.dia[0].viento[1].velocidad,
          wind12: data2[0].prediccion.dia[0].viento[2].velocidad,
          wind18: data2[0].prediccion.dia[0].viento[3].velocidad,
          wind24: data2[0].prediccion.dia[0].viento[4].velocidad,
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
        this.provinciaSelected = null; // Resetear la provincia seleccionada
        this.municipioSelected = null;
        this.meteoData0 = {  
          date: 0,
      precipitation: 0,
      precipitation06: 0,
      precipitation12: 0,
      precipitation18: 0,
      precipitation24: 0,
      snow: 0,
      max_temp: 0,
      min_temp: 0,
      temp06: 0,
      temp12: 0,
      temp18: 0,
      temp24: 0,
      max_humidity: 0,
      min_humidity: 0,
      humidity06: 0,
      humidity12: 0,
      humidity18: 0,
      humidity24: 0,
      wind: 0,
      wind06: 0,
      wind12: 0,
      wind18: 0,
      wind24: 0,
      uv_index: 0
        };
      },

  },
  persist: true 
})