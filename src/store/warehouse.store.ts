import ParentMobXStore from "./parent.store";

const Warehouse = new ParentMobXStore();

// Настройка хранилища
Warehouse.constTableTitle = "Склад";
Warehouse.apiEndpoint = "/api/products/"

Warehouse.constTableAlias = {
  id: Warehouse._getDefaultIdAlias(),
  productName: { title: "Товар" },
  unit: { title: "Ед. измерения" },
  storageAmount: { title: "Количество", dataType: "number", inputType: "number" },
  cost: { title: "Цена", dataType: "number", inputType: "number" },
  rating: { title: "Рейтинг", dataType: "number", inputType: "number" },
  image: { title: "Изображение", inputType: "file" }
}





export const warehouse = Warehouse;