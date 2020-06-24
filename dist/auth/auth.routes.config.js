"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const jwt_middleware_1 = require("./middlewares/jwt.middleware");
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoute');
        this.configureRoutes();
    }
    configureRoutes() {
        const usersController = new auth_controller_1.AuthController();
        const authMiddleware = auth_middleware_1.AuthMiddleware.getInstance();
        const jwtMiddleware = jwt_middleware_1.JwtMiddleware.getInstance();
        this.app.post(`/auth`, [
            authMiddleware.validateBodyRequest,
            authMiddleware.verifyUserPassword,
            usersController.createJWT
        ]);
        this.app.post(`/auth/refresh-token`, [
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            usersController.createJWT
        ]);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXBwL2F1dGgvYXV0aC5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFxRjtBQUNyRixtRUFBK0Q7QUFDL0QsbUVBQStEO0FBQy9ELGlFQUE2RDtBQUc3RCxNQUFhLFVBQVcsU0FBUSx5Q0FBa0I7SUFDOUMsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZTtRQUNYLE1BQU0sZUFBZSxHQUFHLElBQUksZ0NBQWMsRUFBRSxDQUFDO1FBQzdDLE1BQU0sY0FBYyxHQUFHLGdDQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsTUFBTSxhQUFhLEdBQUcsOEJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIsY0FBYyxDQUFDLG1CQUFtQjtZQUNsQyxjQUFjLENBQUMsa0JBQWtCO1lBQ2pDLGVBQWUsQ0FBQyxTQUFTO1NBQzVCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ2pDLGFBQWEsQ0FBQyxjQUFjO1lBQzVCLGFBQWEsQ0FBQyxzQkFBc0I7WUFDcEMsYUFBYSxDQUFDLGtCQUFrQjtZQUNoQyxlQUFlLENBQUMsU0FBUztTQUM1QixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF4QkQsZ0NBd0JDIn0=