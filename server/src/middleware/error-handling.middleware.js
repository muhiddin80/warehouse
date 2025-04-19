function duplicateFieldError(err){
    if(err?.code === 11000){
        err.status = 409;
        err.isException = true;
        err.message = `Ushbu "${Object.values(err.keyValue).join(
            ", "
        )}" qiymatalri allaqachon ishlatilgan`
    }

    return err;
}

export const ErrorHandlerMiddleware = (err,_,res,__)=>{
    err = duplicateFieldError(err);

    if(err.isException){
        return res.status(err.status).send({
            message: err.message,
        })
    }

    res.status(500).send({
        message: err.message,
    })
};