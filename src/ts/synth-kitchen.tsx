import * as React from 'react';
import { IoContext } from './contexts/io';
import { IoList } from './components/io-list';

export class SynthKitchen extends React.Component {
    render() {
        return (
            <IoContext>
                <IoList />
            </IoContext>
        );
    }
}
