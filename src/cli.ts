import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { transpile } from "./actions";
import { showTitleAndBanner } from "./utils/logger";

export async function cli(): Promise<any> {
  showTitleAndBanner();

  const argv = await yargs(hideBin(process.argv))
    .command("[files]", "Specify glob pattern of files to transpile")
    .option("project", {
      alias: "p",
      type: "string",
      description: "glob pattern of the ts config file",
    })
    .usage("Usage: --project <glob pattern>")
    .option("format", {
      alias: "f",
      type: "boolean",
      description: "determines if output files should be formatted",
    })
    .usage("Usage: --format (true|false)")
    .option("target", {
      alias: "t",
      type: "string",
      description: "the solidity version to target",
    })
    .usage("Usage: --format (true|false)").argv;

  console.log(argv);

  return await transpile({
    format: argv.format,
    sourceFiles: argv._ ? argv._.map((item) => item.toString()) : undefined,
    tsConfigFilePath: argv.project,
    target: argv.target,
  });
}
