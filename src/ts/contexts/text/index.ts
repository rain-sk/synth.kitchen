import * as React from 'react';
import { Text, defaultText } from './text';

export const TextContext = React.createContext<Text>(defaultText);