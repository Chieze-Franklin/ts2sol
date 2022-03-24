import fs from "fs-extra";
import { ClassDeclaration, PropertyDeclaration } from "ts-morph";
import { ContainerTranslator } from "./transpiler";

export default class ClassTranslator extends ContainerTranslator {
  constructor(classDef: ClassDeclaration, stream?: NodeJS.WritableStream) {
    super();
    this.children = classDef.getProperties();
    this.classDef = classDef;
    this.stream = stream;
  }

  children: PropertyDeclaration[] = [];
  classDef?: ClassDeclaration;
  stream?: NodeJS.WritableStream;

  translateBeginning() {
    // write start of contract
    this.stream?.write(this.printNewLine());
    this.stream?.write(
      `contract ${this.classDef?.getName()} {${this.printNewLine()}`
    );
  }

  translateChildren() {
    this.children.forEach((child) => {});
  }

  translateEnding() {
    // write end of contract
    this.stream?.write(`}${this.printNewLine()}`);
  }
}
