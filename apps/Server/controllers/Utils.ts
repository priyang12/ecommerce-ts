import { Request } from "express";

export type params = {
  sort: string;
  filter: string;
  page: string;
  perPage: string;
  select: string;
};

export type ParamsRequest = Request<{}, {}, {}, params>;

type defaultType = {
  filter: object;
  sort: object | string;
  select: string;
  page: number;
  perPage: number;
};

export const GetParams = (
  query: Partial<params>,
  DefaultValue: Partial<defaultType>
) => {
  const { select, page, filter, perPage, sort } = query;

  const NewObj = {
    select: select ? select.split(",") : DefaultValue.select,
    filter: filter ? JSON.parse(filter) : DefaultValue.filter,
    sort: sort ? JSON.parse(JSON.stringify(sort)) : DefaultValue.sort,
    page: page ? parseInt(page) : (DefaultValue.page as number),
    perPage: perPage ? parseInt(perPage) : (DefaultValue.perPage as number),
  };
  return NewObj;
};
