import { hasCoarsePointer, isTouchDevice } from '../isTouchDevice';

describe('Device helpers', () => {
  // Перед каждым тестом очищаем моки, чтобы тесты не влияли друг на друга
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn(),
    });
  });

  describe('hasCoarsePointer', () => {
    it('должен возвращать true, если медиа-запрос совпадает (сенсорный экран)', () => {
      // Имитируем положительный ответ matchMedia
      (window.matchMedia as jest.Mock).mockReturnValue({
        matches: true,
      });

      expect(hasCoarsePointer()).toBe(true);
      expect(window.matchMedia).toHaveBeenCalledWith('(pointer: coarse)');
    });

    it('должен возвращать false, если медиа-запрос не совпадает (мышь)', () => {
      (window.matchMedia as jest.Mock).mockReturnValue({
        matches: false,
      });

      expect(hasCoarsePointer()).toBe(false);
    });

    it('должен возвращать false, если возникла ошибка (например, старый браузер)', () => {
      // Имитируем поломку метода
      (window.matchMedia as jest.Mock).mockImplementation(() => {
        throw new Error('Not supported');
      });

      expect(hasCoarsePointer()).toBe(false);
    });
  });

  describe('isTouchDevice', () => {
    it('должен возвращать результат работы hasCoarsePointer', () => {
      // Проверяем прямую связь: если matchMedia говорит "да", то и функция говорит "да"
      (window.matchMedia as jest.Mock).mockReturnValue({
        matches: true,
      });
      
      expect(isTouchDevice()).toBe(true);
    });
  });
});