import { Injectable, NotFoundException } from '@nestjs/common'
import {PrismaService} from "../prisma.service";
import {HttpService} from "@nestjs/axios";
import {IToken} from "./api.types";
@Injectable()
export class AiApiService {
    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService
    ) {
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

        console.log('employee: ', employee)

        return await this.gigaChatPrompt(employee)
    }

    private async gigaChatPrompt(promptUser) {
        const accessToken = await this.getAccessToken().then(data => data.data.access_token)

        console.log('accessToken', accessToken)
        console.log(JSON.stringify(this.getPromptData(promptUser)))
        return this.httpService.axiosRef.post(
            'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
            this.getPromptData(promptUser),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
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
