import http from "../http-common";

const getAll = () => {
  return http.get("/recipes");
};

const get = id => {
  return http.get(`/recipes/${id}`);
};

const create = data => {
  return http.post("/recipes", data);
};

const update = (id, data) => {
  return http.put(`/recipes/${id}`, data);
};

const remove = id => {
  return http.delete(`/recipes/${id}`);
};

const getSpecials = () => {
  return http.get("/specials");
}

const findByTitle = title => {
  return http.get(`/recipes?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  getSpecials,
  findByTitle
};
