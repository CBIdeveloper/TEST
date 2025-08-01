class SignRequest {
  constructor({ slot, pin, tbs }) {
    this.request = `
    tbsPackage = {
      "tbs": "${tbs}",
      "hashAlgorithm": "SHA256",
      "pin": "${pin}",
      "func": "MakeSignature",
      "signatureType": "PKCS1",
      "slotDescription": "${slot}"
    }
    `;
  }
}

export default SignRequest;
