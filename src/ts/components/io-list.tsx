import * as React from 'react';
import { Io } from '../contexts/io';
import { Io as IoComponent } from './io';

export class IoList extends React.PureComponent {
    render() {
        return (
            <Io.Consumer>
                { value => <IoComponent state={value.state} dispatch={value.dispatch} /> }
            </Io.Consumer>
        );
    }
}