// import axios, {CreateAxiosDefaults} from "axios";
// import {EmployeeDto} from "../employee/dto/employee.dto";
//
// const data = JSON.stringify({
//     'scope': 'GIGACHAT_API_PERS'
// });
// const configTokens: CreateAxiosDefaults  = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     baseURL: 'https://ngw.devices.sberbank.ru:9443',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Accept': 'application/json',
//         'RqUID': 'd5372802-3a8f-4095-a787-bf2ff89e0d34',
//         'Authorization': 'Basic YmRmZDkyZWItNTA2Yi00YjRjLWJiOTItNjg0YTMwY2Q2NzlkOjZkNTg4MDllLThiYTUtNDFkNS1hZWMyLWM2MjlkMDU0MjgxNw=='
//     },
//     data : data
// };
//
// interface IToken {
//     access_token: string
//     expires_at: number
// }
//
// export const AxiosApiToken = axios.create(configTokens)
//
// const configPrompt: CreateAxiosDefaults = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     baseURL: 'https://gigachat.devices.sberbank.ru/api',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Accept': 'application/json'
//     }
// };
//
// const AxiosApi = axios.create(configPrompt)
//
// AxiosApi.interceptors.request.use((config) => {
//     const accessToken = AxiosApiToken.post<IToken>('/api/v2/oauth', data)
//
//     if (config?.headers && accessToken)
//         config.headers.Authorization = `Bearer ${accessToken}`
//
//     return config
// })
//
// AxiosApi.interceptors.response.use(
//     config => config,
//     async error => {
//         const originalRequest = error.config
//
//         if (
//             error?.response?.status === 401 &&
//             !error.config._isRetry
//         ) {
//             originalRequest._isRetry = true
//             return AxiosApi.request(originalRequest)
//         }
//
//         throw error
//     })
//
// export const AxiosApiPrompt = AxiosApi
//
// export const getPromptData = (employee: EmployeeDto) => {
//     const promptData = {
//         model: "GigaChat",
//         messages: [
//             {
//                 role: "user",
//                 content: 'Напиши поздравления сотрудника с днем рождения '
//             }
//         ],
//         n: 1,
//         stream: false,
//         max_tokens: 512,
//         repetition_penalty: 1,
//         update_interval: 0
//     }
//
//     promptData.messages[0].content += employee.surname + employee.name + employee.middleName + employee.post
//
//     return promptData
// }