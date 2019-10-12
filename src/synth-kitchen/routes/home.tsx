import * as React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
    render() {
        return (
            <main>
                <h1>Synth Kitchen</h1>
                <p>A modular synthesizer that runs in your web browser.</p>
                <p>Want to try it out? Open the <Link to="/patch">patch editor</Link>.</p>
            </main>
        );
    }
}