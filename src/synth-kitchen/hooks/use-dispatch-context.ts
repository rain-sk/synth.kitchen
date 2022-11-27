import { useContext } from 'react';
import { DispatchContext } from '../contexts/dispatch';

export const useDispatchContext = () => useContext(DispatchContext);
