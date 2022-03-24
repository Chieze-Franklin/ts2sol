import {
  ClassDeclaration,
  ClassMemberTypes,
  GetAccessorDeclaration,
  Node,
  PropertyDeclaration,
} from "ts-morph";
import GetAccessorEmitter from "./get-accessor";
import PropertyEmitter from "./property";
import { BlockEmitter } from "./emitter";

export default class ClassEmitter extends BlockEmitter {
  constructor(classDec: ClassDeclaration, stream?: NodeJS.WritableStream) {
    super();
    this.children = [
      ...classDec.getProperties(),
      ...classDec.getGetAccessors(),
    ];
    this.classDec = classDec;
    this.stream = stream;
  }

  children: ClassMemberTypes[];
  classDec?: ClassDeclaration;
  stream?: NodeJS.WritableStream;

  emitBeginning() {
    // write start of contract
    this.stream?.write(this.emitNewLine());
    this.stream?.write(
      `contract ${this.classDec?.getName()} {${this.emitNewLine()}`
    );
  }

  emitChildren() {
    this.children.forEach((child) => {
      if (Node.isPropertyDeclaration(child)) {
        this.emitProperty(child);
      } else if (Node.isGetAccessorDeclaration(child)) {
        this.emitGetAccessor(child);
      }
    });
  }

  emitEnding() {
    // write end of contract
    this.stream?.write(`}${this.emitNewLine()}`);
  }

  emitProperty(propDec: PropertyDeclaration) {
    // indent
    this.emitChildIndentation();

    const propertyEmitter = new PropertyEmitter(propDec, this.stream);
    propertyEmitter.emit();
    this.stream?.write(this.emitNewLine());
  }

  emitGetAccessor(getAcsrDec: GetAccessorDeclaration) {
    const getAcsrEmitter = new GetAccessorEmitter(getAcsrDec, this.stream);
    getAcsrEmitter.format = this.format;
    getAcsrEmitter.indentation = this.indentation + 2;
    getAcsrEmitter.emit();
  }
}
