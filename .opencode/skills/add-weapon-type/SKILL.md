---
name: add-weapon-type
description: Инструкция по добавлению нового вида оружия в игру PassDefect. Использовать когда пользователь просит добавить новое оружие, новый ствол/лук/меч, снаряд (bolt) или изменить арсенал.
---

# Добавление нового вида оружия

Оружие построено на переиспользуемом конвейере `Weapon` → `WeaponBolt` → `WeaponContainer` (`src/engine/classes/Weapon/`). Новое оружие — это записи в конфигах и enum, компоненты не меняются.

## 1. Ассеты

- В `src/engine/assets/weapon/` добавь две пары файлов (ключ = имя файла; `index.ts` папки подхватит их автоматически через glob):
  - само оружие: `<weapon>.png` + `<weapon>.json` — кадры `01` (обычный режим) и `02` (атакующий режим, `WEAPON_ATTACK_FRAME`)
  - снаряд: `<bolt>.png` + `<bolt>.json` — кадр `01` (снаряд показывается/скрывается через `alpha`)

## 2. Enums

- В `src/engine/enums/index.ts` добавь:
  - значение в `WeaponVariations` (например, `FROST_BOW = 'frost-bow'`)
  - значение в `WeaponBoltsVariations` (`FROST_BOLT = 'frost-bolt'`)

## 3. Конфиги (`src/engine/classes/Weapon/constants.ts`)

Все четыре `Record`-а полностью типизированы по enum — TypeScript потребует заполнить каждый для нового оружия:

- `WEAPONS_CONFIG` — `damage`, `shotCost` (0 для ближнего боя, >0, если требуется расход болтов), `attackTime` (мс), `distance` (радиус атаки, px).
- `WEAPON_OFFSET` — смещение оружия в руках для всех шести `MoveDirections`.
- `WEAPON_BOLTS_OFFSET` — стартовое смещение снаряда для всех шести направлений (стрелок появляется там, дальше летит по физике).
- `WEAPON_BOLTS_FOR_WEAPON` — связка `weapon → bolt`.

## 4. Арсенал игрока (Redux + UI)

- `src/reducers/slices/weapon/index.ts`: добавь ключ в `state.weapons` (`[WeaponVariations.FROST_BOW]: true/false` — доступно с начала или нет). Расширение списка не требует правок типов (`WeaponState.weapons` — словарь).
- UI-выбор оружия: `src/components/Interface/WeaponsBar/index.tsx` — используй иконку из `src/assets/`:
  - добавь png-логотип оружия (например, `frost-bow-icon.png`) в `src/assets/`
  - добавь условный рендер `StyledWeaponLogo` по аналогии с существующими двумя
  - для дальнобойных оружий покажи полосу болтов (`StyledBoltsBar` + `MultipleMenuItem` с `count={bolts}` / `maxCount={maxBolts}`)

## 5. Что менять НЕ нужно

- `Weapon.ts`, `WeaponBolt.ts`, `WeaponContainer.ts` — параметры читаются из конфигов; `changeWeapon()` уже пересоздаёт спрайты.
- `PlayerContainer.switchWeapon` — смена оружия приходит из `state.weapon.active` (подписка в `MainScene.createStateManager`).
- Оружие монстров: если у монстра новое оружие — достаточно указать его `weaponVariation` в `MONSTERS_PARAMS` (см. скилл `add-monster-type`); монстры стреляют через общие группы `weaponBolts`/`enemyWeaponBolts`.

## 6. Проверка

- `npm run lint` и `npm run build`.
- Ручная проверка в `npm run dev`:
  - оружие отображается в руках и поворачивается во все 6 направлений (offset/angle);
  - снаряд появляется, летит, попадает по врагам/игроку на нужную дистанцию;
  - анимации 01 ↔ 02 переключаются во время атаки;
  - расход болтов и полоса в UI корректны;
  - смена оружия через WeaponsBar и на уровнях (если меняется от уровня).
