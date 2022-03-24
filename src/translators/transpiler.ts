export interface ITranslator {
  translate(): void;
  format?: boolean;
  stream?: NodeJS.WritableStream;
}

export interface IContainerTranslator extends ITranslator {
  children: any[];
  translateBeginning(): void;
  translateChildren(): void;
  translateEnding(): void;
}

export interface IContentTranslator extends ITranslator {}

export abstract class ContainerTranslator implements IContainerTranslator {
  translate(): void {
    this.translateBeginning();
    this.translateChildren();
    this.translateEnding();
  }

  abstract children: any[];
  format?: boolean = false;
  indentation: number = 0;
  abstract stream?: NodeJS.WritableStream;
  target?: string = ">=0.4.16 <0.9.0";

  abstract translateBeginning(): void;
  abstract translateChildren(): void;
  abstract translateEnding(): void;

  protected printChildIndentation = () => {
    if (this.format) {
      new Array(this.indentation + 2)
        .fill(1)
        .forEach(() => this.stream?.write(" "));
    }
  };
  protected printIndentation = () => {
    if (this.format) {
      new Array(this.indentation)
        .fill(1)
        .forEach(() => this.stream?.write(" "));
    }
  };
  protected printNewLine = () => (this.format ? "\n" : "");
}
