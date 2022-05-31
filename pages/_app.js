import {Provider} from 'react-redux';
import ErrorComponent from '../components/ErrorComponent';
import LoginModal from '../components/modals/login-modal';
import PublicModal from '../components/modals/public-modal';
import {useStore} from '../reduxs/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '~/public/scss/theme-default.scss';
import '~/public/scss/custom-styles.scss';
import '~/styles/global.scss';
import Notification from '~/components/public/notification';
import RightModal from '~/components/modals/right-modal';
import ScrollToTop from '~/components/public/ScrollToTop';

export default function App({Component, pageProps}) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <RightModal />
      <LoginModal />
      <PublicModal />
      <ErrorComponent />
      <Notification />
      <ScrollToTop />
    </Provider>
  );
}
