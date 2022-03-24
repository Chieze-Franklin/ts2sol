import { GetAccessorDeclaration, Node, ts } from "ts-morph";
import { BlockEmitter } from "./emitter";
import translateNode from "./helpers/nodes";
import translateType from "./helpers/types";

export default class GetAccessorEmitter extends BlockEmitter {
  constructor(
    getAcsrDec: GetAccessorDeclaration,
    stream?: NodeJS.WritableStream
  ) {
    super();
    this.children = getAcsrDec.getStatements();
    this.getAcsrDec = getAcsrDec;
    this.stream = stream;
  }

  children: Node<ts.Node>[];
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

  emitChildren() {
    this.children.forEach((child) => {
      child.compilerNode.getChildren().forEach((c) => console.log(c.kind))
      const translation = child.compilerNode.getChildren().map((c) => translateNode(c)).join(" ");
      console.log(translation)
      
      // indent
      this.emitChildIndentation();
      this.stream?.write(translation);
      this.stream?.write(this.emitNewLine());
    });
  }

  emitEnding() {
    // indent
    this.emitIndentation();
    // write end of contract
    this.stream?.write(`}${this.emitNewLine()}`);
  }
}
