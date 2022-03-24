export interface IEmitter {
  emit(): void;
  format?: boolean;
  stream?: NodeJS.WritableStream;
}

export interface IBlockEmitter extends IEmitter {
  children: any[];
  emitBeginning(): void;
  emitChildren(): void;
  emitEnding(): void;
}

export interface IInlineEmitter extends IEmitter {}

export abstract class BlockEmitter implements IBlockEmitter {
  emit(): void {
    this.emitBeginning();
    this.emitChildren();
    this.emitEnding();
  }

  abstract children: any[];
  format?: boolean = false;
  indentation: number = 0;
  abstract stream?: NodeJS.WritableStream;
  target?: string = ">=0.4.16 <0.9.0";

  abstract emitBeginning(): void;
  abstract emitChildren(): void;
  abstract emitEnding(): void;

  protected emitChildIndentation = () => {
    if (this.format) {
      new Array(this.indentation + 2)
        .fill(1)
        .forEach(() => this.stream?.write(" "));
    }
  };
  protected emitIndentation = () => {
    if (this.format) {
      new Array(this.indentation)
        .fill(1)
        .forEach(() => this.stream?.write(" "));
    }
  };
  protected emitNewLine = () => (this.format ? "\n" : "");
}
