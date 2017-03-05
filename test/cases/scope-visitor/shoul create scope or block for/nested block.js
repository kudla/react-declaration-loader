var a;
{
    {
        var b;
    }
}
// should produce such a scope structure ---------------------------------------
{
    "Identifier": {
        "a": {
            "closure": {
                "type": "Program",
                "id": 0
            },
            "block": {
                "type": "Program",
                "id": 0
            }
        },
        "b": {
            "closure": {
                "type": "Program",
                "id": 0
            },
            "block": {
                "type": "BlockStatement",
                "id": 1
            }
        }
    },
    "Program": [{
        "closure": {
            "type": "Program",
            "id": 0
        },
        "block": {
            "type": "Program",
            "id": 0
        }
    }],
    "BlockStatement": [{
            "closure": {
                "type": "Program",
                "id": 0
            },
            "block": {
                "type": "BlockStatement",
                "id": 0
            }
        },
        {
            "closure": {
                "type": "Program",
                "id": 0
            },
            "block": {
                "type": "BlockStatement",
                "id": 1
            }
    }]
}
