export type IDisableKeyMovement = {
	type: 'DisableKeyMovement';
	payload: {
		isKeyMovementEnabled: boolean;
	};
};

export const disableKeyMovementAction = (): IDisableKeyMovement => ({
	type: 'DisableKeyMovement',
	payload: {
		isKeyMovementEnabled: false
	}
});
