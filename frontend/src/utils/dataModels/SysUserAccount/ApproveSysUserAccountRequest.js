class ApproveSysUserAccountRequest {
  constructor({ userAccountAppliedStatus, reasonOfFailure }) {
    this.user_account_applied_status = userAccountAppliedStatus;
    this.reason_of_failure = reasonOfFailure;
  }
}

export default ApproveSysUserAccountRequest;
