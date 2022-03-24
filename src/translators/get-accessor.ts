import fs from "fs-extra";
import {
  GetAccessorDeclaration,
  Node,
  PropertyDeclaration,
  ts,
} from "ts-morph";
import PropertyTranslator from "./property";
import { ContainerTranslator } from "./transpiler";

export default class GetAccessorTranslator extends ContainerTranslator {
  constructor(
    getAcsrDec: GetAccessorDeclaration,
    stream?: NodeJS.WritableStream
  ) {
    super();
    this.children = getAcsrDec.getBody()?.getChildren() || [];
    this.getAcsrDec = getAcsrDec;
    this.stream = stream;
  }

  children: Node<ts.Node>[];
  getAcsrDec?: GetAccessorDeclaration;
  stream?: NodeJS.WritableStream;

  translateBeginning() {
    this.stream?.write(this.printNewLine());
    // indent
    this.printIndentation();
    // write start of contract
    this.stream?.write(
      `function get() public view returns (uint) {${this.printNewLine()}`
    );
  }

  translateChildren() {
    this.children.forEach((child) => {
      if (Node.isPropertyDeclaration(child)) {
        //
      }
    });
  }

  translateEnding() {
    // indent
    this.printIndentation();
    // write end of contract
    this.stream?.write(`}${this.printNewLine()}`);
  }
}
