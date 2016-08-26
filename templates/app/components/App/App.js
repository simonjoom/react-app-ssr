import {Component, PropTypes} from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import DevTools from 'mobx-react-devtools';
import {observer} from "mobx-react";
import cx from 'classnames';
import dispatch from '~/temp/core/dispatch';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import AppBar from '../AppBar';
import AppNav from '../AppNav';
import AuthModal from '../AuthModal';

//important to load all framework css and disable eslint for that
// eslint-disable-next-line no-unused-vars
import s from './App.css';


// global styles
//import '../styles/_.global.css';

// module styles
import styles from '../../styles/app.layout.css';


const handleThemeToggle = () => {
    dispatch('ui.theme.toggleTheme');
};

@observer(['context','appstate'])
class App extends Component {
    static propTypes = {
      context: PropTypes.shape({
            setTitle: PropTypes.func,
            setMeta: PropTypes.func,
            muiTheme: PropTypes.object.isRequired
        }).isRequired,
        appstate: PropTypes.object.isRequired,
        breakpoints:PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
        error: PropTypes.object,
    };
    constructor(props) {
        super(props)
    }

    static childContextTypes = {
    //    insertCss: PropTypes.func.isRequired,
        setTitle: PropTypes.func.isRequired,
        setMeta: PropTypes.func.isRequired,
        muiTheme: PropTypes.object.isRequired
    };

    getChildContext() {
        const context = this.props.context;
        return {
            setTitle: context.setTitle || emptyFunction,
            setMeta: context.setMeta || emptyFunction,
            muiTheme: this.props.appstate.ui.theme.getMui()
        };
    }

    componentWillUnmount() {
        console.log('demonte')
    }

    render() {
    console.log(this.props.context)
        const {ui, auth} = this.props.appstate;
        const isDev = true;
        console.log(typeof window === 'object' ? 'client-side' : 'server-side');
        const breakpoints=this.props.breakpoints;
        return (
        <div>
                <AppNav
                    open={ui.appNav.isOpen}
                    docked={ui.appNav.isDocked}
                    accountMenuIsOpen={ui.appBar.accountMenuIsOpen}>
                    <Header />

                </AppNav>
                <If condition={isDev}>
                <DevTools position={{ bottom: 0, right: '15px' }}/>
                </If>

                <Paper zDepth={1}
                       className={cx({ [styles.su]: ui.layoutIsShifted },{'m0':breakpoints.xs,'m1':breakpoints.su,'m2':breakpoints.mu})}>
                    <Toggle
                        label="Toggle Theme"
                        defaultToggled={ui.theme.toggleThemestate}
                        onToggle={handleThemeToggle}/>

                    <AppBar accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
                            layoutIsShifted={ui.layoutIsShifted}
                            authCheck={auth.check}
                            user={auth.user} />
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </Paper>


                <Paper zDepth={1}
                       className={cx({ [styles.su]: ui.layoutIsShifted },{'m0':breakpoints.xs,'m1':breakpoints.su,'m2':breakpoints.mu})}>
                    <Feedback />

                </Paper>
                <Footer />
                <Snackbar
                    open={ui.snackBar.isOpen}
                    message={ui.snackBar.message}
                    autoHideDuration={ui.snackBar.duration}
                    onRequestClose={() => ui.snackBar.close()}
                />
                <AuthModal
                    open={ui.authModal.isOpen}
                    showSection={ui.authModal.showSection}
                />
            </div>
        );
    }

}

export default App;
