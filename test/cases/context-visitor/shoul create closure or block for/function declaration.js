var a;
function b(c) {
    var d;
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
                "type": "Program",
                "id": 0
            }
        },
        "c": {
            "closure": {
                "type": "FunctionDeclaration",
                "id": 0
            },
            "block": {
                "type": "FunctionDeclaration",
                "id": 0
            }
        },
        "d": {
            "closure": {
                "type": "FunctionDeclaration",
                "id": 0
            },
            "block": {
                "type": "FunctionDeclaration",
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
    "FunctionDeclaration": [{
        "closure": {
            "type": "FunctionDeclaration",
            "id": 0
        },
        "block": {
            "type": "FunctionDeclaration",
            "id": 0
        }
    }],
    "BlockStatement": [{
        "closure": {
            "type": "FunctionDeclaration",
            "id": 0
        },
        "block": {
            "type": "BlockStatement",
            "id": 0
        }
    }]
}
