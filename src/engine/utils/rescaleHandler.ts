
import {DPR} from '../constants/zoom';
import {BootScene} from '../scenes';
import {MainScene} from '../scenes/MainScene';

/**
 * Функция для изменения масштабов карты,
 * которая нужна чтобы карта всегда отображалась в максимально возможном разрешении.
 * Мы делаем размеры канваса больше размеров его родителя в window.devicePixelRatio раз,
 * что делает картинку на канвасе более четкой. (Возможно в четвертом мажоре Phaser эту функциональность реализуют
 * в самом движке, тогда необходимость в этом ручном масштабировании отпадёт)
 * Решение было основано на обсуждении https://github.com/photonstorm/phaser/issues/4417
*/
export const rescaleHandler = (scene: MainScene | BootScene) => {
	const widthDPR = Math.round(window.innerWidth * DPR);
	const heightDPR = Math.round(window.innerHeight * DPR);

	if (scene.scale.parent) {
		scene.scale.parent.width = Math.round(window.innerWidth);
		scene.scale.parent.height = Math.round(window.innerHeight);
	}

	if (scene.scale.canvas) {
		scene.scale.canvas.width = widthDPR;
		scene.scale.canvas.height = heightDPR;

		scene.scale.canvas.style.width = `${Math.round(window.innerWidth)} + px`;
		scene.scale.canvas.style.height = `${Math.round(window.innerHeight)} + px`;
	}

	scene.scale.setGameSize(widthDPR, heightDPR);
	scene.scale.setParentSize(window.innerWidth, window.innerHeight);
};
