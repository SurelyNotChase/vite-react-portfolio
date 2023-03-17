import React from 'react';
import ObservableComponent from '../observable-component/observable-component';

import './column-item.css';

const ColumnItem = (props) => (

  <div  className={'column-item ' + props.column} >
    <div >
      <h2 ><a href={props.url}>{props.title}</a></h2>
      <div >

        {props.content}

      </div>
      
    </div>
  </div>

);

ColumnItem.propTypes = {};

ColumnItem.defaultProps = {};

export default ColumnItem;
