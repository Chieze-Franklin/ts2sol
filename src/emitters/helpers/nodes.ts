import {
  LeftHandSideExpression,
  PostfixUnaryExpression,
  PropertyAccessExpression,
} from "@ts-morph/common/lib/typescript";
import { ts } from "ts-morph";
import translateOperator from "./operators";

export default function translateNode(node?: ts.Node) {
  let translation = "";

  switch (node?.kind) {
    case ts.SyntaxKind.PostfixUnaryExpression:
      console.log(node);
      const operand = (node as PostfixUnaryExpression).operand;
      const operator = (node as PostfixUnaryExpression).operator;
      translation = `${operand.getText()}${translateOperator(operator)}`;
      break;
    case ts.SyntaxKind.PropertyAccessExpression:
      translation = (
        node as PropertyAccessExpression
      ).name.escapedText.toString();
      break;
    case ts.SyntaxKind.PlusPlusToken:
      translation = "++";
      break;
    case ts.SyntaxKind.ReturnKeyword:
      translation = "return";
      break;
    case ts.SyntaxKind.SemicolonToken:
      translation = ";";
      break;
    default:
  }

  return translation;
}
