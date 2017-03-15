var a;
((b) => {
    var c;
})
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
                "type": "ArrowFunctionExpression",
                "id": 0
            },
            "block": {
                "type": "ArrowFunctionExpression",
                "id": 0
            }
        },
        "c": {
            "closure": {
                "type": "ArrowFunctionExpression",
                "id": 0
            },
            "block": {
                "type": "ArrowFunctionExpression",
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
    "ArrowFunctionExpression": [{
        "closure": {
            "type": "ArrowFunctionExpression",
            "id": 0
        },
        "block": {
            "type": "ArrowFunctionExpression",
            "id": 0
        }
    }]
}
