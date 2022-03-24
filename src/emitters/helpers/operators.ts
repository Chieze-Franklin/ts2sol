import { PostfixUnaryOperator } from "@ts-morph/common/lib/typescript";
import { ts } from "ts-morph";

export default function translateOperator(operator: PostfixUnaryOperator) {
  let translation = "";

  switch (operator) {
    case ts.SyntaxKind.PlusPlusToken:
      translation = "++";
      break;
    default:
  }

  return translation;
}
