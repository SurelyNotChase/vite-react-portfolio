import React from 'react';
import './middle-column-item.css';
import ObservableComponent from '../observable-component/observable-component';

const MiddleColumnItem = (props) => (
  <div className={'column-item '+props.column}>
      <div >
     
        <h2>{props.title}</h2>
        <img src='../assets/images/Chase_Lear_Resume.png'/>
        
      </div>
    </div>
);

MiddleColumnItem.propTypes = {};

MiddleColumnItem.defaultProps = {};

export default MiddleColumnItem;
