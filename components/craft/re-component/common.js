import {Text} from './Text';
import {Row} from './Row';
import {Col} from './Col';
import {Space} from './Space';
import {PageContainer} from './PageContainer';
import {Container} from './Container';
import {Button} from './Button';
import {Block} from './Block';
import {Swipers} from './Swiper';
import {MiddleBlock} from './MiddleBlock';
import {Divider} from './Divider';
import {Avatar} from './Avatar';
import {Collapse} from './Collapse';
import {ItemMenu} from './ItemMenu';
import {SubMenu} from './SubMenu';
import {Link} from './Link';
import {Tabs} from './Tabs';
import {PaymentRegister} from './form-component/PaymentRegister';
import {MapGoogle} from './MapGoogle';
import ProductList from './product-static/ProductList';
import ProductDetails from './product-static/ProductDetails';
import Process from './function-static/Process';
import SignUp from './function-static/SignUp';
import SignIn from './function-static/SignIn';
import ContactForm from './function-static/ContactForm';
import CompareProduct from './product-static/CompareProduct';
import InShop from './function-static/InShop';
import OrderComplete from './function-static/OrderComplete';
import {Field} from './Field';
import {FieldImage} from './FieldImage';
import {ProductBlock} from './ProductBlock';
import {SwipeProductBlock} from './SwipeProductBlock';
import MenuStatic from './form-component/MenuStatic';
import JoinMailForm from './form-component/JoinMailForm';
import {BasicMenu} from './BasicMenu';
import Home from './page-static/Home';
import lz from 'lzutf8';

export const encode = (json) => {
  return json ? lz.encodeBase64(lz.compress(json)) : '';
};

export const decode = (json) => {
  return json ? lz.decompress(lz.decodeBase64(json)) : '';
};

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const getId = (id) => `wiooh-${id}`;

export const onStyleChange = ({id, mode, styleObj, componentStyle}) => ({
  ...componentStyle,
  [mode]: {
    [id]: {
      ...componentStyle[mode][id],
      ...styleObj,
    },
  },
});

export const handleStyleChange = () => {};

export const components = () => ({
  PageContainer: PageContainer,
  Container: Container,
  Text: Text,
  Row: Row,
  Col: Col,
  Space: Space,
  Button: Button,
  Block: Block,
  Swipers: Swipers,
  MiddleBlock: MiddleBlock,
  Divider: Divider,
  Avatar: Avatar,
  Collapse: Collapse,
  ItemMenu: ItemMenu,
  SubMenu: SubMenu,
  Tabs: Tabs,
  Link: Link,
  ProductList: ProductList,
  ProductDetails: ProductDetails,
  Process: Process,
  SignUp: SignUp,
  SignIn: SignIn,
  ContactForm: ContactForm,
  MapGoogle: MapGoogle,
  PaymentRegister: PaymentRegister,
  CompareProduct: CompareProduct,
  InShop: InShop,
  OrderComplete: OrderComplete,
  Field,
  FieldImage,
  SwipeProductBlock,
  ProductBlock,
  MenuStatic,
  JoinMailForm,
  BasicMenu,
  Home: Home,
});

export const resolver = () => ({
  PageContainer,
  Container,
  Text,
  Row,
  Col,
  Space,
  Button,
  Block,
  Swipers,
  MiddleBlock,
  Divider,
  Avatar,
  Collapse,
  ItemMenu,
  SubMenu,
  Link,
  Tabs,
  PaymentRegister,
  ProductList,
  ProductDetails,
  Process,
  SignUp,
  SignIn,
  ContactForm,
  MapGoogle,
  CompareProduct,
  InShop,
  OrderComplete,
  Field,
  FieldImage,
  SwipeProductBlock,
  ProductBlock,
  MenuStatic,
  JoinMailForm,
  BasicMenu,
  Home,
});
