var a;
(function b(c) {
    var d;
})
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
                "type": "FunctionExpression",
                "id": 0
            },
            "block": {
                "type": "FunctionExpression",
                "id": 0
            }
        },
        "c": {
            "closure": {
                "type": "FunctionExpression",
                "id": 0
            },
            "block": {
                "type": "FunctionExpression",
                "id": 0
            }
        },
        "d": {
            "closure": {
                "type": "FunctionExpression",
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
    "FunctionExpression": [{
        "closure": {
            "type": "FunctionExpression",
            "id": 0
        },
        "block": {
            "type": "FunctionExpression",
            "id": 0
        }
    }],
    "BlockStatement": [{
        "closure": {
            "type": "FunctionExpression",
            "id": 0
        },
        "block": {
            "type": "BlockStatement",
            "id": 0
        }
    }]
}