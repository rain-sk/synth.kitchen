import * as React from 'react';
import { Link } from 'react-router-dom';

import '../styles/home.css';

import example1 from '../../home-example-1.png';
import example2 from '../../home-example-2.png';

export class Home extends React.Component {
    render() {
        return (
            <div className="page-home-wrapper">
                <header className="page-home">
                    <nav>
                        <h1>Synth Kitchen</h1>
                        <ul>
                            <li>
                                <Link to="/patch">Patch Editor (beta)</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className="page-home">
                    <section>
                        <article id="intro" className="light">
                            <h2>
                                A web-based modular synthesis environment
                            </h2>
                            <p>
                                Because what else are you doing during quarantine?
                            </p>
                        </article>
                    </section>

                    <section>

                        <article id="why">
                            <h2>
                                Why make a modular synth website?
                            </h2>
                            <dl>
                                <dt>Portable</dt>
                                <dd>Works on any device that runs a modern web browser</dd>

                                <dt>Shareable</dt>
                                <dd>Send and share links with the world</dd>

                                <dt>Accessible</dt>
                                <dd>Browsers have straightforward, well-documented accessibility support</dd>
                            </dl>
                        </article>

                        <article id="example" className="light">
                            <h2>
                                How does it work?
                            </h2>
                            <figure>
                                <img src={example1}
                                    alt="An example of a patch made with synth.kitchen. Frequency modulation and delayed feedback make for a lively time." />
                                <figcaption>
                                    <i>Modules can be added and connected in limitless variations</i>
                                </figcaption>
                            </figure>
                            <figure className="img-right">
                                <img src={example2}
                                    alt="A MIDI Device module passes MIDI note data coming from an external device to a MIDI Oscillator module." />
                                <figcaption>
                                    <i>Connect to your MIDI hardware/software (requires Chrome/Edge)</i>
                                </figcaption>
                            </figure>
                        </article>
                    </section>
                    <p>Want to try it out? Open the <Link to="/patch">patch editor</Link>.</p>
                </main>
            </div>
        );
    }
}