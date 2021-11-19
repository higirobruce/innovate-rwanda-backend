import db from '../models';
import GenerateMeta from '../helpers/GenerateMeta';

export default class Talents {
  static async getTalents(req, res) {
    try {
      const response = await db['Individual'].findAll({
        order: [
          ['lastName', 'ASC'],
          ['firstName', 'ASC'],
        ],
      });
      return res.status(200).json({ result: response });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ message: 'No individual accounts found at this moment' });
    }
  }

  static async getTalentsActive(req, res) {
    const where = { status: 'active' };
    const { page } = req.query;
    const limit = 20;
    const count = await db['Individual'].count({ where });
    const offset = page === 1 ? 0 : (parseInt(page, 10) - 1) * limit;
    console.log('page', count, offset, limit);
    try {
      const response = await db['Individual'].findAll({
        where,
        order: [
          ['lastName', 'ASC'],
          ['firstName', 'ASC'],
        ],
        limit,
        offset,
      });
      console.log('response', response);
      return res.status(200).json({
        meta: GenerateMeta(count, limit, parseInt(page, 10)),
        result: response,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ message: 'No individual accounts found at this moment' });
    }
  }
  static async getIndividualById(req, res) {
    const { user_id } = req.params;
    const where = { user_id };
    try {
      const response = await db['Individual'].findOne({ where })
      return res.status(200).json({
        result: response,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ message: 'No individual accounts found at this moment' });
    }
  }

  static async editInfo(req, res) {
    try {
      const profile = await db['Individual'].update(req.body, {
        where: { user_id: req.user.id },
      });
      return profile
        ? res.status(200).json({ result: 'Edited Successfully' })
        : res.status(404).json({ error: 'Sorry, No record edited' });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Sorry, Edit failed' });
    }
  }

  static async findTalents(req, res) {
    try {
      const likeOp = db.Op.iLike;
      const searchValue = req.query.searchValue.trim();

      const directory = await db['Individual'].findAll({
        where: {
          [db.Op.or]: [
            { firstName: { [likeOp]: '%' + searchValue + '%' } },
            { lastName: { [likeOp]: '%' + searchValue + '%' } },
            { shortDescription: { [likeOp]: '%' + searchValue + '%' } },
            { location: { [likeOp]: '%' + searchValue + '%' } },
            { contactEmail: { [likeOp]: '%' + searchValue + '%' } },
            { contactPhone: { [likeOp]: '%' + searchValue + '%' } },
            { portfolio: { [likeOp]: '%' + searchValue + '%' } },
            { linkedin: { [likeOp]: '%' + searchValue + '%' } },
          ],
          status: 'active',
        },
        limit: 100,
        order: [['lastName', 'ASC']],
      });

      if (directory && directory.length > 0) {
        return res.status(200).json({ result: directory });
      } else {
        return res.status(404).json({ result: [], error: 'No result found' });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ message: ' Individual accounts not got at this moment' });
    }
  }

  static async deactivateAccount(req, res) {
    try {
      const profile = await db['Individual'].update(
        { status: 'inactive' },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      return profile
        ? res.status(200).json({ result: 'Entry deactivated' })
        : res.status(404).json({ error: 'Sorry, No record deactivated' });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Sorry, Edit failed' });
    }
  }

  static async reactivateAccount(req, res) {
    try {
      const profile = await db['Individual'].update(
        { status: 'active' },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      return profile
        ? res.status(200).json({ result: 'Entry activated' })
        : res.status(404).json({ error: 'Sorry, No record activated' });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: 'Sorry, Edit failed' });
    }
  }
}
