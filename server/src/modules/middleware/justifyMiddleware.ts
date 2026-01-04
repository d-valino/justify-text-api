import express from 'express'


export const textPlainMiddleware = express.text({ type: 'text/plain' });
