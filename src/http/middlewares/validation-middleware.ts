import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import {RequestDto} from "../../dto/requests/create-project-request-dto";

export const validateRequest = <T extends RequestDto>(
    dtoType: { new (...args: any[]): T },
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(req.body)
    const requestDto = new dtoType(req);
    validate(requestDto).then((errors) => {
        if (errors.length) {
            return res.status(422).json({
                error: 'Validation failure',
                constraints: errors.map((error) => error.constraints),
            });
        }

        next();
    });
};