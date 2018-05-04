import Ajv from 'ajv';
import setupAsync from 'ajv-async';
import { TYPE_WEB, TYPE_MOBILE } from './connection.const';

const UUID_REGEX = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';

const CONNECTION_SCHEMA = {
    $async: true,
    type: 'object',
    title: 'Connection',
    description: 'Per device connection',
    properties: {
        id: { type: 'string', pattern: UUID_REGEX },
        _user: { type: 'string', pattern: UUID_REGEX },
        _spark: { type: 'string', pattern: UUID_REGEX },
        type: { type: 'string', enum: [TYPE_WEB, TYPE_MOBILE] },
        updatedAt: { format: 'date-time' },
        createdAt: { format: 'date-time' }
    },
    required: ['updatedAt'],
    additionalProperties: false
};

const ajvWithDefaults = setupAsync(new Ajv({
    coerceTypes: true,
    removeAdditional: true,
    allErrors: true,
    useDefaults: true
}));

const validateWithDefaults = ajvWithDefaults.compile(CONNECTION_SCHEMA);

const ajv = setupAsync(new Ajv({
    coerceTypes: true,
    removeAdditional: true,
    allErrors: true
}));

const validate = ajv.compile(CONNECTION_SCHEMA);

module.exports = {
    validateWithDefaults,
    validate
};
