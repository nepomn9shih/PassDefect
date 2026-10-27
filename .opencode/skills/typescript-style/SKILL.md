---
name: typescript-style
description: Правила типизации TypeScript в проекте PassDefect. Использовать при написании или редактировании любого кода (.ts, .tsx), при создании переменных, функций, типов, интерфейсов, enum и настройке tsconfig.
---

# TypeScript

Стек проекта: **Phaser.js, React, TypeScript, styled-components, Redux Toolkit**.

- Использовать TypeScript во всём коде:
  - Все переменные, параметры функций, возвращаемые значения должны иметь типы.
  - Предпочитать `interface` или `type` для определения формата объектов.
  - Использовать `enum` для наборов констант (в проекте, например, `src/engine/enums/GameEvents.ts`).
  - Включать строгую типизацию (`"strict": true` в `tsconfig.json`).
- Запрещено `any` (линт `@typescript-eslint/no-explicit-any` уже включён): использовать точные типы, а для данных из внешних источников — `unknown` + сужение типа.
- Для импортов только типов использовать `import type` (как в `src/engine/scenes/MainScene.ts`).
- Блок импортов типов отделять от обычных импортов пустой строкой (типовые импорты идут после обычных):

  ```ts
  import {Scene, Tilemaps} from 'phaser';

  import type {MapProps} from './types';
  ```
- Не оставлять `@ts-expect-error`/`@ts-ignore` без комментария с причиной; типизировать корректно вместо подавления ошибок.
- Не cast'ить через двойное приведение `as unknown as X` — переписывать код так, чтобы срабатывало прямое приведение.
- Non-null assertion `!` применять только в очевидных случаях (например, definite assignment `map!: GameMap` для полей, инициализируемых в `create()`); в остальных местах — проверки/оператор `?.`.

## Паттерны типизации

- Константные конфигурации (волны спавна, параметры врагов, словари ключей) объявлять с `as const` и `satisfies`, чтобы сохранить точные литеральные типы:

  ```ts
  export const CONFIG = {
    spawnInterval: 1000
  } as const satisfies Config;
  ```

- Для вариантов состояния использовать discriminated unions (дискриминант + только релевантные поля), а не наборы взаимоисключающих булевых флагов.
- Использовать utility types (`Record`, `Pick`, `Omit`, `Partial`, `ReturnType`) вместо ручного повторения структур.
- Индексные типы записывать как `Record<string, T>`, а не литерал `{[key: string]: T}` (см. `src/engine/utils/importFilesSourcesAsObject.ts`).
- Для сужения типов данных из внешних источников использовать type-guard'ы: `const isPlayer = (value: unknown): value is Player => ...`.
- В `switch` по union-типу делать exhaustive-check: ветка `default` присваивает значение переменной типа `never`, гарантируя обработку всех вариантов при добавлении новых.

## Структура типов

- Типы модуля держать в `types.ts` рядом с модулем (`classes/Map/types.ts`, `slices/game/types.ts`); глобальные игровые типы — в `engine/types/`, reducer-типы — в `reducers/types.ts`.
- Не дублировать выведенные типы: если структура уже выведена из данных (например, через `satisfies`/`ReturnType`), использовать её, а не создавать вручную.
