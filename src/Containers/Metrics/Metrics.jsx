import React, { useState, useEffect } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import { getMovies, getMoviesTop } from '../../Actions/index';
import { useSelector, useDispatch } from 'react-redux';

import { Menu } from 'antd';
import "./Metrics.css"


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
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
];

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];




export default function Metrics (){
  const allMovies = useSelector((store) => store.allMovies);
  const allMoviesTop = useSelector((store) => store.allMoviesTop);



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getMoviesTop());
  }, [dispatch]);


  const combinedMovies = [...allMovies, ...allMoviesTop];


  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  function contarPeliculasPorGenero(combinedMovies) {
    // Crear un objeto para almacenar los conteos de género
    const conteoGeneros = {};
  
    // Recorrer el array combinedMovies
    for (let i = 0; i < combinedMovies.length; i++) {
      const pelicula = combinedMovies[i];
  
      // Verificar si la película tiene un género asignado
      if (pelicula.Genres && pelicula.Genres.length > 0) {
        // Recorrer los géneros de la película
        for (let j = 0; j < pelicula.Genres.length; j++) {
          const genero = pelicula.Genres[j].name;
  
          // Incrementar el conteo del género correspondiente
          if (conteoGeneros[genero]) {
            conteoGeneros[genero]++;
          } else {
            conteoGeneros[genero] = 1;
          }
        }
      }
    }
  
    // Retornar el objeto con los conteos de género
    return conteoGeneros;
    }

    const conteo = contarPeliculasPorGenero(combinedMovies);
    console.log("DATA 100% REAL", conteo)

  

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],}
  

  return (
    <div className='metrics-component'>
         <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
            width: 256,
        }}
        items={items}
        />

        
  
  
        <Pie {...config} />;

    </div>
   
  );
};
