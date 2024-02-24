import { useContext } from 'react';
import { StateContext } from '../contexts/state';

export const useStateContext = () => useContext(StateContext);
