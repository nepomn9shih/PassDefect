---
name: add-monster-type
description: Инструкция по добавлению нового вида врага в игру PassDefect. Использовать когда пользователь просит добавить нового монстра/врага/вид врага, новый скин монстра или параметры нового противника.
---

# Добавление нового вида врага

Вариация монстра определяется строкой-ключом, который одновременно является именем атласа в `src/engine/assets/monsters/`. Чек-лист по шагам:

## 1. Ассеты

- Положи в `src/engine/assets/monsters/` пару файлов `<variation>.png` + `<variation>.json` (TexturePacker-атлас). Имя файла = ключ вариации (например, `monster-archer.png`) — атлас подхватит `index.ts` этой папки автоматически, править его не нужно.
- Атлас обязан содержать кадры `01`–`09` (в `getMonsterAnimations` используется `generateFrameNames` с `zeroPad: 2`):
  - `01`–`03` — ходьба (`01, 02, 01, 03`)
  - `04`, `05` — получение удара (`04, 05, 01`)
  - `06`, `07` — смерть
  - `08`, `09` — появление (spawn)

## 2. Enums

- Добавь значение в `MonstersVariations` в `src/engine/enums/index.ts` (значение = имя атласа, например `ARCHER = 'monster-archer'`).

## 3. Параметры

- Добавь запись в `MONSTERS_PARAMS` в `src/engine/classes/MonsterModel/constants.ts`. Тип `Record<MonstersVariations, MonsterParams>` заставит TS подсказать все обязательные поля:
  `health`, `attack: {min, max}`, `sight`, `speed`, `sculls`, `minGold`, `maxGold`, `weaponVariation` (какое оружие несёт монстр — `WeaponVariations`).

## 4. Спавн

- Вариации, которые должны случайно спавниться, добавь в массив в `src/engine/utils/getRandomMonsterVariation.ts`. Если монстр должен появляться только из конкретных спавнеров на карте — не добавляй его туда и настрой фильтрацию вариации по `spawnerId`.
- Интервал спавна общий для всех монстров задан в `MONSTER_SPAWN_INTERVAL` (`src/engine/managers/SpawnManager/constants.ts`); при необходимости вынеси параметр в `MonsterParams` вариации.

## 5. Анимации (при индивидуальных кадрах)

- `getMonsterAnimations.ts` (`src/engine/classes/MonsterModel/`) строит анимации из `MonsterAnimation.*` по кадрам `01`–`09`. Ключи анимаций общие (например, `monster-move`) для всех вариаций.
- Если новый монстр использует другую компоновку кадров или доп. анимации (атака и т.п.), добавь ветку по `variation` в `getMonsterAnimations` и при необходимости новый `MonsterAnimation`.

## 6. Что менять НЕ нужно

- `MonsterModel` (`classes/MonsterModel/index.ts`) — уже принимает свойства параметрически.
- `MonsterContainer` (`MonsterContainer.ts`) — размеры контейнера, health bar, активация/деактивация и `runChildUpdate` общие; `weaponVariation` он берёт из `MONSTERS_PARAMS`.
- `SpawnManager.spawnMonster` — при повторном использовании "мёртвого" контейнера уже делает `setTexture(monsterObject.variation)`, поэтому повторный respawn подходит любой вариации.
- `MainScene` (группы и коллизии) — монстры попадают в общую группу `this.monsters`.

## 7. Проверка

- `npm run lint` и `npm run build` (TS жёстко проверит отсутствие полей в `MONSTERS_PARAMS`).
- Ручная проверка в `npm run dev`: монстр появляется, ходит, проигрываются анимации spawn/move/death, health bar, атака оружием.
- Проверь повторный spawn (убить монстра и дождаться нового) — текстура и анимации должны корректно смениться.
