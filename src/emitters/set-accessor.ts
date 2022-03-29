import { SetAccessorDeclaration } from "ts-morph";
import { MethodEmitter } from "./emitter";
import translateType from "./helpers/types";

export default class SetAccessorEmitter extends MethodEmitter {
  constructor(
    setAcsrDec: SetAccessorDeclaration,
    stream?: NodeJS.WritableStream
  ) {
    super();
    this.children = setAcsrDec.getStatements();
    this.setAcsrDec = setAcsrDec;
    this.stream = stream;
  }

  setAcsrDec?: SetAccessorDeclaration;
  stream?: NodeJS.WritableStream;

  emitBeginning() {
    this.stream?.write(this.emitNewLine());
    // indent
    this.emitIndentation();
    // write start of contract
    const parameters = this.setAcsrDec?.getParameters();
    if (!parameters) {
        throw new Error("No argument");
    }
    const parameter = parameters[0];
    const paramName = parameter.getName();
    const paramType = translateType(parameter.getType());
    this.stream?.write(
      `function set${this.setAcsrDec?.getName()}(${paramType} ${paramName}) public {${this.emitNewLine()}`
    );
  }
}
