const httpStatus = require('http-status');
const db = require('../model');
const ApiError = require('../utils/ApiError');
const Provider = db.Provider;

const createProvider = async (req) => {
    try {
        const { description, feeCost, location, specialization, name, address, contactInfo } = req.body;
        const creatorInfo = req.user.id;

        if (!description || !feeCost || !location || !specialization) {
            throw new ApiError(httpStatus.BAD_REQUEST, "All provider details are required.");
        }

        const newProvider = await Provider.create({
            description,
            name,
            address,
            feeCost,
            location,
            contactInfo,
            specialization,
            userId: creatorInfo
        });

        return newProvider;
    } catch (err) {
        console.error("Error creating provider:", err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

const editProvider = async (req) => {
    try {
        const providerId = req.params.providerId;
        const { body } = req;

        const provider = await Provider.findOne({ where: { id: providerId } });

        if (!provider) {
            throw new ApiError(httpStatus.NOT_FOUND, "Provider not found.");
        }

        await Provider.update(body, { where: { id: providerId } });

        return { message: "Provider updated successfully" };
    } catch (err) {
        console.error("Error updating provider:", err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

const deleteProvider = async (req) => {
    try {
        const providerId = req.params.providerId;

        const provider = await Provider.findOne({ where: { id: providerId } });
        if (!provider) {
            throw new ApiError(httpStatus.NOT_FOUND, "Provider not found.");
        }

        await Provider.destroy({ where: { id: providerId } });

        return { message: "Provider deleted successfully" };
    } catch (err) {
        console.error("Error deleting provider:", err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

const findHealthService = async (req) => {
    try {
        const { providerId} = req.params;

        if (!providerId) {
            const allServices = await Provider.findAll();
            return allServices;
        }

        const specificService = await Provider.findOne({ where: { id: providerId } });
        if (!specificService) {
            throw new ApiError(httpStatus.NOT_FOUND, "Health service not found.");
        }

        return specificService;
    } catch (err) {
        console.error("Error finding health service:", err);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};

module.exports = {
    createProvider,
    editProvider,
    deleteProvider,
    findHealthService
};
