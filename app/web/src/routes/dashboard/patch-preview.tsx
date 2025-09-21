import React from 'react';
import { Patch } from 'synth.kitchen-shared';
import { Link } from 'wouter';

export const PatchPreview: React.FC<{ patch: Patch }> = ({ patch }) => {
	return <Link to={`/patch/${patch.slug}`}>{patch.name}</Link>;
};
