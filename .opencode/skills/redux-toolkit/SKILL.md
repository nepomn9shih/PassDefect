---
name: redux-toolkit
description: Работа с Redux Toolkit в проекте PassDefect. Использовать при создании или изменении слайсов (createSlice), хуков-селекторов (reducers/selectors), createAsyncThunk, нормализации состояния и настройки store (configureGameStore).
---

# Redux Toolkit

## Конфигурация стора

- Хранить структуру `src/reducers/`: слайсы в `reducers/slices/<имя>/{index.ts,types.ts}`, корень в `reducers/index.ts`, типизация в `reducers/types.ts`.
- Создание стора — через `configureStore` в `src/utils/configureGameStore.ts`; типизировать `preloadedState` как `AllGameState` (не использовать `any`).

## Слайсы

- Использовать `createSlice` для создания слайсов.
- Централизовать состояние игры (например, счёт, уровень, настройки).
- Использовать `createAsyncThunk` для асинхронных операций.
- Нормализовать состояние при работе с большими данными: для коллекций однотипных сущностей (монстры, оружие, инвентарь) использовать `createEntityAdapter` вместо ручных словарей.

## Селекторы

- Клиентские хуки-обёртки размещать в `reducers/selectors` (существуют `usePlayer`, `useWeapon`, `useGame`).
- Не объявлять inline-селектор внутри `useSelector` в компонентах — выносить его в именованную функцию/хук из `reducers/selectors`.
- Для селекторов, вычисляющих данные из состояния (фильтрация, агрегация), мемоизировать через `createSelector` (reselect входит в состав Redux Toolkit), чтобы не пересчитывать значения при каждом dispatch.

## Взаимодействие с React/Phaser

- Использовать `useSelector` / `useDispatch` из `react-redux` для взаимодействия с store из компонентов.
- Передавать `store` в Phaser-сцены через конструктор (см. скилл `phaser-react-integration`), а не через глобальные переменные.
