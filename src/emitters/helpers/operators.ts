import {
  BinaryOperator,
  PostfixUnaryOperator,
} from "@ts-morph/common/lib/typescript";
import { ts } from "ts-morph";

export type Operator = BinaryOperator | PostfixUnaryOperator;

export default function translateOperator(operator: Operator): string {
  // console.log(operator);

  switch (operator) {
    case ts.SyntaxKind.EqualsToken:
      return "=";
    case ts.SyntaxKind.PlusPlusToken:
      return "++";
  }

  return "";
}
