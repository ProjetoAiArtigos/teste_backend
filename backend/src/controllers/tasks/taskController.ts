import { Response, NextFunction } from "express";
import { IRequest } from "../../types";
import { Task } from "../../entities/Task";
import { User } from "../../entities/User";
import { finished } from "stream";

export const create = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findOneBy({ id: req.sub, isActived: true });
        
        if (!user) {
            res.status(404).send({ message: "User not found." });
            return
        }

        const { name, description, priority, overdueAt } = req?.body;
        if (!name || !overdueAt){
            res.status(400).send({ message: "Bad request!" });
            return
        }

        const task = Task.create({
            name, 
            description, 
            priority, 
            overdueAt,
            createdBy: user,
            isFinished: false,
            isActived: true,
        })
        await task.save();

        const response = { user: user.name, ...task }
        res.status(201).send(response);
        return
    } catch (error) {
        next(error);
    }
};

export const update = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findOneBy({ id: req.sub, isActived: true });

        if (!user) {
            res.status(404).send({ message: "User not found." });
            return
        }

        const { id } = req?.params;
        const { name, description, priority, overdueAt, isFinished } = req?.body;
        if (!id || !name || !overdueAt) {
            res.status(400).send({ message: "Bad request!" });
            return
        }

        const task = await Task.findOneBy({ id })
        
        if (!task) {
            res.status(404).send({ message: "Not found" })
            return
        }
        task.name = name
        task.description = description
        task.priority = priority
        task.overdueAt = overdueAt
        if (isFinished){
            task.finishedBy = user
            task.finishedDate = new Date()
        }
        task.isFinished = true
        
        await task.save()

        const response = { user: task.createdBy.name, ...task }
        
        res.status(200).send(response);
        return
    } catch (error) {
        next(error);
    }
};

export const list = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const tasks = await Task.findBy({ isActived: true });

        if (!tasks) {
            res.status(404).send({ message: "Not found" })
            return
        }

        res.status(200).send(tasks);
        return
    } catch (error) {
        next(error);
    }
};

export const find = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req?.params;

        const task = await Task.findOneBy({ id });
        if (!task) {
            res.status(404).send({ message: "Not found" })
            return
        }

        res.status(200).send(task);
        return
    } catch (error) {
        next(error);
    }
};

export const del = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req?.params;

        const task = await Task.update({ id }, {
            isActived: false,
            deletedAt: Date.now()
        })

        if (!task) {
            res.status(404).send({ message: "Not found" })
            return
        }

        res.status(200).send(task);
        return
    } catch (error) {
        next(error);
    }
};