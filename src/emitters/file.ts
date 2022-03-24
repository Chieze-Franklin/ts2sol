import fs from "fs-extra";
import { ClassDeclaration, SourceFile } from "ts-morph";
import ClassEmitter from "./class";
import { BlockEmitter } from "./emitter";

export default class FileEmitter extends BlockEmitter {
  constructor(sourcefile: SourceFile, targetFilePath: string) {
    super();
    this.children = sourcefile.getClasses();
    this.sourcefile = sourcefile;
    this.stream = fs.createWriteStream(targetFilePath);
  }

  children: ClassDeclaration[] = [];
  sourcefile?: SourceFile;
  stream?: NodeJS.WritableStream;

  emitBeginning() {
    // write license
    this.stream?.write(`// SPDX-License-Identifier: GPL-3.0\n`);
    // write version
    this.stream?.write(`pragma solidity ${this.target};${this.emitNewLine()}`);
  }

  emitChildren() {
    this.children.forEach((child) => {
      const classEmitter = new ClassEmitter(child, this.stream);
      classEmitter.format = this.format;
      classEmitter.emit();
    });
  }

  emitEnding() {}
}
