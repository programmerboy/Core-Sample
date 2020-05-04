export class NavigationModel {
  constructor(
    public link: string = "",
    public label: string = "",
    public isForAuthenticated: boolean = true,
    public isForAdmin: boolean = false
  ) { }
}
