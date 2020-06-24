"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const user_services_1 = require("../../users/services/user.services");
const argon2_pass_1 = require("argon2-pass");
class AuthMiddleware {
    static getInstance() {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }
    validateBodyRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.email && req.body.password) {
                next();
            }
            else {
                res.status(400).send({ error: 'Missing body fields: email, password' });
            }
        });
    }
    verifyUserPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = user_services_1.UsersService.getInstance();
            const user = yield userService.getByEmail(req.body.email);
            if (user) {
                let passwordHash = user.password;
                const sp = new argon2_pass_1.SecurePass();
                const passwordBuffer = Buffer.from(passwordHash, 'utf8');
                const requestPassword = Buffer.from(req.body.password, 'utf8');
                const result = yield sp.verifyHash(requestPassword, passwordBuffer);
                if (argon2_pass_1.SecurePass.isValid(result)) {
                    req.body = {
                        userId: user.id,
                        email: user.email,
                        provider: 'email',
                        permissionLevel: user.permissionLevel,
                    };
                    return next();
                }
                else {
                    res.status(400).send({ errors: `Invalid e-mail and/or password` });
                }
            }
            else {
                res.status(400).send({ errors: `Invalid e-mail and/or password` });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL2F1dGgvbWlkZGxld2FyZXMvYXV0aC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLHNFQUFnRTtBQUNoRSw2Q0FBdUM7QUFFdkMsTUFBYSxjQUFjO0lBR3ZCLE1BQU0sQ0FBQyxXQUFXO1FBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDMUIsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxtQkFBbUIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7O1lBQzdGLElBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQztnQkFDL0MsSUFBSSxFQUFFLENBQUM7YUFDVjtpQkFBSTtnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxzQ0FBc0MsRUFBQyxDQUFDLENBQUM7YUFDekU7UUFDTCxDQUFDO0tBQUE7SUFFSyxrQkFBa0IsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7O1lBQzVGLE1BQU0sV0FBVyxHQUFHLDRCQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDL0MsTUFBTSxJQUFJLEdBQVEsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0QsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakMsTUFBTSxFQUFFLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLHdCQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUM1QixHQUFHLENBQUMsSUFBSSxHQUFHO3dCQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTt3QkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7d0JBQ2pCLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7cUJBQ3hDLENBQUM7b0JBQ0YsT0FBTyxJQUFJLEVBQUUsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsZ0NBQWdDLEVBQUMsQ0FBQyxDQUFDO2lCQUNwRTthQUNKO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLGdDQUFnQyxFQUFDLENBQUMsQ0FBQzthQUNwRTtRQUNMLENBQUM7S0FBQTtDQUNKO0FBMUNELHdDQTBDQyJ9