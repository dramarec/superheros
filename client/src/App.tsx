import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppBar, Superhero, Superheros, CreateSuperhero, } from './lib/components';
import { Affix, Layout, Spin } from 'antd';

const { Content } = Layout;

function App() {
    return (
        <Router>
            <Affix offsetTop={0} className="app__affix-header" >
                <AppBar />
            </Affix >
            <Switch>
                <Route exact path='/'>
                    <Suspense fallback={
                        <Content className="spinner">
                            <Spin size="large" tip="Launching Superheros..." />
                        </Content>
                    }>
                        <Superheros />
                    </Suspense>
                </Route>
                <Route exact path='/superhero/:id'>
                    <Superhero />
                </Route>
                <Route exact path='/superhero'>
                    <CreateSuperhero />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;