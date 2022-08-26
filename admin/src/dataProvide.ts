import { fetchUtils } from "react-admin";

const apiUrl = "/api";

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const LocalToken = localStorage.getItem("token");
  if (LocalToken) {
    const Token = LocalToken;
    options.headers.set("x-auth-token", Token);
  }
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = {
  getList: (resource: any, params: any) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const sort = [field, order === "ASC" ? "asc" : "desc"];
    const range = [(page - 1) * perPage, page * perPage - 1];
    const filter = Object.keys(params.filter).length !== 0 ? params.filter : "";
    const url = `${apiUrl}/${resource}?sort=${sort}&page=${page}&range=${range}&filter=${filter}`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json.map((resource: { _id: any }) => ({
        ...resource,
        id: resource._id,
      })),
      // @ts-ignore
      total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
    }));
  },
  getOne: (resource: any, params: { id: any }) => {
    console.log("getOne");
    const url = `${apiUrl}/${resource}/${params.id}`;
    console.log(params.id);
    return httpClient(url).then(({ json }) => ({
      data: { ...json, id: json._id },
    }));
  },
  getMany: (resource: any, params: { ids: any }) => {
    console.log("getMany");
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
    console.log(url);
    return httpClient(url).then(({ json }) => ({
      data: json.map((resource: { _id: any }) => ({
        ...resource,
        id: resource._id,
      })),
    }));
  },

  getManyReference: (
    resource: any,
    params: {
      pagination: { page: any; perPage: any };
      sort: { field: any; order: any };
      filter: any;
      target: any;
      id: any;
    }
  ) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json.map((resource: { _id: any }) => ({
        ...resource,
        id: resource._id,
      })),
      // @ts-ignore
      total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
    }));
  },

  update: (resource: any, params: { id: any; data: any }) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    console.log("here");
    const body = JSON.stringify(params.data);
    return httpClient(url, { method: "PUT", body }).then(({ json }) => ({
      data: { ...json, id: json._id },
    }));
  },

  updateMany: (resource: any, params: { ids: any; data: any }) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${query}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json.map((resource: { _id: any }) => ({
        ...resource,
        id: resource._id,
      })),
    }));
  },

  create: (resource: any, params: { data: any }) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json._id },
    })),

  delete: (resource: any, params: { id: any }) => {
    const url = `${apiUrl}/${resource}/${params.id}`;

    console.log(resource);

    return httpClient(url, { method: "DELETE" }).then(({ json }) => ({
      data: { ...json, id: json._id },
    }));
  },
  deleteMany: (resource: any, params: { ids: any }) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
    console.log(url);
    return httpClient(url, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json.map((resource: { _id: any }) => ({
        ...resource,
        id: resource._id,
      })),
    }));
  },
};
