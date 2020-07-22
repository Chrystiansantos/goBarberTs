import { Router, Response, Request } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req: Request, res: Response) => {
  return res.json({ msg: 'Fogo na bomba !' });
});

export default appointmentsRouter;
