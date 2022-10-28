import { fetchUtils } from "react-admin";

const apiUrl = process.env.REACT_APP_BACKEND
  ? `${process.env.REACT_APP_BACKEND}/api/admin`
  : "/api/admin";

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
    const sort = order === "1" ? `${field}` : `-${field}`;
    const range = [(page - 1) * perPage, page * perPage - 1];
    const filter = Object.keys(params.filter).length !== 0 ? params.filter : "";
    const url = `${apiUrl}/${resource}?sort=${sort}&page=${page}&range=${range}&filter=${filter}`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json.map((resource: { _id: string }) => ({
        ...resource,
        id: resource._id,
      })),
      // @ts-ignore
      total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
    }));
  },
  getOne: (resource: any, params: { id: any }) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url).then(({ json }) => ({
      data: { ...json, id: json._id },
    }));
  },
  getMany: (resource: any, params: { ids: any }) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;
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
    const body = JSON.stringify(params.data);
    return httpClient(url, { method: "PUT", body }).then(({ json }) => {
      return { data: { ...json, id: json._id } };
    });
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
    return httpClient(url, { method: "DELETE" }).then(({ json }) => ({
      data: { ...json, id: json._id },
    }));
  },
  deleteMany: (resource: any, params: { ids: any }) => {
    const url = `${apiUrl}/${resource}?ids=${params.ids}`;
    return httpClient(url, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json.ids,
    }));
  },
};

export const DataProviderWithFormData = {
  ...dataProvider,
  create: (resource: any, params: { data: any }) => {
    if (resource !== "resource-with-file" || !params.data.theFile) {
      return dataProvider.create(resource, params);
    }
    const data = new FormData();
    Object.keys(params.data).forEach((key) => {
      data.append(key, params.data[key]);
    });
    return dataProvider.create(resource, { data });
  },
  update: (resource: any, params: { id: any; data: any }) => {
    if (resource !== "admin/product" || !params.data.imageFile) {
      return dataProvider.update(resource, params);
    }
    const formData = GetFormData(params.id, params.data);
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: formData,
    }).then(({ json }) => ({
      data: { ...params.data, id: json._id, image: json.UpdatedImage },
    }));
  },
};

function GetFormData(id: string, Data: any) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("imageFile", Data.imageFile.rawFile);
  formData.append("name", Data.name);
  formData.append("price", Data.price);
  formData.append("countInStock", Data.countInStock);
  formData.append("description", Data.description);
  formData.append("brand", Data.brand);
  formData.append("category", Data.category);
  formData.append("numReviews", Data.numReviews);
  return formData;
}
