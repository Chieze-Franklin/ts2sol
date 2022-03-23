import { Project } from "ts-morph";

export type TranspilerOptions = {
    sourceFiles?: string[],
    tsConfigFilePath?: string,
};

export async function transpile(options: TranspilerOptions): Promise<any> {
  const project = new Project();

  if (options.sourceFiles) options.sourceFiles.forEach((sourceFile) => project.addSourceFileAtPathIfExists(sourceFile));
  if (options.tsConfigFilePath) project.addSourceFilesFromTsConfig(options.tsConfigFilePath);
  project.resolveSourceFileDependencies();

  project.getSourceFiles().forEach((file) => {
      console.log(file.getBaseName())
      file.getClasses().forEach((child) => console.log(child.getName()))
  })
}
