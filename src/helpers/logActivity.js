import db from '../models';

const logActivity = async ({ actor, description }) => {
  const activity = await db.Activity.create({
    userId: actor.id,
    description,
  });

  console.log({ activity });
};


export default logActivity;
