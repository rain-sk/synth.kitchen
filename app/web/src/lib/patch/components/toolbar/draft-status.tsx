import { useDraftContext } from '../../contexts/draft';
import { t } from '../../../../lang';

export const DraftStatus = () => {
	const { dirty, reset } = useDraftContext();

	return (
		<button
			type="button"
			id="draft-reset"
			disabled={!dirty}
			title={t('patch.reset')}
			onClick={reset}
		>
			{t('patch.reset')}
		</button>
	);
};
