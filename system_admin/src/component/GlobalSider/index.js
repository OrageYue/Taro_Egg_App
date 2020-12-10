import React, { Component } from "react";
import { Layout, Menu, Slider, Icon } from "antd";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;
const getIcon = icon => {
  if (typeof icon === "string") {
    if (icon.indexOf("http") === 0) {
      return <img src={icon} alt="icon" className={`sider-menu-item-img`} />;
    }
    return <Icon type={icon} />;
  }

  return icon;
};

class GlobalSider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        current:'1'
    };
  }
  // 菜单节点获取
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return (
      menusData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => {
          const ItemDom = this.getSubMenuOrItem(item);
          return ItemDom;
        })
        .filter(item => item)
    );
  };
  // 获取子菜单
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            disabled={item.disabled}
            key={item.path}
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}

                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return (
        <Menu.Item   key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    }
    return <Menu.Item key={item.path} >{this.getMenuItemPath(item)}</Menu.Item>;
  };
  // 获得菜单路径
  getMenuItemPath = item => {
    const itemPath = item.path;
    if (!itemPath) {
      return item.name;
    }

    const { target, name } = item;
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link target={target} to={itemPath}>
        <span>{name}</span>
      </Link>
    );
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
    
  render() {
    const {
      menuData,
      collapsed,
    } = this.props;

    return (
      <Sider
        theme={window.localStorage.getItem("theme")?window.localStorage.getItem("theme"):'light'}
        trigger={ null }
        collapsed={ collapsed }>
        <Menu
          theme='light'
          onClick={this.handleClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {" "}
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}

export default GlobalSider;

