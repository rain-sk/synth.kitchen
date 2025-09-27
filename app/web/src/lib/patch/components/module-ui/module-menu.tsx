import { useCallback } from 'react';
import { MenuDots } from '../toolbar/svg/menu-dots';
import { useRefBackedState } from '../../../shared/utils/use-ref-backed-state';

export const ModuleMenu = () => {
	const [showMenuRef, showMenu, setShowMenu] = useRefBackedState(false);

	const handleClickMenuButton = useCallback(() => {
		setShowMenu(!showMenuRef.current);
	}, [setShowMenu]);

	const handleClickRename = useCallback(() => {
		console.log('init rename');
	}, []);

	return (
		<div className="module-menu">
			<button type="button" onClick={handleClickMenuButton}>
				<MenuDots />
			</button>
			{showMenu && (
				<ul>
					<li>
						<button type="button" onClick={handleClickRename}>
							rename
						</button>
					</li>
				</ul>
			)}
		</div>
	);
};
