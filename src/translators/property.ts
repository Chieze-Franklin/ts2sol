import fs from "fs-extra";
import { PropertyDeclaration } from "ts-morph";
import { IContentTranslator } from "./transpiler";

export default class PropertyTranslator implements IContentTranslator {
  constructor(propDec: PropertyDeclaration, stream?: NodeJS.WritableStream) {
    this.propDec = propDec;
    this.stream = stream;
  }

  propDec?: PropertyDeclaration;
  stream?: NodeJS.WritableStream;

  translate() {
    const propName = this.propDec?.getName();
    if (!propName) return;

    // write data type
    const propType = this.propDec?.getType();
    if (propType?.isNumber) this.stream?.write("uint ");

    // write name
    this.stream?.write(`${propName};`);
  }
}
