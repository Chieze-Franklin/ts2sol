import { StandardizedFilePath } from "@ts-morph/common";
import fs from "fs-extra";
import path from "path";
import { Project } from "ts-morph";
import FileTranslator from "../translators/file";

export type TranspilerOptions = {
  format?: boolean;
  sourceFiles?: string[];
  tsConfigFilePath?: string;
  target?: string;
};

export async function transpile(options: TranspilerOptions): Promise<any> {
  const project = new Project();

  if (options.sourceFiles)
    options.sourceFiles.forEach((sourceFile) =>
      project.addSourceFileAtPathIfExists(sourceFile)
    );
  if (options.tsConfigFilePath)
    project.addSourceFilesFromTsConfig(options.tsConfigFilePath);
  project.resolveSourceFileDependencies();

  project.getSourceFiles().forEach(async (file) => {
    let targetDirectoryPath: StandardizedFilePath | string =
      file.getDirectoryPath();
    if (options.tsConfigFilePath) {
      const tsConfigFile = JSON.parse(
        fs.readFileSync(options.tsConfigFilePath, {
          encoding: "utf8",
          flag: "r",
        })
      );
      if (tsConfigFile.compilerOptions?.outDir) {
        targetDirectoryPath = path.resolve(
          path.join(
            path.dirname(options.tsConfigFilePath),
            tsConfigFile.compilerOptions?.outDir
          )
        );
      }
    }
    const targetFilePath = path.resolve(
      path.join(
        targetDirectoryPath,
        `${file.getBaseNameWithoutExtension()}.sol`
      )
    );
    console.log(targetFilePath);
    if (!fs.existsSync(targetDirectoryPath)) {
      fs.mkdirSync(targetDirectoryPath);
    }
    await fs.createFile(targetFilePath);
    const fileTranslator = new FileTranslator(file, targetFilePath);
    if (options.format) fileTranslator.format = options.format;
    if (options.target) fileTranslator.target = options.target;
    fileTranslator.translate();
  });
}
