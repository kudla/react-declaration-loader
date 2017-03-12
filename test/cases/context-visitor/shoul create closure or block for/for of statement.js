var a;
for(var b of {}) {
    var c;
}

// should produce such a context structure ---------------------------------------
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
                "type": "ForOfStatement",
                "id": 0
            }
        },
        "c": {
            "closure": {
                "type": "Program",
                "id": 0
            },
            "block": {
                "type": "BlockStatement",
                "id": 0
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
    "ForOfStatement": [{
        "closure": {
            "type": "Program",
            "id": 0
        },
        "block": {
            "type": "ForOfStatement",
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
    }]
}
