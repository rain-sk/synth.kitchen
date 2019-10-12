import * as React from 'react';
import { Link } from 'react-router-dom';

export class FourOhFour extends React.Component {
    render() {
        return (
            <>
                <h1 className="visually-hidden">Synth Kitchen</h1>
                <p>Sorry, we couldn't find what you were looking for. Try going <Link to="/">home</Link>.</p>
            </>
        );
    }
}