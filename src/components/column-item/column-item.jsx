import React from 'react';
import ObservableComponent from '../observable-component/observable-component';

import './column-item.css';

const ColumnItem = (props) => (

    <div className={'column-item '+ props.column} >
      <div >
        <h2>{props.title}</h2>
           <ObservableComponent></ObservableComponent>
        <p>
          Aside from the programming and design that I continue to build on at every opportunity, my time at university
          has really afforded me confidence in my ability to learn adaptively, solve problems efficiently, and
          communicate effectively.
        </p>
        <p>
          Leadership and teamwork, and community building have been an essential and critical area of growth during my
          time at RIT,
        </p>
        <p>
          <br />
          Family and friends are very important to me, and I try to make more everwhere I go. I like to believe that the
          best way to get to know people is when working on meaningful challenges together, and I try to keep this in
          mind during all parts of my life.
        </p>
      </div>
    </div>

);

ColumnItem.propTypes = {};

ColumnItem.defaultProps = {};

export default ColumnItem;
