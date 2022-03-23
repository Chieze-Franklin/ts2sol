import { cli } from "./cli";

export function index(): Promise<any> {
  return cli();
}

index();
