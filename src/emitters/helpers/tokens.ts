import { ts } from "ts-morph";

export default function translateToken(token: ts.Node): string {
  switch (token.kind) {
    case ts.SyntaxKind.ReturnKeyword:
      return "return";
    case ts.SyntaxKind.SemicolonToken:
      return ";";
  }

  return "";
}
