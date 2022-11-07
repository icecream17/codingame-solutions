console.log(
    readline().split('').reduce(([accum, prev], curr) => {
        for (const binaryDigit of curr.codePointAt(0).toString(2).padStart(7, "0")) {
            if (binaryDigit !== prev) {
                if (accum) {
                    accum += " "
                }
                if (binaryDigit === "1") {
                    accum += "0 "
                } else {
                    accum += "00 "
                }
            }
            prev = binaryDigit
            accum += "0"
        }
        return [accum, prev]
    }, ['', ''])[0]
)
