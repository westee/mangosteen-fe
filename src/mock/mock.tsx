import { faker } from "@faker-js/faker";
import { AxiosRequestConfig } from "axios";

type Mock = (config: AxiosRequestConfig) => [number, any];

faker.setLocale("zh_CN");

export const mockItemCreate: Mock = config => {
  return [200, {
    resource: {
      "id": 2264,
      "user_id": 1312,
      "amount": 9900,
      "note": null,
      "tags_id": [3508],
      "happen_at": "2020-10-29T16:00:00.000Z",
      "created_at": "2022-07-03T15:35:56.301Z",
      "updated_at": "2022-07-03T15:35:56.301Z",
      "kind": "expenses"
    }
  }]
}

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ];
};

let id = 0;
const createId = () => {
  id += 1;
  return id;
};

export const mockTagIndex: Mock = (config) => {
  const createTag = (n = 1, attrs?: any) => {
    return Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs,
    }));
  };

  if (config.params.kind === "expenses") {
    console.log(createTag(7));

    return [200, { resources: createTag(7), pager: { page: 1 } }];
  } else {
    return [200, { resources: createTag(20), pager: { page: 1 } }];
  }
};
