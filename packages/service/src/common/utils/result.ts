import { ResultEnum } from '../enum';

/**
 * 响应结构
 * ok 成功
 * fail 失败
 */
export class ResultData {
  constructor(code = ResultEnum.SUCCESS, msg?: string, data?: any) {
    this.code = code;
    this.msg = msg || 'ok';
    this.data = data || null;
  }

  // @ApiProperty({ type: 'number', default: ResultEnum.SUCCESS })
  code: number;

  // @ApiProperty({ type: 'string', default: 'ok' })
  msg?: string;

  data?: any;

  static ok(data?: any, msg?: string): ResultData {
    return new ResultData(ResultEnum.SUCCESS, msg, data);
  }

  static fail(code: number, msg?: string, data?: any): ResultData {
    return new ResultData(code || ResultEnum.FAIL, msg || 'fail', data);
  }
}
