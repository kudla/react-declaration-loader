import 'highlight.js/styles/github';
import './index.css';

import {render} from 'react-dom';
import {MainPage} from './main-page';
import MainPageSource from '!!raw-loader!./main-page';
import Highlight from 'react-highlight';

const EXAMPLE_SOURCE_URI = 'https://github.com/kudla/react-declaration-loader/tree/master/example';

function App () {
    return <div>
        <MainPage />
        <Highlight className="js">
            {MainPageSource}
        </Highlight>
        <a href={EXAMPLE_SOURCE_URI}>example source</a>
    </div>;
}
render(<App/>, document.getElementById('app'));
