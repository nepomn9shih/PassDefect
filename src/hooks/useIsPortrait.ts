import {useState, useEffect} from 'react';

/** Определение вертикально ли ориентирован экран */
export const useIsPortrait = () => {
	const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(orientation: portrait)");

		const handleOrientationChange = (event: MediaQueryListEvent) => {
			setIsPortrait(event.matches);
		};

		mediaQuery.addEventListener("change", handleOrientationChange);

		return () => {
			mediaQuery.removeEventListener("change", handleOrientationChange);
		};
	}, []);

	return isPortrait;
};
