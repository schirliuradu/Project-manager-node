import { Request } from 'express'
import { StatusEnum } from '../../enums/status-enum'
import { RequestDtoInterface } from './interfaces/request-dto-interface'
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator'

type CreateProjectRequest = Request & {
  body: {
    title: string
    description: string
    status: string
  }
}

export class CreateProjectRequestDto implements RequestDtoInterface {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  @IsEnum(StatusEnum)
  status: string

  constructor(request: CreateProjectRequest) {
    this.title = request.body.title
    this.description = request.body.description
    this.status = request.body.status
  }

  public static fromRequest(req: CreateProjectRequest): CreateProjectRequestDto {
    return new CreateProjectRequestDto(req)
  }
}
