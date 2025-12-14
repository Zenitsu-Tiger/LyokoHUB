import { Context } from "koa"; // 导入 Context 类型
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../config/secret";
// 该文件用于在登录验证均通过时，颁发令牌
class LoginController {
  // 签发令牌,传入token
  sign(ctx: Context) {
    try {
      const { id, name } = ctx.user;
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: "RS256"
      });

      const response = { code: 200, data: { id, name, token } };
      console.log('=== 登录响应 ===', response); // 添加这行

      ctx.body = response;
    } catch (err) {
      console.log(err);
    }
  }
  test(ctx: Context) {
    ctx.body = "验证身份通过！";
  }
}
const loginController = new LoginController();
export { loginController };
