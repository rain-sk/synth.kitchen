export type IEnableKeyMovement = {
	type: 'EnableKeyMovement';
	payload: {
		isKeyMovementEnabled: boolean;
	};
};

export const enableKeyMovementAction = (): IEnableKeyMovement => ({
	type: 'EnableKeyMovement',
	payload: {
		isKeyMovementEnabled: true
	}
});
