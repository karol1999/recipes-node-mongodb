const asyncHandler = (callback) => {         // funkcja globalna przyjmująca nasz routing i zwracająca inną funkcję, w której ten routing
    return function (req, res, next) {       // zostanie uruchomiony, ale teraz ew. błędy będą przekazane do parametru "next"
        callback(req, res, next).catch(next);// tak naprawdę to obsługuje wszystkie błędy w routingu
    }
}

module.exports = asyncHandler;
