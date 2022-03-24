import fs from "fs-extra";
import {
  ClassDeclaration,
  GetAccessorDeclaration,
  Node,
  PropertyDeclaration,
} from "ts-morph";
import GetAccessorTranslator from "./get-accessor";
import PropertyTranslator from "./property";
import { ContainerTranslator } from "./transpiler";

export default class ClassTranslator extends ContainerTranslator {
  constructor(classDec: ClassDeclaration, stream?: NodeJS.WritableStream) {
    super();
    this.children = [
      ...classDec.getProperties(),
      ...classDec.getGetAccessors(),
    ];
    this.classDec = classDec;
    this.stream = stream;
  }

  children: (PropertyDeclaration | GetAccessorDeclaration)[];
  classDec?: ClassDeclaration;
  stream?: NodeJS.WritableStream;

  translateBeginning() {
    // write start of contract
    this.stream?.write(this.printNewLine());
    this.stream?.write(
      `contract ${this.classDec?.getName()} {${this.printNewLine()}`
    );
  }

  translateChildren() {
    this.children.forEach((child) => {
      if (Node.isPropertyDeclaration(child)) {
        this.translateProperty(child);
      } else if (Node.isGetAccessorDeclaration(child)) {
        this.translateGetAccessor(child);
      }
    });
  }

  translateEnding() {
    // write end of contract
    this.stream?.write(`}${this.printNewLine()}`);
  }

  translateProperty(propDec: PropertyDeclaration) {
    // indent
    this.printChildIndentation();

    const propertyTranslator = new PropertyTranslator(propDec, this.stream);
    propertyTranslator.translate();
    this.stream?.write(this.printNewLine());
  }

  translateGetAccessor(getAcsrDec: GetAccessorDeclaration) {
    const getAcsrTranslator = new GetAccessorTranslator(getAcsrDec, this.stream);
    getAcsrTranslator.format = this.format;
    getAcsrTranslator.indentation = this.indentation + 2;
    getAcsrTranslator.translate();
  }
}
