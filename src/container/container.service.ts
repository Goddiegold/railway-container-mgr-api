/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { gql, request } from 'graphql-request';
import { Config } from 'src/config';

@Injectable()
export class ContainerService {
  private railwayGqlUrl = Config.RAILWAY.GQL_URL;
  private railwayGqlheaders = {
    Authorization: `Bearer ${Config.RAILWAY.API_TOKEN}`,
  }
  // Spin up (create) a service/container
  async spinUp({
    repo,
    branch = "main",
  }: {
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
          projectId: Config.RAILWAY.PROJECT_ID,
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
      throw new InternalServerErrorException('Failed to spin up container!')
    }
  }


  // Spin down (delete) a service/container by serviceId
  async spinDown({ serviceId }: { serviceId: string }) {
    try {
      const mutation = gql`
     mutation serviceDelete($environmentId: String, $id: String!) {
  serviceDelete(environmentId: $environmentId, id: $id)
}
    `;

      const variables = {
        id: serviceId,
        "environmentId": Config.RAILWAY.PROJECT_ENV_ID
      };

      return request(this.railwayGqlUrl, mutation, variables, this.railwayGqlheaders);
    } catch (e) {
      console.log(JSON.stringify({ e }, null, 2));
      throw new InternalServerErrorException('Failed to spin down container!')

    }

  }

  // Get a service/container by serviceId
  async getService({ serviceId }: { serviceId: string }) {
    try {
      const query = gql`
  query service($id: String!) {
  service(id: $id) {
    __typename
    createdAt
    deletedAt
    # deployments
    icon
    id
    name
    # project
    projectId
    # repoTriggers
    # serviceInstances
    templateThreadSlug
    updatedAt
  }
}`;

      const variables = { id: serviceId };

      const res = await request(this.railwayGqlUrl, query, variables, this.railwayGqlheaders);
      console.log(JSON.stringify({ res }, null, 2));
      return res;
    } catch (e) {
      console.log(JSON.stringify({ e }, null, 2));
      throw new InternalServerErrorException(`Failed to retrieve container [${serviceId}]!`)
    }

  }
}
