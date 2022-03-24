import { PropertyDeclaration } from "ts-morph";
import { IInlineEmitter } from "./emitter";
import translateType from "./helpers/types";

export default class PropertyEmitter implements IInlineEmitter {
  constructor(propDec: PropertyDeclaration, stream?: NodeJS.WritableStream) {
    this.propDec = propDec;
    this.stream = stream;
  }

  propDec?: PropertyDeclaration;
  stream?: NodeJS.WritableStream;

  emit() {
    const propName = this.propDec?.getName();
    if (!propName) return;

    // write data type
    const propType = translateType(this.propDec?.getType());
    this.stream?.write(`${propType} `);

    // write name
    this.stream?.write(`${propName};`);
  }
}
