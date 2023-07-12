import React, { useEffect } from 'react';
import { getMovies, getMoviesTop } from '../../Actions/index';
import { useSelector, useDispatch } from 'react-redux';
import "./Metrics.css"
import { Card, Statistic } from 'antd';
import { Area, Column } from '@ant-design/plots';
import { ArrowUpOutlined } from '@ant-design/icons';




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
 
  const lanzamientosPorAnio = combinedMovies.reduce((acumulador, pelicula) => {
    const anio = new Date(pelicula.date).getFullYear();
    if (!acumulador[anio]) {
      acumulador[anio] = 1;
    } else {
      acumulador[anio]++;
    }
    return acumulador;
  }, {});



  const dataDate = Object.entries(lanzamientosPorAnio).map(([anio, cantidad]) => ({
    date: parseInt(anio),
    value: cantidad,
  }));


  const totalPeliculas = combinedMovies.length;
  let sumaRates = 0;
  
  for (let i = 0; i < totalPeliculas; i++) {
    sumaRates += combinedMovies[i].rate / 10; // Estoy dividiendo por 10 para normalizar en un rango de 0 a 1
  }
  
  const promedioTotal = (sumaRates / totalPeliculas) * 10;
  


  const cantidadPorRate = {};

    for (let i = 0; i < totalPeliculas; i++) {
      const rate = Math.round(combinedMovies[i].rate); // Redonde el rate a un número entero
      cantidadPorRate[rate] = (cantidadPorRate[rate] || 0) + 1;
    }

    const porcentajes = {};

    for (let rate = 1; rate <= 10; rate++) {
      const cantidad = cantidadPorRate[rate] || 0;
      const porcentaje = (cantidad / totalPeliculas) * 100;
      porcentajes[rate] = porcentaje.toFixed(2);
    }

    const dataRate = [];

    for (let rate = 1; rate <= 10; rate++) {
      const porcentaje = parseFloat(porcentajes[rate]);
      dataRate.push({
        rate: rate.toString(),
        value: porcentaje,
      });
    }


    const cantidadPorGenero = {};

for (let i = 0; i < combinedMovies.length; i++) {
  const generos = combinedMovies[i].Genres;

  for (let j = 0; j < generos.length; j++) {
    const genero = generos[j].name;

    if (!cantidadPorGenero[genero]) {
      cantidadPorGenero[genero] = 1;
    } else {
      cantidadPorGenero[genero]++;
    }
  }
}

const dataGenre = Object.entries(cantidadPorGenero).map(([genero, cantidad]) => ({
  genre: genero,
  value: cantidad,
}));




  
  const configDate = {
    data:dataDate,
    xField: 'date',
    yField: 'value',
    xAxis: false,
    yAxis: false,
  };

  const configRate = {
    data:dataRate,
    xField: 'rate',
    yField: 'value',
    xAxis: false,
    yAxis: false,
  };



  const configGenre = {
    data: dataGenre.sort((a, b) => a.value - b.value),
    xField: 'genre',
    yField: 'value',
    xAxis: false,
    yAxis: false,
  };

  

  return (
    <div className='metrics-conteiner'>
    <Card
      size="small"
      title={
        <Statistic title={
          <div className='titles-metrics-home'>
            Films quantity
          </div>} 
          value={combinedMovies.length}
          valueStyle={{
          color: '#454a5f',
          }}
          />
      }
      style={{
        width: 300,
        height:150
      }}
      className='carta-metricas'
      headStyle={{
        borderBottom: 'none'
      }}
    ><Area {...configGenre} height={100} width={100} className='grafico-cartas'/></Card>


    <Card
      size="small"
      title={
        <Statistic title={
        <div className='titles-metrics-home'>
          Quantity of genres
        </div> }
        value={`${Object.keys(cantidadPorGenero).length} genres`}
        valueStyle={{
          color: '#454a5f',
          }}
         />
      }
      style={{
        width: 300,
        height: 150
      }}
      className='carta-metricas'
      headStyle={{
        borderBottom: 'none'
      }}
    >
      <Column {...configGenre} height={100} width={100} className='grafico-cartas' />
    </Card>


    <Card
      size="small"
      title={
        <Statistic title={
        <div className='titles-metrics-home'>
          Amount per year
        </div>}  
        value={`${lanzamientosPorAnio[2023]} last year`}      
        valueStyle={{
        color: '#454a5f',
        }}
        prefix={<ArrowUpOutlined />}/>
      }
      style={{
        width: 300,
        height:150
      }}
      className='carta-metricas'
      headStyle={{
        borderBottom: 'none'
      }}
    ><Area {...configDate} height={100} width={100} className='grafico-cartas'/></Card>

        <Card
      size="small"
      title={
        <Statistic
          title={
            <div className='titles-metrics-home'>
              Rate
            </div>}
          value={promedioTotal}
          
          precision={1}
          valueStyle={{
            color: '#454a5f',
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      }
      style={{
        width: 300,
        height:150
      }}
      className='carta-metricas'
      headStyle={{
        borderBottom: 'none'
      }}
      ><Column {...configRate} height={100} width={100} className='grafico-cartas'/></Card>

    </div>
   
  );
};