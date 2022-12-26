import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const weatherApiHeaders = {
    'X-RapidAPI-Key': '4173325277msh9d2c8abd90bdcf8p1cd329jsnc97124ee98b3',
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    
}

// const params = {
//     q: 'London,uk',
//     lat: '0',
//     lon: '0',
//     callback: 'test',
//     id: '2172797',
//     lang: 'null',
//     units: 'imperial',
//     mode: 'xml'
//   }

const baseUrl = 'https://community-open-weather-map.p.rapidapi.com'

const createRequest = (url) => ({
    url,
    headers: weatherApiHeaders,
})

console.log('haha')

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getWeather: builder.query({
            query: () => createRequest('/weather')
        })
    }) 
})

export const {
    useGetWeatherQuery,
} = weatherApi


















































// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const weatherApiHeaders = {
//     'X-RapidAPI-Key': '4173325277msh9d2c8abd90bdcf8p1cd329jsnc97124ee98b3',
//     'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
// }

// const baseUrl = 'https://community-open-weather-map.p.rapidapi.com'

// const createRequest = (url) => ({
//     url,
//     headers: weatherApiHeaders
// })

// export const weatherApi = createApi({
//     reducerPath: 'weatherApi',
//     baseQuery: fetchBaseQuery({baseUrl}),
//     endpoints: (builder) => ({
//         getWeather: builder.query({
//             query: () => createRequest('/forecast/daily')
//         })
//     })
// })


// export const {
//     useGetWeatherQuery,
// } = weatherApi








// // const options = {
// //     method: 'GET',
// //     url: 'https://community-open-weather-map.p.rapidapi.com/weather',
// //     params: {
// //       q: 'London,uk',
// //       lat: '0',
// //       lon: '0',
// //       callback: 'test',
// //       id: '2172797',
// //       lang: 'null',
// //       units: 'imperial',
// //       mode: 'xml'
// //     },
// //     headers: {
// //       'X-RapidAPI-Key': '4173325277msh9d2c8abd90bdcf8p1cd329jsnc97124ee98b3',
// //       'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
// //     }
// //   }