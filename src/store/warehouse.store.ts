import { makeAutoObservable } from "mobx";
import { IConstTableAlias, IMyTableMOBX } from "../components/MyTable/MyTable";
import { IProduct } from "../types/warehouseTypes";
import ParentMobXStore, { DEFAULT_HEADERS } from "./parent.store";
import axios from "axios";
import LocalStorage from "../helpers/localstorage2.helper";

const Warehouse = new ParentMobXStore();

// Настройка хранилища
Warehouse.constTableTitle = "Склад";
Warehouse.apiEndpoint = "/api/products/"

Warehouse.constTableAlias = {
  id: {
    // @ts-ignore
    title: "ID", formTag: ['edit', 'filter', 'remove'], dataType: "number", inputType: "selector", props: { options: Warehouse.updateIds }
  },
  productName: { title: "Товар" },
  unit: { title: "Ед. измерения" },
  storageAmount: { title: "Количество", dataType: "number", inputType: "number" },
  cost: { title: "Цена", dataType: "number", inputType: "number" },
  rating: { title: "Рейтинг", dataType: "number", inputType: "number" },
  image: { title: "Изображение", inputType: "file" }
}





export const warehouse = Warehouse;