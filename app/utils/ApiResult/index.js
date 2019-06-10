class ApiResult {
  constructor(data = {}, status = 200) {
    this.success = true;
    this.data = data;
    this.status = status;
  }
}

module.exports = ApiResult;
