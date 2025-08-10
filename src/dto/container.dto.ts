/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SpinupContainerDTO {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsOptional()
  repoFullName: string;


  @IsString()
  @IsOptional()
  branchName: string;
}
