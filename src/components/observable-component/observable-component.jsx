import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@surelynotchase/flow-field-p5-js";

function ObservableComponent() {


  return (

    <iframe width="100%" height="576" frameborder="0"
    src="https://observablehq.com/embed/@surelynotchase/flow-field-p5-js?cells=flowField"></iframe>
  );
}

export default ObservableComponent;