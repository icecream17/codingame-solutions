const N = parseInt(readline());
let cgx = ""
for (let i = 0; i < N; i++) {
    cgx += readline();
}

// Defaults to numbers
const enum Token {
    STRING_START,
    STRING_END,
    BLOCK_START,
    BLOCK_END,
    SEPARATOR,
    EQUALS,
    FALSE,
    TRUE,
    NULL,
    NUMBER_MARKER,
}

class CgxTokens {
    static parse (str: string) {
        const cgxt = new CgxTokens();
        const chars = [...str]; // Actually the code points

        let in_string = false;
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i]

            // First handle strings
            if (char === "'") {
                cgxt.push(in_string ? Token.STRING_END : Token.STRING_START)
                in_string = !in_string
            } else if (in_string) {
                cgxt.push(char)
            } else {
                // This is not a string
                switch (char) {
                    case "(":
                        cgxt.push(Token.BLOCK_START)
                        break
                    case ")":
                        cgxt.push(Token.BLOCK_END)
                        break
                    case ";":
                        cgxt.push(Token.SEPARATOR)
                        break
                    case "=":
                        cgxt.push(Token.EQUALS)
                        break
                    case "f":
                        i += 4 // consume 4 more tokens: "alse"
                        cgxt.push(Token.FALSE)
                        break
                    case "t":
                        i += 3 // consume 3 more tokens: "rue"
                        cgxt.push(Token.TRUE)
                        break
                    case "n":
                        i += 3 // consume 3 more tokens: "ull"
                        cgxt.push(Token.NULL)
                        break
                    default:
                        let s = ""
                        while ("0123456789".includes(chars[i])) {
                            s += chars[i]
                            i++
                        }
                        if (s) {
                            cgxt.push(Token.NUMBER_MARKER)
                            cgxt.push(s)
                            i--
                        }
                }
            }
        }
        return cgxt
    }

    // A token is Not a string
    public tokens: (Token | string)[] = []

    push (...args) {
        this.tokens.push(...args)
    }

    toString () {
        console.error(this.tokens)
        let s = ""
        let indent = 0
        let after_equals = false
        for (const token of this.tokens) {
            switch (token) {
                case Token.STRING_START:
                    if (!after_equals) {
                        s += "\n"
                        s += " ".repeat(indent)
                    }
                    s += "'"
                    break
                case Token.STRING_END:
                    s += "'"
                    break
                case Token.BLOCK_START:
                    s += "\n"
                    s += " ".repeat(indent)
                    s += "("
                    indent += 4
                    break
                case Token.BLOCK_END:
                    indent -= 4
                    s += "\n"
                    s += " ".repeat(indent)
                    s += ")"
                    break
                case Token.SEPARATOR:
                    s += ";"
                    break
                case Token.EQUALS:
                    s += "="
                    break
                case Token.FALSE:
                    if (!after_equals) {
                        s += "\n"
                        s += " ".repeat(indent)
                    }
                    s += "false"
                    break
                case Token.TRUE:
                    if (!after_equals) {
                        s += "\n"
                        s += " ".repeat(indent)
                    }
                    s += "true"
                    break
                case Token.NULL:
                    if (!after_equals) {
                        s += "\n"
                        s += " ".repeat(indent)
                    }
                    s += "null"
                    break
                case Token.NUMBER_MARKER:
                    if (!after_equals) {
                        s += "\n"
                        s += " ".repeat(indent)
                    }
                    break
                default:
                    // This is a string's contents
                    s += token
            }
            after_equals = token === Token.EQUALS
        }
        if (s.startsWith("\n")) {
            s = s.slice(1)
        }
        return s
    }
}

console.log(CgxTokens.parse(cgx).toString())
