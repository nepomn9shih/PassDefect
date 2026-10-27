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
- Не оставлять `@ts-expect-error`/`@ts-ignore` без комментария с причиной; типизировать корректно вместо подавления ошибок.
