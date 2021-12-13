import { Image } from "antd";
import React, { useState } from 'react';
import 'antd/dist/antd.css';

function MovieModal(props) {
  console.log(props);
  return (
    <div>
      <p>Release Date: {props.movie.release_date}</p>
      <p>{props.movie.overview}</p>
      <Image
        width={200}
        src={"https://image.tmdb.org/t/p/w500".concat(props.movie.poster_path)}
      />
    </div>
  );
}

export { MovieModal }
