import { useContext } from 'react';
import { AnimationContextInner } from '../contexts/animation';

export const useAnimationContext = () => useContext(AnimationContextInner);
