//get, post , delete 를 정의

import { tSEnumDeclaration } from "@babel/types";
import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000
});

instance.interceptors.request.use(
  function(config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    return config;
  },
  function(error) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function(response) {
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다. 
        .then() 으로 이어집니다.
    */
    return response;
  },

  function(error) {
    /*
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.    
    */
    return Promise.reject(error);
  }
);

export default {
  getSearch() {
    return instance({
      url: "/todolist",
      method: "get"
    });
  },
  getInfiniteSearch(page: any) {
    return instance({
      url: "/todolist",
      method: "get",
      data: {
        pageNumber: page
      }
    });
  },
  postAdd(newTodoItem: String) {
    return instance({
      url: "/todolist",
      method: "post",
      data: {
        value: newTodoItem
      }
    });
  },
  deleteClear(deleteTodoItem: String) {
    return instance({
      url: `/todolist/${deleteTodoItem}`,
      method: "delete",
      data: {
        value: deleteTodoItem
      }
    });
  },
  deleteClearAll() {
    return instance({
      url: "/todolist",
      method: "delete"
    });
  }
};
