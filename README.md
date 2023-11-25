# Командный проект №2

## Основная информация

Суть приложения на примере: 
1) Сотрудник создает документ (например, содержащий предложение по улучшению качества мобильной связи в городе N).
2) Сотрудник создает заявку, к которой подкрепляет созданный документ.
3) Сотрудник рассылает заявку по отделам, мнение которых важно для принятия его идеи, описанной в документе. (Например, финансовый, конструкторский и тд.)
4) Ответственные лица отделов, в которые пришла заявка, голосуют либо за, либо против (либо воздерживаются от) принятия документа, обозначенного в заявке.
5) В момент наступления дедлайна по заявке подсчитываются голоса, исходя из которых автоматически определяется: будет ли принят документ или нет.

Таким образом мы получаем систему принятия решений на предприятии ("Систему электронного согласования и управления документооборотом").

Подкрепляю фото BPMN диаграммы основного процесса и остальные BPMN диаграммы (в формате .drawio).
Полная sequence диаграмма сейчас в разработке. Как только она будет готова - пришлем.

Также есть видео с примером работы: https://www.youtube.com/watch?v=nc-WWU0eg44

В репозитории (https://github.com/Sh1bari/CaseLabProject) на ветке master в readme есть ссылка на Swagger документацию (с полным описанием эндпоинтов api) и сам бэк. Последняя стабильная версия приложения запущена на хостинге.

- OpenApiSpecification (Swagger) - http://5.35.83.142:8082/api/swagger-ui/index.html
- Приложение доступно по адресу: http://5.35.83.142:8082
- [Figma](https://www.figma.com/file/Y1Xt75uQrOSEmrQ5Nzjit7/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0?type=design&node-id=1-2&mode=design&t=xdXB6kktlApNBte9-0)

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
