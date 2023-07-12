import {
    AppstoreOutlined,
    SettingOutlined,    
    MailOutlined,
  } from '@ant-design/icons';
  import { Menu } from 'antd';

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Filter movies', 'sub1', <MailOutlined />, [
      getItem('Genre', 'g1', null, [getItem('Action', '1'), getItem('Adventure', '2')], 'group'),
      getItem('For Year', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
 

  ];


  export default function FilterMovies (){
    const onClick = (e) => {
        console.log('click ', e);
      };

  return (
     <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
  
};