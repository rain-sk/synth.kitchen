import { useContext } from 'react';
import { PatchContext } from '../contexts/patch';

export const usePatch = () => useContext(PatchContext);
