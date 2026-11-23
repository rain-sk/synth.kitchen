import { useDraftContext } from '../../contexts/draft';
import { t } from '../../../../lang';

export const DraftStatus = () => {
	const { dirty, reset } = useDraftContext();

	if (!dirty) return null;

	return (
		<span className="draft-status">
			<span id="draft-state">{t('patch.unsavedChanges')}</span>
			<button
				type="button"
				id="draft-reset"
				title={t('patch.revertToSaved')}
				onClick={reset}
			>
				{t('patch.revertToSaved')}
			</button>
		</span>
	);
};
