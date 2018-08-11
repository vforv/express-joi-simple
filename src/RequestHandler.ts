export function RequestHandler(err: any, req: any, res: any, next: any) {
    if (err.isBoom) {
        if (!err.data || err.data.length === 0 || !err.data[0].message) {
            return res.status(err.output.statusCode).json(err.output.payload);
        }

        const payload = {
            ...err.output.payload,
            message: err.data[0].message
        }

        return res.status(err.output.statusCode).json(payload);
    }
}
