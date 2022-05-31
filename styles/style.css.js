export const defaultStyle = `
.craft-block {
  position: relative;
  width: 100%;
}
.payment-form label {
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  color: #666;
  display: inline-block;
  margin-bottom: .5rem;
}

.payment-form .ant-select {
  margin-right: 25px;
}

.payment-box-form-address {
  display: flex;
  justify-content: space-between;
}

.payment-box-form-address .payment-input-address {
  margin-right: 25px;
  width: 100%;
}

.payment-box-form-address .payment-input-postal-code {
  max-width: 200px;
}

.payment-form .form-children {
  margin: 55px 0;
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0px 0px 7px #AAA;
}

.btn-payment-content {
  padding-top: 100px;
  text-align: center;
}

.btn-payment-content button {
  background-color: #f2dfd2;
  width: 250px;
  border-radius: 30px;
  border: 0;
  color: #666;
  font-weight: 800;
  font-size: 20px;
  padding: 15px;
  box-shadow: 5px 6px 6px 0px rgba(0, 0, 0, 0.2);
  height: 50px;
}

.form-check-label a {
  color: blue;
  margin: 5px;
}

.block-page-payment .payment-form label {
  font-weight: 700;
}

button, input, optgroup, select, textarea {
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: inherit;
  line-height: inherit;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.form-group {
  margin-bottom: 1rem;
}

.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}

.block-page-payment .btn-payment-content {
  padding-top: 100px;
  text-align: center;
}

.ant-select.form-control {
  height: auto;
  padding: 0;
  .ant-select-selector {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
}

.block-page-payment .payment-box-form-date {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
}

.ant-menu-root .ant-menu-item .icon {
  margin-right: 7px;
}

.ant-menu-horizontal {
  background: transparent;
}

.ant-menu-horizontal {
  line-height: 46px;
  border: 0;
  
  -webkit-box-shadow: none;
  box-shadow: none;
}

.ant-menu-submenu-title {
  border-bottom: 0px solid #1890ff !important;
}

.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
  color: #1890ff;
  border-bottom: 0px solid #1890ff !important;
}
.flex-div {
  display: flex;
  width: 100%;
  height: 100%;
}

.flex-div .middle-flex-div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.default-craft {
  min-height: 100px;
}

.padding-default {
  padding: 10px;
}

.container-fluid, .container-lg, .container-md, .container-sm, .container-xl {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.form-checkbox-agree {
  display: flex;
}
.checkbox-agree {
  margin: 5px 10px 0px 0px;
}

@media (min-width: 576px) {
  .container {
      max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
      max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
      max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
`;
