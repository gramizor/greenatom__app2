/**
 * Здесь будет находиться родительский класс, от которого будут создавать новые экземпляры
 * 
 * Это позволит сэкономить время на написание сторов и внедрение таблицы на страницу
 */

import { makeAutoObservable, runInAction } from "mobx";
import { ROUTES_BY_ROLE } from "../router/router";
import { IConstTableAlias, IConstTableAliasScheme } from "../components/MyTable/MyTable";
import LocalStorage from "../helpers/localstorage2.helper";
import axios from "axios";
import { notificator } from "./notify.store";

import api from "../helpers/instanse.helper";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

/**
 * При создании экземпляра этого класса укажите обязательные поля:
 * - `constTableTitle` - название таблицы
 * - `apiEndpoint` - точка запроса (например `/api/products/`)
 * - `constTableAlias` - подписи и типы данных для формы
 */
class ParentMobXStore {
  constructor() {
    makeAutoObservable(this)
  }


  constData: { [key: string]: any } = {};

  constTableTitle: string = "Название таблицы"

  constTableAlias: IConstTableAlias = {} as IConstTableAlias

  apiEndpoint: string = ""

  /**
   * Возвращает дефолтную для формы алиас схему для поля id
   * @returns Алиас схема для ID
   */
  _getDefaultIdAlias = (): IConstTableAliasScheme => {
    return {
      title: "ID", formTag: ['edit', 'filter', 'remove'], dataType: "number", inputType: "selector", props: { options: this.updateIds }
    }
  }

  /**
   * Создает массив идентификаторов для селектора. Не трогать без необходимости
   * @returns Массив идентификаторов
   */
  updateIds = () => {
    return this.constData.map((entity: { [key: string]: any }) => { return { name: `${entity.id}` }; })
  }

  /**
   * Создает массив ролей для селектора
   * @returns Массив ролей
   */
  updateRoles = () => {
    return Object.keys(ROUTES_BY_ROLE).map((e) => { return { name: e } })
  }

  /**
   * Удалить запись в таблице. Не трогать без необходимости
   * @param data Данные в необходимом формате
   * @returns Код состояния от сервера
   */
  async remove(data: { id: string | number }): Promise<number> {
    console.error("Метод нуждается в переопределении")
    return -1
  }

  /**
   * Создать запись в таблице
   * @param data Данные в необходимом формате
   * @returns Код состояния от сервера
   */
  async create(data: { [key: string]: any }): Promise<number> {
    const response = await api.post(
      process.env.REACT_APP_BACKEND_ORIGIN + `${this.apiEndpoint}`,
      data,
      {
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${LocalStorage.get("at")}`
        }
      }
    )
  
    return response.status;
  }

  /**
   * Изменить запись в таблице
   * @param data Данные в необходимом формате
   * @returns Код состояния от сервера
   */
  async edit(data: { [key: string]: any }): Promise<number> {
    const response = await api.patch(
      process.env.REACT_APP_BACKEND_ORIGIN + `${this.apiEndpoint}${data.id}`,
      data,
      {
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Bearer ${LocalStorage.get("at")}`
        }
      }
    )
  
    return response.status;
  }

  /**
   * Получить записи в таблице
   * @param data Данные в необходимом формате
   * @returns Код состояния от сервера
   */
  async getAll(data: { [key: string]: any }): Promise<{[key: string]: any}> {
    try {
      const response = await api.get(
        process.env.REACT_APP_BACKEND_ORIGIN + `${this.apiEndpoint.slice(0, this.apiEndpoint.length - 1)}`,
        {
          headers: {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${LocalStorage.get("at")}`
          },
          params: { ...data }
        }
      );

      runInAction(() => {
        this.constData = response.data.content;
      })
      return JSON.parse(JSON.stringify(response.data.content));
    } catch (error) {
      notificator.push({ children: `Не удалось обновить данные, так как страница или рамер страницы указаны неверно`, type: "error" });
      return {};
    }
  }

  /**
   * Фильтровать записи в таблице (поиск)
   * @param data Данные в необходимом формате
   * @returns Код состояния от сервера
   */
  async filter(data: { [key: string]: any }): Promise<{[key: string]: any}> {
    return this.getAll(data);
  }

}

export default ParentMobXStore;