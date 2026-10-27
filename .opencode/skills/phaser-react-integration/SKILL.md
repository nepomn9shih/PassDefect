---
name: phaser-react-integration
description: Интеграция Phaser с React и Redux в проекте PassDefect. Использовать при монтировании Phaser.Game (src/engine/Game.tsx), создании/уничтожении игры, подписке сцен на Redux store (StateManager), событиях GameEvents и обмене состоянием React-Phaser.
---

# Phaser + React интеграция

## Монтирование игры (`src/engine/Game.tsx`)

- Компонент-обёртка (`Game`) — тонкий слой, который только создаёт конфиг, запускает `Phaser.Game` и рендерит пустой `<div id={GAME_PASS_DEFECT_ID} />`.
- Создавать игру один раз в `useEffect` с пустыми зависимостями; в cleanup вызвать `game.destroy(true)` и сбросить ссылку.
- Держать инстанс `Phaser.Game` в `useRef` — не в `useState`: сеттер не используется, а ре-рендеры React не должны пересоздавать игру.
- Сцены передавать в конфиг как готовые инстансы (`new BootScene(store)`, `new MainScene(store)`), ключи сцен — из `SceneNames` (`src/engine/enums`).
- Хуки вроде `useIsMobile` вызывать в обёртке и складывать результат в Redux (`dispatch(setIsMobile(...))`), а не прокидывать напрямую в Phaser.
- В dev-режиме React StrictMode вызывает `useEffect` дважды (создание → destroy → создание): убедиться, что пара create/`destroy(true)` не оставляет дублей — повторных канвасов, таймеров, подписок.
- Автопауза при потере фокуса/свёрнутом табе: держать `pauseOnBlur: true` в конфиге и при необходимости обрабатывать `Phaser.Core.Events.BLUR`/`HIDDEN`.
- Resize внутри Phaser слушать через `game.scale.on(Phaser.Scale.Events.RESIZE)` (ScaleManager), а не ручными `window.addEventListener`.

## Обмен состоянием (React ↔ Phaser)

- React не пишет состояние Phaser напрямую: сцены читают Redux через `store.subscribe()` (паттерн `StateManager` в `MainScene.ts`), отписку сохранять и вызывать в `scene.events.on('destroy')`.
- Phaser уведомляет React через события `GameEvents` из `src/engine/enums/GameEvents.ts` — Phaser излучает (`scene.events.emit(...)` / `this.events.emit(...)`), React-компоненты слушают, и наоборот.
- Слушатели событий всегда снимать при уничтожении сцены/компонента.
- Для UI-компонентов, отображающих игровое состояние, использовать уже готовые хуки-селекторы из `reducers/selectors` (`usePlayer`, `useGame`, `useWeapon`).

## React-сторона

- Использовать `useEffect` для жизненного цикла игры; `useCallback` — для колбэков, передаваемых в Phaser-сцены.
- Избегать прямого доступа к React-состоянию из Phaser: использовать `store.subscribe()` или события.
- Не монтировать `Phaser.Game` повторно при ре-рендере — `useRef` + пустые зависимости `useEffect`.
- Подписки React на store вне компонентов (сервисы, менеджеры) при необходимости оформлять через `useSyncExternalStore` (React 19), а не ручные `effect`+`setState`.
- Сохранения прогресса (если появятся) — в `localStorage` с версионирующим ключом (например, `passDefect:v1:save`); сериализовывать только нужные срезы Redux, не весь store.
