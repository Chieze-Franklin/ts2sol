import { ts, Type, ClassMemberTypes } from "ts-morph";

export default function translateType(
  type?: Type<ts.Type>,
  owner?: ClassMemberTypes
) {
  if (!type) return "<unknown>";

  // console.log(type.getText())

  if (type.isNumber()) return "uint";

  return type.getText();
}
