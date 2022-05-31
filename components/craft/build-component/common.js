import lz from 'lzutf8';
import {Text as TextComponent} from './Text';
import {Row} from './Row';
import {Col} from './Col';
import {Space} from './Space';
import {PageContainer} from './PageContainer';
import {Container} from './Container';
import {Button} from './Button';
import {Block} from './Block';
import {Swipers} from './Swiper';
import {Divider} from './Divider';
import {Avatar} from './Avatar';
import {Collapse} from './Collapse';
import {ItemMenu} from './ItemMenu';
import {Tabs} from './Tabs';
import CompareProduct from '../re-component/product-static/CompareProduct';
import EnquiryForm from '../re-component/function-static/EnquiryForm';
import InShop from '../re-component/function-static/InShop';
import PaymentMethod from '../re-component/function-static/PaymentMethod';
import Process from '../re-component/function-static/Process';
import SignIn from '../re-component/function-static/SignIn';
import SignUp from '../re-component/function-static/SignUp';
import TrackingOrder from '../re-component/function-static/TrackingOrder';
import ProductDetails from '../re-component/product-static/ProductDetails';
import ProductList from '../re-component/product-static/ProductList';
import PageStatic from './page-static/PageStatic';
import {Field} from './Field';
import {FieldImage} from './FieldImage';
import {ProductBlock} from './ProductBlock';
import {SwipeProductBlock} from './SwipeProductBlock';
import MenuStatic from './form-component/MenuStatic';
import JoinMailForm from './form-component/JoinMailForm';
import {BasicMenu} from './BasicMenu';
import Home from '../re-component/page-static/Home';

export const genderComponentById = (
  jsonData,
  styleCustomize = '',
  id = 'ROOT',
) => {
  const {type, props, hidden, nodes} = jsonData[id];
  const Component = componentsBuild()[type.resolvedName];
  return (
    <Component
      {...props}
      hidden={hidden}
      key={id}
      isNew={true}
      styleCustomize={styleCustomize}
      id={id}>
      {(nodes || []).map((nodeItem) =>
        genderComponentById(jsonData, '', nodeItem),
      )}
    </Component>
  );
};

export const getId = (id) => `wiooh-${id}`;

//components copy
export const componentsBuild = () => ({
  PageContainer,
  Container,
  Text: TextComponent,
  Row,
  Col,
  Space,
  Button,
  Block,
  Swipers,
  Divider,
  Avatar,
  Collapse,
  ItemMenu,
  Tabs,
  CompareProduct,
  EnquiryForm,
  InShop,
  PaymentMethod,
  Process,
  SignIn,
  SignUp,
  TrackingOrder,
  ProductDetails,
  ProductList,
  PageStatic,
  Field,
  FieldImage,
  SwipeProductBlock,
  ProductBlock,
  MenuStatic,
  JoinMailForm,
  BasicMenu,
  Home,
});

export const encode = (json) => {
  return json ? lz.encodeBase64(lz.compress(json)) : '';
};

export const decode = (json) => {
  return json ? lz.decompress(lz.decodeBase64(json)) : '';
};
