import fs from "fs-extra";
import { ClassDeclaration, SourceFile } from "ts-morph";
import ClassTranslator from "./class";
import { ContainerTranslator } from "./transpiler";

export default class FileTranslator extends ContainerTranslator {
  constructor(sourcefile: SourceFile, targetFilePath: string) {
    super();
    this.children = sourcefile.getClasses();
    this.sourcefile = sourcefile;
    this.stream = fs.createWriteStream(targetFilePath);
  }

  children: ClassDeclaration[] = [];
  sourcefile?: SourceFile;
  stream?: NodeJS.WritableStream;

  translateBeginning() {
    // write license
    this.stream?.write(`// SPDX-License-Identifier: GPL-3.0\n`);
    // write version
    this.stream?.write(`pragma solidity ${this.target};${this.printNewLine()}`);
  }

  translateChildren() {
    this.children.forEach((child) => {
      const classTranslator = new ClassTranslator(child, this.stream);
      classTranslator.format = this.format;
      classTranslator.translate();
    });
  }

  translateEnding() {}
}
