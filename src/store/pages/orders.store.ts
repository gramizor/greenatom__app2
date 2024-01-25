import ParentMobXStore from "../parent.store";


const Orders = new ParentMobXStore();
Orders.constTableTitle = "Заказы";
Orders.apiEndpoint = "/api/orders/";

Orders.constTableAlias = {
  id: Orders._getDefaultIdAlias(),

  clientId: {title: "ID клиента", inputType: "number"},

  employee: {title: "Сотрудник", inputType: "selector", props: {options: () => {return [{name: "CURRENT_ACCOUNT", displayName: `Моя учетная запись сотрудника`}]}}},
  linkToFolder: {title: "Документ"},
  orderDate: {title: "Дата заказа"},
  orderStatus: {title: "Статус заказа", inputType: "selector", props: {options: () => {return [ {name: "DRAFT", displayName: "Черновик"}, {name: "SIGNED_BY_EMPLOYEE", displayName: "Подписан сотрудником"}, {name: "SIGNED_BY_CLIENT", displayName: "Подписан клиентом"}, {name: "IN_PROCESS", displayName: "В процессе"}, {name: "FINISHED", displayName: "Завершен"}, {name: "DELIVERY_FINISHED", displayName: "Доставка завершена"} ]}}},
  deliveryType: {title: "Тип доставки", inputType: "selector", props: {options: () => {return [{name: "DELIVERY", displayName: "В пути"}, {name: "PICKUP", displayName: "Доставлен"}]}}}

}


export const orders = Orders;