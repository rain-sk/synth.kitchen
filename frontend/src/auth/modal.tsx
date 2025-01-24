import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import Modal from 'react-modal';
import { AuthForm } from './form';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

export const AuthModal: React.FC<{ open: boolean }> = ({ open }) => {
	const session = useSessionContext();

	return session.loading ? null : (
		<Modal isOpen={open} style={customStyles}>
			<h2>Log in or Sign up</h2>
			<AuthForm />
		</Modal>
	);
};
