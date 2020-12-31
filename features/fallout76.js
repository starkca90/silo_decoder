const cards = require('../lib/cards')
const ACData = require('adaptivecards-templating')
const assert = require('assert')
const unscramble = require('unscramble')

module.exports = function (controller) {

    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'fallout', ['message', 'direct_message'], async (bot, message) => {
        // Get the fallout card template from the card library
        let cardTemplate = new ACData.Template(cards['fallout_entry'])

        // Fill in the card template
        // TODO: Possible multiple language support???
        let cardPayload = cardTemplate.expand({
            $root: {
                "version": "1.0.0",
                "title": "Fallout76 Silo Decoder",
                "description": "Make sure to have the appropriate Keyword and all 8 Code Pieces",
                "keyword": "Silo Keyword",
                "code": "Code Pieces",
                "code_help": "Enter all 8 with semicolons dividing them, for example: B7;G2;H8;J2;M4;O7;Q6;X5"
            }
        })

        // Send the card out to the requester
        await bot.reply(message, {
            text: "Cards are not supported on this platform yet",
            attachments: cardPayload
        })

    })

    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'help', ['message', 'direct_message'], async (bot, message) => {
        // Get the fallout card template from the card library
        let cardTemplate = new ACData.Template(cards['fallout_help'])

        // Fill in the card template
        // TODO: Possible multiple language support???
        let cardPayload = cardTemplate.expand({
            $root: {
                "version": "1.0.0",
                "title": "Fallout76 Silo Decoder",
                "description": "I aid in decoding weekly nuclear silo codes in Fallout 76",
                "supported_commands_title": "Supported Commands",
                "commands": [
                    {
                        "key": "fallout",
                        "value": "Displays the Entry Card"
                    },
                    {
                        "key": "help",
                        "value": "Displays this card"
                    }
                ],
                "getting_started_title": "Getting Started",
                "getting_started": "Request the entry card by sending me the *fallout* command",
                "error_title": "Errors",
                "error": "Errors are inevitable, if I run into one, I will try to help narrow down the issue, but no promises. Things to check include:",
                "error_checks": "- The Correct Silo Keyword is entered (from the printer)\n - All 8 Code fragments from the right silo is entered properly\n - The Keyword and/or code fragments are from the same week"
            }
        })

        // Send the card out to the requester
        await bot.reply(message, {
            text: "Cards are not supported on this platform yet",
            attachments: cardPayload
        })

    })

    // User submitted the card back, time to decode
    controller.on('attachmentActions', async (bot, message) => {
        if (message.value.card === 'fallout') {
            console.log('fallout card returned')
            let keyword = message.value.keyword.toLowerCase()
            let codes = message.value.code.toLowerCase().split(';')

            try {
                // Validate the required pieces were entered
                assert(keyword)
                assert(codes)
                assert(codes.length === 8)

                // Ensure we have potentially valid code pieces
                codes.forEach(code => {
                    assert(code)
                    assert(code.length === 2)
                    assert(code[0].match(/[a-z]/i))
                    assert(code[1].match(/[0-9]/i))
                })

                // Scrambled version of decoded message
                let decodedScramble = ''
                // Dictionary to old decoded char and value pair
                let decodedCodes = {}
                // Final result(s)
                let launchCodes = []

                // Alphabet that we will be modifying
                let alpha = 'abcdefghijklmnopqrstuvwxyz'
                // We also need a clean alphabet, so make a copy
                let cleanAlpha = alpha

                // Iterate through the keyword (starting at the end)
                for (let i = keyword.length - 1; i > -1; i--) {
                    let index = alpha.indexOf(keyword[i])

                    // Move the current letter to the front and append the letters before and after
                    alpha = keyword[i] + alpha.substr(0, index) + alpha.substr(index + 1)
                }

                codes.forEach(element => {
                    // Get the letter element of the code piece
                    let char = element.substr(0, 1)
                    // Find the index of the letter in the "modified" alphabet
                    let index = alpha.indexOf(char)
                    // Get the current of the previously found index from the "clean" alpahabet
                    char = cleanAlpha.substr(index, 1)
                    // Form a string of the decoded characters
                    decodedScramble += char

                    // Add the decoded character and number pair to the dictionary
                    decodedCodes[char] = element.substr(1, 1)
                })

                // Unscramble the scramble, returns an array of possible matches
                let matches = unscramble(decodedScramble)

                // Iterate through each possible word and make a word:code pair dictionary
                matches.forEach(element => {
                    // Unscramble returns ["No results found."] when not results are found, make sure we don't have that
                    assert(element.indexOf(" ") === -1)

                    // Hold the assembled launch code
                    let launchCode = ''

                    // Iterate through the current word get the numeric component
                    for (let i = 0; i < element.length; i++) {
                        launchCode += decodedCodes[element[i]]
                    }

                    // Add the word:code pair to the dictionary
                    launchCodes.push({"key": element, "value": launchCode})
                })

                console.log(launchCodes)
                // Codes obtained, time to present them to the requester

                // Get the fallout card template from the card library
                let cardTemplate = new ACData.Template(cards['fallout_result'])

                // Fill in the card template
                // TODO: Possible multiple language support???
                let cardPayload = cardTemplate.expand({
                    $root: {
                        "version": "1.0.0",
                        "title": "Fallout76 Silo Decoder",
                        "description": "Bellow are the possible silo codes",
                        "properties": launchCodes
                    }
                })

                // Send the card out to the requester
                await bot.reply(message, {
                    text: "Cards are not supported on this platform yet",
                    attachments: cardPayload
                })


            } catch (err) {
                console.error(err)
                console.error("Keyword: " + message.value.keyword)
                console.error("Codes: " + message.value.code)

                // Get the fallout card template from the card library
                let cardTemplate = new ACData.Template(cards['fallout_other'])

                // Fill in the card template
                // TODO: Possible multiple language support???
                let cardPayload = cardTemplate.expand({
                    $root: {
                        "version": "1.0.0",
                        "title": "Fallout76 Silo Decoder",
                        "description": "An error has occurred, please check you entered the correct keyword and code pieces."
                    }
                })

                // Send the card out to the requester
                await bot.reply(message, {
                    text: "Cards are not supported on this platform yet",
                    attachments: cardPayload
                })
            }
        }
    })
}