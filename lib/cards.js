module.exports = {
    fallout_entry: {
		"contentType": "application/vnd.microsoft.card.adaptive",
		"content": {
			"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
			"type": "AdaptiveCard",
			"version": "1.2",
			"body": [
				{
					"type": "TextBlock",
					"size": "Medium",
					"weight": "Bolder",
					"text": "${title}",
					"horizontalAlignment": "Center",
					"wrap": true
				},
				{
					"type": "TextBlock",
					"text": "${description}",
					"wrap": true
				},
				{
					"type": "TextBlock",
					"text": "${keyword}",
					"wrap": true,
					"weight": "Bolder"
				},
				{
					"type": "Input.Text",
					"style": "text",
					"id": "keyword",
					"separator": true
				},
				{
					"type": "TextBlock",
					"text": "${code}",
					"wrap": true,
					"weight": "Bolder"
				},
				{
					"type": "TextBlock",
					"text": "${code_help}",
					"wrap": true
				},
				{
					"type": "Input.Text",
					"id": "code",
					"separator": true
				}
			],
			"actions": [
				{
					"type": "Action.Submit",
					"title": "Submit",
					"data": {
						"card": "fallout"
					}
				}
			]
		}
	},
    fallout_result: {
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": "${title}",
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": "${description}",
                    "wrap": true
                },
                {
                    "type": "FactSet",
                    "facts": [
                        {
                            "$data": "${properties}",
                            "title": "${key}:",
                            "value": "${value}"
                        }
                    ]
                }
            ]
        }
    },
	fallout_other: {
		"contentType": "application/vnd.microsoft.card.adaptive",
		"content": {
			"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
			"type": "AdaptiveCard",
			"version": "1.2",
			"body": [
				{
					"type": "TextBlock",
					"size": "Medium",
					"weight": "Bolder",
					"text": "${title}",
					"wrap": true
				},
				{
					"type": "TextBlock",
					"text": "${description}",
					"wrap": true
				}
			]
		}
	},
	fallout_help: {
		"contentType": "application/vnd.microsoft.card.adaptive",
		"content": {
			"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
			"type": "AdaptiveCard",
			"version": "1.2",
			"body": [
				{
					"type": "TextBlock",
					"size": "Medium",
					"weight": "Bolder",
					"text": "${title}",
					"wrap": true
				},
				{
					"type": "TextBlock",
					"text": "${description}",
					"wrap": true
				},
				{
					"type": "Container",
					"items": [
						{
							"type": "TextBlock",
							"text": "${supported_commands_title}",
							"wrap": true,
							"weight": "Bolder"
						},
						{
							"type": "FactSet",
							"facts": [
								{
									"$data": "${commands}",
									"title": "${key}",
									"value": "${value}"
								}
							]
						}
					]
				},
				{
					"type": "Container",
					"items": [
						{
							"type": "TextBlock",
							"text": "${getting_started_title}",
							"wrap": true,
							"weight": "Bolder"
						},
						{
							"type": "TextBlock",
							"text": "${getting_started}",
							"wrap": true
						}
					]
				},
				{
					"type": "Container",
					"items": [
						{
							"type": "TextBlock",
							"text": "${error_title}",
							"wrap": true,
							"weight": "Bolder"
						},
						{
							"type": "TextBlock",
							"text": "${error}",
							"wrap": true
						},
						{
							"type": "TextBlock",
							"text": "${$root.error_checks}",
							"wrap": false
						}
					]
				}
			]
		}
	}
}
