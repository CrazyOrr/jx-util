export default class Service {
  constructor () {
    // this.powerOn
    this.runnable = false
  }

  /**
   * @desc 获取服务
   */
  get () {
    return this
  }

  /**
   * @desc 服务是否安装
   */
  installed () {
    return false
  }

  /**
   * 服务热启动
   */
  powerOn () {
    this.runnable = true
  }

  /**
   * 服务热关闭
   */
  powerOff () {
    this.runnable = false
  }
}