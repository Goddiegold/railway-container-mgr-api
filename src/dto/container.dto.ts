/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString } from 'class-validator';

export class SpinupContainerDTO {
  @IsString()
  @IsOptional()
  repoFullName: string;


  @IsString()
  @IsOptional()
  branchName: string;
}
