import {Pinch} from 'phaser3-rex-plugins/plugins/gestures.js';

import {
	INITIAL_ZOOM,
	MAX_ZOOM,
	MIN_ZOOM,
	ZOOM_STEP
} from '../../constants/zoom';
import {MainScene} from '../../scenes/MainScene';
import {rescaleHandler} from '../../utils/rescaleHandler';
import {CameraManagerProps} from './types';
import {RESCALE_EVENT_NAME, ZOOM_EVENT_NAME} from '../../constants/events';
import {setZoom} from '../../../reducers/slices';

export class CameraManager {
	scene: MainScene;

	constructor({scene}: CameraManagerProps) {
		this.scene = scene;
	}

	setupCamera() {
		// Настраиваем камеру
		const cam = this.scene.cameras.main;
		const scene = this.scene;
		// Ограничиваем скролл по карте размерами карты
		cam.setBounds(0, 0, this.scene.map.map.widthInPixels, this.scene.map.map.heightInPixels);
		// Настраиваем зум (по умолчанию 1)
		cam.setZoom(INITIAL_ZOOM);

		// Изначально центрируем камеру на игрока
		// cam.centerOn(player);
        cam.centerToBounds();

		// Настраиваем скролл при нажатии левой кнопки мыши и перетаскивании
		this.scene.input.on('pointermove', (p: Phaser.Input.Pointer) => {
			if (!p.isDown) {
				return;
			}

			cam.scrollX -= (p.position.x - p.prevPosition.x) / cam.zoom;
			cam.scrollY -= (p.position.y - p.prevPosition.y) / cam.zoom;
		});
		// Настраиваем зумирование колесиком мыши
		this.scene.input.on('wheel', ({deltaY}: {deltaY: number}) => {
			if (deltaY > 0) {
				const newZoom = cam.zoom - ZOOM_STEP;
				if (newZoom > MIN_ZOOM) {
					cam.zoom = newZoom;
					scene.events.emit(ZOOM_EVENT_NAME);
				}
			}

			if (deltaY < 0) {
				const newZoom = cam.zoom + ZOOM_STEP;
				if (newZoom < MAX_ZOOM) {
					cam.zoom = newZoom;
					scene.events.emit(ZOOM_EVENT_NAME);
				}
			}
		});

		// Настраиваем зумирование с помощью пинча 2 пальцами на мобильных устройствах
		const pinch = new Pinch(this.scene);

		pinch
			.on('pinch', function({scaleFactor}: Pinch) {
				const newZoom = cam.zoom * scaleFactor;

				if (newZoom > MIN_ZOOM && newZoom < MAX_ZOOM) {
					cam.zoom = newZoom;
					scene.events.emit(ZOOM_EVENT_NAME);
				}
			}, this);
	}

	setupEventListener() {	
		this.scene.events.on(ZOOM_EVENT_NAME, () => {
			// отправляем в стейт новое значение зума
			this.scene.store.dispatch(setZoom(this.scene.cameras.main.zoom));

			rescaleHandler(this.scene);
		});

		this.scene.events.on(RESCALE_EVENT_NAME, () => {
			rescaleHandler(this.scene);
		});
	}

	setup() {
		window.addEventListener('resize', () => {
			this.scene.events.emit(RESCALE_EVENT_NAME);
		});
		rescaleHandler(this.scene);
		this.setupCamera();
		this.setupEventListener();
	}
}
