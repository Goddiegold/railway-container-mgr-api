/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, Injectable } from '@nestjs/common';
import { request, gql } from 'graphql-request';
import { Config } from 'src/config';

@Injectable()
export class ContainerService {
  private railwayGqlUrl = Config.RAILWAY.GQL_URL;
  private railwayGqlheaders = {
    Authorization: `Bearer ${Config.RAILWAY.API_TOKEN}`,
  }
  // Spin up (create) a service/container
  async spinUp({
    projectId,
    repo,
    branch = "main",
  }: {
    projectId: string;
    repo?: string;
    branch?: string;
  }) {
    try {
      const serviceCreateMutation = gql`
          mutation serviceCreate($input: ServiceCreateInput!) {
            serviceCreate(input: $input) {
              __typename
              createdAt
              deletedAt
              icon
              id
              name
              projectId
              templateThreadSlug
              updatedAt
         }
        }`;

      const variables: any = {
        input: {
          projectId,
        },
      };

      if (repo) {
        variables.input.source = {
          repo,
        };
        variables.input.branch = branch;
      }

      const res = await request(this.railwayGqlUrl, serviceCreateMutation, variables, this.railwayGqlheaders);
      console.log(JSON.stringify({ res }, null, 2));
      return res;
    } catch (e) {
      console.log(JSON.stringify({ e }, null, 2));
      throw new HttpException(e?.message || "Something went wrong", e?.status || 500)
    }
  }


  // Spin down (delete) a service/container by serviceId
  async spinDown({ serviceId }: { serviceId: string }) {
    const mutation = gql`
      mutation serviceDelete($id: ID!) {
        serviceDelete(id: $id) {
          id
        }
      }
    `;

    const variables = { id: serviceId };

    return request(this.railwayGqlUrl, mutation, variables, this.railwayGqlheaders);
  }

  // Get status of a service/container by serviceId
  async getStatus({ serviceId }: { serviceId: string }) {
    const query = gql`
      query service($id: ID!) {
        service(id: $id) {
          id
          name
          state
          url
        }
      }
    `;

    const variables = { id: serviceId };

    return request(this.railwayGqlUrl, query, variables, this.railwayGqlheaders);
  }
}
