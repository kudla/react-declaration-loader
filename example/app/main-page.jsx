import {Component} from 'react';
const LOADER_SOURCE_URI = 'https://github.com/kudla/react-declaration-loader';

export class MainPage extends Component {
    render() {
        return <div>
            <h1>React Declaration Loader Example</h1>
            <p>
                With <a href={LOADER_SOURCE_URI}>react-decalration-loader</a>&nbsp;
                you can use jsx without obvious React declaration.
            </p>
        </div>;
    }
}
