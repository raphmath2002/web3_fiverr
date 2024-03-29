import { Request, Response } from "express";
import { createUser, findUser, findAndUpdateUser, getUsers, deleteUser } from "../service/user.service";
import {findAvatar, deleteAvatar, createAvatar } from "../service/avatar.service";
import log from "../logger";
import { AvatarDocument } from "../models/avatar.model";




export async function createUserHandler(req: Request, res: Response) {
  try {
    // Création de l'utilisateur
    let user = await createUser(req.body);

    // Création d'un avatar identicon, généré avec l'adresse de portefeuille unique de l'utilisateur
    const identicon = require('identicon')
    const buffer = identicon.generateSync({ id: user.polygon_address, size: 200 })

    
    let avatar = await createAvatar({
      avatar: buffer,
      user: user._id
    })

    avatar ? log.info(`New avatar created for user(${user._id})`) : log.error(`Error while creating avatar for user(${user._id})`)
    
    // Update de l'utilisateur avec l'_id de l'avatar
    user = await findAndUpdateUser({ _id: user._id }, { avatar: avatar._id }, { new: true }) as any;
    
    if (user) {
      return res.send(user.toJSON());
    }
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  const { params } = req;

  if (!params.user_id) return res.sendStatus(400);
  
  const update = req.body;

  const user = await findUser({ _id: params.user_id});

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await findAndUpdateUser({ _id: params.user_id }, update, { new: true });

  return res.send(updatedUser);
}

export async function getUsersHandler(req: Request, res: Response) {

  const { params } = req;

  let payload = {};

  if (params.wallet_id) payload = {polygon_address: params.wallet_id}
  if (params.user_id) payload = {_id: params.user_id}

  try {
    const users = await getUsers(payload);

    if (users) {
      return res.send(users);
    }
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const { params } = req;

  if(!params.user_id)  return res.sendStatus(400);

  let user = await findUser({ _id: params.user_id });

  if (!user) {
    return res.sendStatus(404);
  }

  if (user.avatar)
  {
    let avatar = await findAvatar({ _id: user.avatar })
    
    if (avatar) {
      await deleteAvatar(avatar)
    }
  }

  await deleteUser({ _id: params.user_id });

  return res.sendStatus(200);
}
