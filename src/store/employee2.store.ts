import axios from "axios";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import LocalStorage from "../helpers/localstorage2.helper";
import { notificator } from "./notify.store";
import { IEmployee, INewEmployee, IQueryAllEmployees } from "../types/employerTypes";
import { ROUTES_BY_ROLE } from "../router/router";
import { IConstTableAlias } from "../components/MyTable/MyTable";
import { objFromMobx } from "../helpers/main.helper";
import ParentMobXStore from "./parent.store";

/**
 * Заголовки, используемые в запросах к API для текущего стора
 */
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

export function flattenObject(obj: object) {
  var result: object = {};

  Object.entries(obj).forEach(([key, val]) => {
    // if object (and not null!), merge it with the resulting object,
    // otherwise just copy the value
    if (val && typeof val === "object")
      Object.assign(result, val);
    else
      // @ts-ignore
      result[`${key}`] = val;
  });

  return result;
}


const Employee = new ParentMobXStore();
Employee.constTableTitle = "Сотрудники";
Employee.apiEndpoint = `/api/employees/`;
Employee.constTableAlias = {
  id: {
    title: "ID", formTag: ['edit', 'filter', 'remove'], dataType: "number", inputType: "selector", props: { options: Employee.updateIds }
  },
  firstname: { title: "Имя" },
  surname: { title: "Фамилия" },
  patronymic: { title: "Отчество" },
  jobPosition: { title: "Должность" },
  salary: { title: "З/П", dataType: "number", inputType: "number" },
  email: { title: "Эл. почта" },
  phoneNumber: { title: "Номер телефона" },
  username: { title: "Логин", formTag: ['edit'] },
  role: { title: "Право доступа", notInForm: true },
  address: { title: "Адрес" },

  // подписи для форм управления таблицей
  password: { title: "Пароль", inputType: "password", formTag: ['create'] },
  repeatPassword: { title: "Повторите пароль", inputType: "password", formTag: ['create'] },
  "role.name": {
    title: "Наименование роли", inputType: "selector", formTag: ['create'], props: {
      options: Employee.updateRoles
    }
  },

  pagePosition: { title: "Страница", notInForm: true },
  pageSize: { title: "Количество на странице", notInForm: true },
}


export const employee = Employee;