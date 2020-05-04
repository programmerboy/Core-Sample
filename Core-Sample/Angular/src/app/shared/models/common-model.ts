export class FileUploadConfig {
  constructor(
      public uploadedFiles: FileList = null,
      public numberOfFiles: number = 0,
      public selectedFileName: string = "No file chosen",
      public selectedFileSize: string = "",
  ) { }
}
