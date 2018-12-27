import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";


export async function userSaveAction(context: Context) {
  const userRepository = getManager().getRepository(User);
  const profileRepository = getManager().getRepository(Profile);

  const profileEntity = await profileRepository.findOne(1);

  // const userEntity = userRepository.create(context.request.body);
  const userEntity = userRepository.create();
  const { name, phone, age } = context.request.body;
  userRepository.merge(userEntity, {
    name,
    phone,
    age,
    profile: profileEntity
  });
  await userRepository.save(userEntity);
  context.body = userEntity;
}

export async function userGetAction(context: Context) {
  const userRepository = getManager().getRepository(User);
  const userId = context.params.id;
  const userEntity = await userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.profile', 'profile')
    .leftJoinAndSelect('user.photos', 'photo')
    .where('user.id = :userId', { userId })
    .getOne();
  if (!userEntity) {
    context.status = 404;
    return;
  }
  context.body = userEntity;
}

export async function userUpdateAction(context: Context) {
  const userRepository = getManager().getRepository(User);
  const userEntity = await userRepository.findOne(context.params.id);
  if (!userEntity) {
    context.status = 404;
    return;
  }
  userRepository.merge(userEntity, context.request.body);
  await userRepository.save(userEntity);
  context.body = userEntity;
}

export async function userDeleteAction(context: Context) {
  const userRepository = getManager().getRepository(User);
  const id = context.params.id;
  const result = await userRepository.delete(id)
  context.body = result;
}