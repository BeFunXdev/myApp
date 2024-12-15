import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import {PrismaService} from "../prisma.service";
import {HttpService} from "@nestjs/axios";
import {IToken} from "./api.types";
@Injectable()
export class AiApiService {

    accessToken = ''

    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService
    ) {
        this.httpService.axiosRef.interceptors.request.use( async (config) => {

            if (!config?.headers?.RqUID && !this.accessToken) {
                console.log('okey')
                console.log(this.accessToken)
                this.accessToken = await this.getAccessToken().then(data => data.data.access_token)
            }

            if (config?.headers && this.accessToken && !config?.headers?.RqUID) {
                console.log('ok')
                config.headers.Authorization = `Bearer ${this.accessToken}`
            }

            return config
        })

        this.httpService.axiosRef.interceptors.response.use(
            config => config,
            async error => {
                const originalRequest = error.config

                if (
                    !error.config?.headers?.RqUID
                ) {
                    console.log('error')
                    console.log(this.accessToken)
                    return this.httpService.axiosRef.request(originalRequest)
                } else {
                    this.accessToken = ''
                }

                throw new BadRequestException('test')
            }
        )
    }

    async getAccessToken() {
        const accessToken = this.httpService.axiosRef.post<IToken>(
          'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
          "scope=GIGACHAT_API_PERS",
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json',
                  'RqUID': 'd5372802-3a8f-4095-a787-bf2ff89e0d56',
                  "Authorization": "Basic YmRmZDkyZWItNTA2Yi00YjRjLWJiOTItNjg0YTMwY2Q2NzlkOjY0ZTk4Y2ViLTE5N2MtNDJhNi1hZTZhLTdmN2JlZjJmN2Y4Yw=="
              }
          }
        )
        return await accessToken
    }

    async getPrompt(employeeId: string) {
        const employee = await this.prisma.employee.findFirst({
            where: {
                id: employeeId
            },
            include: {
                post: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!employee) throw new NotFoundException('Not found employee')

        console.log('ok')

        return await this.gigaChatPrompt(employee)
    }

    private async gigaChatPrompt(promptUser) {
        console.log(this.getPromptData(promptUser))
        return this.httpService.axiosRef.post(
            'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
            this.getPromptData(promptUser),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'X-Atlassian-Token': 'nocheck'
                }
            }
        )
    }

    private getPromptData(employee) {
        const promptData = {
            model: "GigaChat",
            messages: [
                {
                    role: "user",
                    content: "Напиши поздравления сотрудника с днем рождения "
                }
            ],
            n: 1,
            stream: false,
            max_tokens: 512,
            repetition_penalty: 1,
            update_interval: 0
        }

        promptData.messages[0].content += `${employee.surname} ${employee.name} ${employee.middleName} ${employee.post.name}`

        return promptData
    }
}
