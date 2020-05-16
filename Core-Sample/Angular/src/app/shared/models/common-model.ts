export class FileUploadConfig {
  constructor(
    public uploadedFiles: FileList = null,
    public numberOfFiles: number = 0,
    public selectedFileName: string = 'No file chosen',
    public selectedFileSize: string = '',
  ) { }
}


export class NetworkModel {

  constructor(public two_G: string = '',
    public three_G: string = '',
    public four_G: string = '',
    public five_G: string = '') { }
}
