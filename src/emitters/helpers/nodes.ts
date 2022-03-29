import { ts } from "ts-morph";
import translateExpression from "./expressions";
import translateToken from "./tokens";

export default function translateNode(node: ts.Node): string {
  if (isExpression(node)) {
    return translateExpression(node);
  } else if (ts.isToken(node)) {
    return translateToken(node);
  } else {
    console.log(">>>>>>>>>>>>others");
    console.log(node.getText());
    console.log(node.kind);
  }

  return "";
}

const isExpression = (node: ts.Node) =>
  ts.isBinaryExpression(node) || ts.isPropertyAccessExpression(node);
