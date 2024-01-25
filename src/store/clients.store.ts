import ParentMobXStore from "./parent.store";


const Clients = new ParentMobXStore();
Clients.constTableTitle = "Клиенты";
Clients.apiEndpoint = "/api/clients/";

Clients.constTableAlias = {
  id: Clients._getDefaultIdAlias(),
  firstname: { title: "Имя" },
  lastname: { title: "Фамилия" },
  patronymic: { title: "Отчество" },
  company: { title: "Компания" },
  bank: { title: "Банк" },
  inn: { title: "ИНН", inputType: "number" },
  ogrn: { title: "ОГРН", inputType: "number" },
  correspondentAccount: { title: "К/С", inputType: "number" },
  address: { title: "Адрес" },
  email: { title: "Эл. почта" },
  phoneNumber: { title: "Телефон" },
  legalEntity: { title: "Юр. лицо", inputType: "boolean" },
  clientSource: { title: "Клиент источник", inputType: "selector", props: { options: () => { return [{ name: "CRM" }, { name: "SELF_SERVICE" }] } } },


  password: { title: "Пароль", formTag: ["create"], inputType: "password" }

}

export const clients = Clients;