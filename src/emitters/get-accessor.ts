import { GetAccessorDeclaration } from "ts-morph";
import { MethodEmitter } from "./emitter";
import translateType from "./helpers/types";

export default class GetAccessorEmitter extends MethodEmitter {
  constructor(
    getAcsrDec: GetAccessorDeclaration,
    stream?: NodeJS.WritableStream
  ) {
    super();
    this.children = getAcsrDec.getStatements();
    this.getAcsrDec = getAcsrDec;
    this.stream = stream;
  }

  getAcsrDec?: GetAccessorDeclaration;
  stream?: NodeJS.WritableStream;

  emitBeginning() {
    // console.log(this.getAcsrDec?.getStatementsWithComments())
    // console.log(this.getAcsrDec?.getJsDocs())

    this.stream?.write(this.emitNewLine());
    // indent
    this.emitIndentation();
    // write start of contract
    this.stream?.write(
      `function get${this.getAcsrDec?.getName()}() public view returns (${translateType(this.getAcsrDec?.getReturnType())}) {${this.emitNewLine()}`
    );
  }
}
