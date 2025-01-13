const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(422).json({ error: 'O nome é obrigatório!' });
    }

    if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
      return res.status(409).json({ error: `A categoria [${req.body.name}] já existe!` });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: req.body.name
      }
    });

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}