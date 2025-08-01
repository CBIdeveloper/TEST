class HiCosResponse {
  constructor({
    cryptokiVersion,
    flags,
    func,
    last_error,
    libraryDescription,
    libraryVersion,
    manufacturerID,
    ret_code,
    slots,
    version,
    serverVersion,
    installedModule,
  }) {
    this.cryptokiVersion = cryptokiVersion;
    this.flags = flags;
    this.func = func;
    this.lastError = last_error;
    this.libraryDescription = libraryDescription;
    this.libraryVersion = libraryVersion;
    this.manufacturerID = manufacturerID;
    this.retCode = ret_code;
    this.slots = slots;
    this.version = version;
    this.serverVersion = serverVersion;
    this.installedModule = installedModule;

    this.slotDetected = this.slots.length > 0;
    this.slotDescriptionList = this.slots.map((item) => item.slotDescription);
  }
}

export default HiCosResponse;
