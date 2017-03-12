var a;
for(var b in {}) {
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
                "type": "ForInStatement",
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
    "ForInStatement": [{
        "closure": {
            "type": "Program",
            "id": 0
        },
        "block": {
            "type": "ForInStatement",
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
