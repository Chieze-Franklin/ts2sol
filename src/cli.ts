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
    .usage("Usage: --project <glob pattern>").argv;

  console.log(argv);

  return await transpile({
      sourceFiles: argv._? argv._.map((item) => item.toString()) : undefined,
      tsConfigFilePath: argv.project,
  });

  //   const providerAnswer: Answer = await providerQuestion();

  //   if (providerAnswer.provider === ProviderValue.GITHUB) {
  //     return await githubActions();
  //   } else if (providerAnswer.provider === ProviderValue.GITLAB) {
  //     return await gitlabActions();
  //   } else if (providerAnswer.provider === ProviderValue.BITBUCKET) {
  //     return await bitbucketActions();
  //   } else if (providerAnswer.provider === ProviderValue.CODECOMMIT) {
  //     return await codecommitActions();
  //   }
}
