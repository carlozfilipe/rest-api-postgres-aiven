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

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

exports.updateCategory = async (req, res) => {
  try {

    if (!await prisma.category.findUnique({ where: { id: parseInt(req.params.id) } })) {
      return res.status(404).json({ error: `A categoria [${req.params.id}] não foi encontrada!` });
    }

    if (!req.body.name) {
      return res.status(422).json({ error: 'O nome é obrigatório!' });
    }

    if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
      return res.status(409).json({ error: `A categoria [${req.body.name}] já existe!` });
    }

    const updatedCategory = await prisma.category.update({
      data: {
        name: req.body.name,
      },
      where: {
        id: parseInt(req.params.id),
      }
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 