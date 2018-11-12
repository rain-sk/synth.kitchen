import * as React from 'react';
import { IoContext } from './contexts/io';

class Test extends React.Component {
    render() {
        return (
            <h1>test</h1>
        );
    }
}

export class SynthKitchen extends React.Component {
    render() {
        return (
            <IoContext>
                <Test />
            </IoContext>
        );
    }
}
