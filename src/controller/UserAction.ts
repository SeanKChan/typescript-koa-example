import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../entity/User";


export async function userSaveAction(context: Context) {
    const userRepository = getManager().getRepository(User);
    const userEntity = userRepository.create(context.request.body);
    await userRepository.save(userEntity);
    context.body = userEntity;
}

export async function userGetAction(context: Context) {
    const userRepository = getManager().getRepository(User);
    const userEntity = await userRepository.findOne((context as any).params.id);
    if (!userEntity) {
        context.status = 404;
        return;
    }
    context.body = userEntity;
}