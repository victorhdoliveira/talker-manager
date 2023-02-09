const badRequest = 400;
const Unauthorized = 401;

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(Unauthorized).json({
          message: 'Token não encontrado',
        });
    } if (typeof authorization !== 'string' || authorization.length !== 16) {
      return res.status(Unauthorized).json({
        message: 'Token inválido',
      });
    } 
    return next();
};

const nameValidation = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(badRequest).json({
            message: 'O campo "name" é obrigatório',
        });
    } 
    if (name.length < 3) {
        return res.status(badRequest).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        }); 
    } 
    return next();
};

const ageValidation = async (req, res, next) => {
    const { age } = req.body;
    const notNumber = typeof age !== 'number';
    const integer = Number.isInteger(age);

    if (!age) {
        return res.status(badRequest).json({ message: 'O campo "age" é obrigatório' });
    } if (notNumber) {
        return res.status(badRequest).json({ message: 'O campo "age" deve ser do tipo "number"' }); 
    } if (!integer) {
        return res.status(badRequest).json({ message: 
            'O campo "age" deve ser um "number" do tipo inteiro' }); 
    } if (Number(age) < 18) {
        return res.status(badRequest).json({ message: 
            'A pessoa palestrante deve ser maior de idade' }); 
    }
    return next();
};

const talkValidation = async (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(badRequest).json({ message: 'O campo "talk" é obrigatório' });
    }
    return next();
};

const watchedAtValidation = async (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!watchedAt) {
        return res.status(badRequest).json({ message: 'O campo "watchedAt" é obrigatório' }); 
    } if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}
    return next();
};

const rateValidation = async (req, res, next) => {
    const { talk: { rate } } = req.body;
    const integerRate = Number.isInteger(rate);
    const numberRate = Number(rate);
 
    if (rate === undefined) {
        return res.status(badRequest).json({ message: 'O campo "rate" é obrigatório' }); 
    } if (!integerRate || numberRate <= 0 || numberRate > 5) {
        return res.status(badRequest).json({ 
            message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
    } 
    return next();
};

module.exports = {
    tokenValidation,
    nameValidation,
    ageValidation,
    talkValidation,
    watchedAtValidation,
    rateValidation,
};
