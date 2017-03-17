import 'highlight.js/styles/github';
import './index.css';

import {render} from 'react-dom';
import {MainPage} from './main-page';
import MainPageSource from '!!raw-loader!./main-page';
import Highlight from 'react-highlight';

function App () {
    return <div>
        <MainPage />
        <Highlight className="js">
            {MainPageSource}
        </Highlight>
    </div>;
}
render(<App/>, document.getElementById('app'));
