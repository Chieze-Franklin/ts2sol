export interface ITranslator {
  translate(): void;
  format?: boolean;
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
  target?: string = ">=0.4.16 <0.9.0";

  abstract translateBeginning(): void;
  abstract translateChildren(): void;
  abstract translateEnding(): void;

  protected printNewLine = () => (this.format ? "\n" : "");
}
