import {
  BinaryExpression,
  PostfixUnaryExpression,
  PropertyAccessExpression,
} from "@ts-morph/common/lib/typescript";
import { ts } from "ts-morph";
import translateOperator from "./operators";

export default function translateExpression(node: ts.Node): string {
  // console.log(node);

  switch (node.kind) {
    case ts.SyntaxKind.BinaryExpression:
      const left = (node as BinaryExpression).left;
      const right = (node as BinaryExpression).right;
      const operatorToken = (node as BinaryExpression).operatorToken;
      return `${translateExpression(left)} ${translateOperator(
        operatorToken.kind
      )} ${translateExpression(right)}`;
    case ts.SyntaxKind.Identifier:
      return node.getText();
    case ts.SyntaxKind.PostfixUnaryExpression: // TODO: not tested
      const operand = (node as PostfixUnaryExpression).operand;
      const operator = (node as PostfixUnaryExpression).operator;
      return `${translateExpression(operand)}${translateOperator(operator)}`;
    case ts.SyntaxKind.PropertyAccessExpression:
      return (node as PropertyAccessExpression).name.escapedText.toString();
  }

  return "";
}
