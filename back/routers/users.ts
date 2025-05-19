import { error } from 'console';
import express from 'express';
import { Error } from 'mongoose';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const user = new User(newUser);
    user.generateToken();
    await user.save();

    res.status(200).send({
      message: 'Registered new user',
      user,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        error: 'Username and password must be in request',
      });
    }
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).send({ error: 'Username not Found' });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: 'Password is incorrect' });
      return;
    }

    user.generateToken();

    res.cookie('token', user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    await user.save();

    const safeUser = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };

    res.status(200).send({
      message: 'User Successuly created',
      user: safeUser,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

export default usersRouter;
