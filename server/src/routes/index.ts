import { Router } from "express";
import adminRoutes from "./admin.route.js";
import authRouter from "./auth.route.js";
import movieRoute from "./movie.route.js";
import priceRoute from "./price.route.js";
import seatRoute from "./seat.route.js";
import screenRoute from "./screen.route.js";
import seatTypeRoute from "./seatType.route.js";
import showRoute from "./show.route.js";
import theatreRoute from "./theatre.route.js";


const rootRouter: Router = Router()

rootRouter.use('/admin', adminRoutes);
rootRouter.use('/auth', authRouter);
rootRouter.use('/movie', movieRoute);
rootRouter.use('/price', priceRoute);
rootRouter.use('/seat', seatRoute);
rootRouter.use('/screen', screenRoute);
rootRouter.use('/seatType', seatTypeRoute);
rootRouter.use('/show', showRoute);
rootRouter.use('/theatre', theatreRoute);

export default rootRouter;