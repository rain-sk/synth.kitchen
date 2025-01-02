import { useContext } from 'react';
import { PatchContext } from '../patch/contexts/patch';

export const usePatch = () => useContext(PatchContext);
