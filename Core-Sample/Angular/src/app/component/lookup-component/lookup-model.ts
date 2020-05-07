export class LookupModel {

  constructor(public country = '',
    public carrierName = '',
    public brand = '',
    public phoneModel = '',
    public subModel = ''
  ) { }
}

export class LookupModelError {
  constructor(public country = '',
    public carrierName = '',
    public brand = '',
    public phoneModel = '',
    public subModel = ''
  ) { }
}

export class NetworkModel {
  public Two_G: string;
  public Three_G: string;
  public Four_G: string;
  public Five_G: string;
}

export class Compatablity extends NetworkModel {

  public TwoGMatchedFreq: number;
  public ThreeGMatchedFreq: number;
  public FourGMatchedFreq: number;
  public FiveGMatchedFreq: number;

  public TwoGFullCompatible: boolean;
  public ThreeGFullCompatible: boolean;
  public FourGFullCompatible: number;
  public FiveGFullCompatible: number;

  public CarrierFrequencies: NetworkModel;
  public DeviceFrequencies: NetworkModel;

}
