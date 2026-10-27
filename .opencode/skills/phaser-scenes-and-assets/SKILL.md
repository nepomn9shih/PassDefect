---
name: phaser-scenes-and-assets
description: Структура сцен и загрузка ресурсов Phaser.js в проекте PassDefect. Использовать при создании или изменении Phaser-сцен (BootScene, MainScene, ControlsScene), жизненного цикла init/preload/create/update, менеджеров (GameManager, CameraManager, SpawnManager), работы со спрайтами, атласами и ассетами (src/engine/assets).
---

# Phaser.js: структура игры и ресурсы

Местоположение: `src/engine/` — сцены в `engine/scenes/`, менеджеры в `engine/managers/`, игровые классы в `engine/classes/`, ассеты в `engine/assets/`.

## Структура игры

- Разделять игру на сцены: `BootScene`, `MainScene`, `ControlsScene` (объединены в `src/engine/scenes/index.ts`).
- Каждая сцена — отдельный класс, реализующий `Scene` из `phaser`, с именем из `SceneNames`.
- Использовать TypeScript-интерфейсы для типизации сцен и объектов.
- Использовать `this.scene.launch()` и `this.scene.stop()` для явного управления жизненным циклом сцен (например, `MainScene` запускает `ControlsScene`).
- Передавать зависимости между сценами через события (`this.events.emit`) или общий `store` (Redux), а не через глобальные переменные.
- Использовать `init()`, `preload()`, `create()`, `update()` согласно фазам жизненного цикла Phaser.
- Логику сцены дробить на методы `create*` и вызывать их из `create()` в порядке зависимостей (как в `MainScene.create()`: StateManager → Map → Groups → CameraManager → GameManager → SpawnManager), скомментировав нетривиальный порядок.
- Общую функциональность выносить в менеджеры (существуют `CameraManager`, `GameManager`, `StateManager`, `SpawnManager`), а не копировать между сценами.
- Для игр со спавном монстров использовать `MainScene` как основную сцену с спавном через `Spawner`-классы с настраиваемыми интервалами и волнами.
- Использовать `scene.sleep()` и `scene.wake()` для приостановки сцен без их полной остановки, например, при открытии паузы.
- Организовывать управление сценами через `SceneManager` или центральный `GameManager`, а не напрямую из React.

## Ресурсы

- Ассеты структурированы по группам в `src/engine/assets/<группа>/` (interface, map, monsters, objects, player, weapon); в `index.ts` каждой группы уже централизованы пути и ключи.
- Ключи ассетов объявлять в константах/enum (`LevelMaps`, `SceneNames`), пути через `importFilesSourcesAsObject` — никаких сырых строк в сценах.
- Использовать атласы (`atlas`, `spritesheet`) для оптимизации.
- Использовать `this.load.setPath()` для группировки загрузки ресурсов.
- Использовать `this.load.on('progress', ...)` и `this.load.on('complete', ...)` для отображения прогресса загрузки.
- Освобождать ресурсы через `this.scene.scene.keys[sceneKey].cache` и `this.textures.remove(key)` при смене сцены, если не нужны глобально.
- Для игр с большим количеством ассетов реализовать поэтапную загрузку: сначала UI и звук, потом карты и персонажи.
- Использовать `this.load.image()`, `this.load.spritesheet()`, `this.load.audio()` с явным указанием ключей, избегать динамических имён.
- Использовать `this.cache` для хранения не-графических данных, таких как конфигурации предметов, параметры врагов, волны спавна.
- Применять `Phaser.Loader` плагины при необходимости (например, для загрузки JSON-схем, шрифтов, шейдеров).
