---
name: testing-jest-rtl
description: Тестирование в проекте PassDefect с Jest и React Testing Library. Использовать при написании тестов компонентов, хуков, утилит и слайсов, включая userEvent, jest.mock, waitFor и матчеры @testing-library/jest-dom.
---

# Тестирование (Jest + React Testing Library)

## Общие принципы

- Писать unit-тесты для хуков, утилит, слайсов.
- Использовать `React Testing Library`, `Jest`.
- Покрывать критическую логику тестами.
- Писать тесты, которые тестируют поведение, а не реализацию.
- Избегать тестирования приватных деталей реализации компонентов.
- Предпочитать `screen.getByRole`, `screen.getByLabelText`, `screen.getByText` для поиска элементов.
- Использовать `data-testid` только тогда, когда семантические методы поиска неприменимы.
- Организовывать тесты по принципу Given-When-Then (или Arrange-Act-Assert).
- Использовать `describe` блоки для группировки тестов по функциональности.
- Изолировать тесты — каждый тест должен быть независимым.
- Размещать тесты в папке `tests` рядом с тестируемым кодом (например, `src/utils/tests/isTouchDevice.test.ts`, `components/Button/tests/Button.test.tsx`).
- Использовать `jest.fn()` и `jest.mock()`, а не `vi.fn()` или `vi.mock()`, поскольку проект использует Jest, а не Vitest.

## Окружение Jest (jest.config.js)

- Тестовое окружение — `jsdom`, глобальные матчеры подключаются через `src/setupTests.ts` (`@testing-library/jest-dom`).
- Трансформация — `ts-jest` (Jest 30, TypeScript ~5.9).
- CSS/стили мокаются через `identity-obj-proxy`, изображения и бинарные ассеты — через `__mocks__/fileMock.cjs` (см. `moduleNameMapper`).
- window API (например, `matchMedia`) мокать через `Object.defineProperty(window, ..., {writable: true, value: jest.fn()})` в `beforeEach`.

## React Testing Library: лучшие практики

- Всегда использовать `render` компонента внутри `describe` или `test`.
- Использовать `render` с `wrapper`, если компоненту нужны контекст или провайдеры (например, Redux, ThemeProvider).
- Использовать `userEvent` вместо `fireEvent` для симуляции пользовательских действий — он более точно имитирует реальное поведение браузера.
- Импортировать `userEvent` напрямую из `@testing-library/user-event`.

  ```ts
  import { userEvent } from '@testing-library/user-event';
  ```

- Использовать асинхронные утилиты (`findBy*`, `waitFor`) при тестировании асинхронных операций.
- Не использовать `waitFor` без таймаута или условия — это может привести к хрупким тестам.
- Использовать `waitForElementToBeRemoved` для ожидания исчезновения элементов (например, спиннеров).
- Очищать состояние после тестов с помощью `afterEach(cleanup)` — хотя это часто делается автоматически.
- Использовать `jest.mock()` для мокирования внешних зависимостей (API, хуков, модулей).
- Покрывать крайние случаи: загрузка, ошибки, пустые состояния.
- Тестировать обработку пользовательского ввода и валидацию форм.
- Проверять, что события корректно вызываются и передают правильные аргументы.
- Использовать `expect` с соответствующими матчерами из `@testing-library/jest-dom`:
  - `toBeDisabled`, `toBeEnabled`
  - `toBeVisible`
  - `toHaveFocus`
  - `toHaveTextContent`
  - `toHaveClass`
  - `toBeInTheDocument`
- Избегать излишнего количества тестов, проверяющих одну и ту же логику.
- Поддерживать тесты в актуальном состоянии при изменении компонентов.
