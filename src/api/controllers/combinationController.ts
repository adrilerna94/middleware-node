import { Request, Response } from 'express';

export const getCombination = (req: Request, res: Response) => {
    const multiplier = Number(req.body.multiplier);

    if (isNaN(multiplier)) {
        return res.status(400).json({ message: 'Invalid multiplier, it must be a number.' });
    }

    const combination = [2, 4, 8, 9, 7, 3, 5, 6];
    const multipliedCombination = combination.map(num => num * multiplier);

    res.status(200).json({ combination: multipliedCombination });
};
