# Командный проект №2

Ссылка на первый дипломный проект
https://github.com/gramizor/greendocatom

## Суть работы приложения

1) **Вход** под админом → создаем работников с ролями
2) Заполняем склад товарами
3) **Вход** под менеджером → чтобы начать работу с заказами
4) Менеджер создает клиента
5) Менеджер делает заказ клиенту
6) Менеджер подписывает заказ
7) **Вход** под складским рабочим → чтобы начать сборку заказа
8) Рабочий завершает сборку
9) **Вход** под курьером → для доставки заказа
10) Начинает доставку
11) Заканчивает доставку
12) Курьер ножками несет документ менеджеру, который его подписывает при получении
13) **Вход** менеджером → загружает скан документа с подписью, изменяя статус заказа на `SIGNED_BY_CLIENT`
14) Менеджер подтверждает, что клиент получил заказ → заказ завершен, статус `FINISHED`

Параллельно работает механизм подачи жалоб на исполнение заказа

# Документация к написанию проекта
## Пример API Запроса
- Именование файлов (<strong>API_ИМЯ ФАЙЛА_.ts</strong>)
- Функции должны просто выполнять запрос и возвращать какие то данные!
- Исключительно можно внутри обрабатывать  ошибки, но лучше это делать за пределами запроса!

```typescript
// Пример файла API_User_.ts

interface IResponseStatus {
  status: number;
}

export const getUser = (): Promise<IResponseStatus> => {
  // ... реализация функции
};
```

## Стиль написания файлов components
- Именования файла осмысленное, и описывающее что он делает.
- Использовать PascalCase для нейминг
- Создавать по надобности интерфейс IProps"Имя файла"
- Локальные состояние писать внутри компонента!
- Оборачивать все компоненты в observer
- Файлы с стилями import Имя которое хотите дать модулю from './имя файла стилей' использовать подход CSS Modules
```typescript
// Пример файла UsersItem.tsx

interface IPropsUsersItem {
  name: string
  lastName: string
  age: number
}

const UsersItem: React.FC<IPropsUsersItem> = () => {
  // ... реализация компонента
};

export default UsersItem;
```

## Стиль написания файлов стилей
- Файлы стилей должны лежать внутри компонента, в котором они используются
- Файлы должны содержать переменные цветов, и использовать их
- Файлы должны иметь название такое же как у компонента и иметь расшерение .module.scss
- Имена стилей могут повторяться в разных файлах

```scss

// Пример файла UsersItem.module.scss

$primaryColor: #3498db; // Пример переменной цвета

.UsersItemContainer {
  // Основные стили для контейнера UsersItem
  background-color: $primaryColor;
  padding: 10px;
  border-radius: 5px;

  .UserName {
    // Стили для имени пользователя внутри контейнера UsersItem
    font-size: 16px;
    font-weight: bold;
    color: $primaryColor;
  }

  .UserLastName {
    // Стили для фамилии пользователя внутри контейнера UsersItem
    font-size: 14px;
    color: darken($primaryColor, 10%); // Пример использования функции darken
  }

  .UserAge {
    // Стили для возраста пользователя внутри контейнера UsersItem
    font-size: 12px;
    color: lighten($primaryColor, 20%); // Пример использования функции lighten
  }
}

```

## Стиль написания файлов constants
- Единый файл, в котором нужно хранить все хардкод даннные
- Стиль переменных ИМЯ_ПЕРЕМЕННОЙ
- Не писать в файл секретные данные по типу ключей API или паролей

```typescript
// Пример файла constants.ts

export const FOO = 10
export const API_URL = 'https://api.com/api'

```


## Стиль написания файлов helpers
- Файлы должны содержать вспомогательные функции utils_Имя файла_.ts
- Называть файлы строго по их функционалу
- Использовать camelCase для именования переменных
- Типизировать IProps"Имя функции"
- Типизировать что возвращает функция

```typescript
// Пример файла utils_Users_.ts

interface IPropsFullName {
  name: string
  lastName: string
}

export const fullName({name, lastName}: IPropsFullName): string => {
  return `${name} ${lastName}`
}

```

## Стиль написания файлов pages
- Страницы должны содержать не много кода, и являются лишь сборкой компонентов
- Использовать camelCase для именования компонентов
  


```typescript
// Пример файла HomePage.tsx

import React from 'react';

const HomePage: React.FC = () => {
  // ... реализация страницы
};

export default HomePage
```

## Стиль написания файлов store
- Сторы должны иметь осмысленное название
- Стиль названия файла <strong>имя файла.store.ts</strong>
- Именовать классы <strong>Имя файла__Store</strong>
- Используем makeAutoObservable
- Использовать camelCase для именования переменных
- Использовать camelCase для именования set функций
- Разделять Store на файлы

```typescript
// Пример файла auth.store.ts

import { makeAutoObservable } from "mobx";

class Auth__Store {
  constructor() {
    makeAutoObservable(this);
  }
  isAuth = false;

  setIsAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }
}

export const authStore = new Auth__Store();

```

## Стиль написания файлов types
- Файлы типов содержат определения TypeScript для повторно используемых типов.
- Используйте PascalCase для именования файлов и типов.
- По надобности можно делать причисление enum
- Стараться использовать наследование интерфейсов
- Стараемся разбивать типы по файлам
- 
```typescript
// Пример файла UserTypes.ts

// Определение типа для основной информации о пользователе
export interface BaseUser {
  id: number;
  name: string;
  lastName: string;
  age: number;
}

// Определение типа для пользователя с расширенной информацией
export interface ExtendedUser extends BaseUser {
  email: string;
  // Дополнительные свойства по необходимости
}

// Перечисление для ролей пользователя
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  // Добавление других ролей по необходимости
}
  
```
