import React, { useRef, useEffect } from "react";
import ColumnItem from "../column-item/column-item";
import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "@surelynotchase/flow-field-p5-js";

function ObservableComponent(props) {


  return (

    <div>
      <iframe width="500px" height="576" frameBorder="0" seamless="seamless"
        src={props.source} ></iframe>
      <span>Click the link in title if the observable cell is not loading!</span>
    </div>


  );
}

export default ObservableComponent;