import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Einstellungen from './components/pages/Einstellungen';

import AssignmentState from './context/assignments/AssignmentState';

const App = () => {
  return (
    <AssignmentState>
      <Router>
        <Fragment>
          <Header />
          <main className='py-3'>
            <Container>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/einstellungen' component={Einstellungen} />
              </Switch>
            </Container>
          </main>
          <Footer />
        </Fragment>
      </Router>
    </AssignmentState>
  );
};

export default App;
