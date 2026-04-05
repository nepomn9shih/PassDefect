export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
 moduleNameMapper: {
    // Чтобы Jest не ругался на импорты стилей и картинок
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '../__mocks__/fileMock.js',
  },
  transform: {
    // Трансформируем JS/JSX/TS/TSX файлы с помощью ts-jest
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  }
};