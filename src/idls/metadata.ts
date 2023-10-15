export type MetadataIdl = {
    "version": "1.13.3",
    "name": "token_metadata",
    "instructions": [
        {
            "name": "createMetadataAccountV3",
            "accounts": [
              {
                "name": "metadata",
                "isMut": true,
                "isSigner": false,
                "docs": [
                  "Metadata key (pda of ['metadata', program id, mint id])"
                ]
              },
              {
                "name": "mint",
                "isMut": false,
                "isSigner": false,
                "docs": [
                  "Mint of token asset"
                ]
              },
              {
                "name": "mintAuthority",
                "isMut": false,
                "isSigner": true,
                "docs": [
                  "Mint authority"
                ]
              },
              {
                "name": "payer",
                "isMut": true,
                "isSigner": true,
                "docs": [
                  "payer"
                ]
              },
              {
                "name": "updateAuthority",
                "isMut": false,
                "isSigner": false,
                "isOptionalSigner": true,
                "docs": [
                  "update authority info"
                ]
              },
              {
                "name": "systemProgram",
                "isMut": false,
                "isSigner": false,
                "docs": [
                  "System program"
                ]
              },
              {
                "name": "rent",
                "isMut": false,
                "isSigner": false,
                "isOptional": true,
                "docs": [
                  "Rent info"
                ]
              }
            ],
            "args": [
                {
                    "name": "dicriminant",
                    "type": "u8"
                },
              {
                "name": "createMetadataAccountArgsV3",
                "type": {
                  "defined": "CreateMetadataAccountArgsV3"
                }
              }
            ],
            "legacyOptionalAccountsStrategy": true,
            "discriminant": {
              "type": "u8",
              "value": 33
            }
        }
    ],
    "types": [
        {
            "name": "CreateMetadataAccountArgsV3",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "data",
                  "type": {
                    "defined": "DataV2"
                  }
                },
                {
                  "name": "isMutable",
                  "type": "bool"
                },
                {
                  "name": "collectionDetails",
                  "type": {
                    "option": {
                      "defined": "CollectionDetails"
                    }
                  }
                }
              ]
            }
        },
        {
            "name": "DataV2",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "name",
                  "type": "string"
                },
                {
                  "name": "symbol",
                  "type": "string"
                },
                {
                  "name": "uri",
                  "type": "string"
                },
                {
                  "name": "sellerFeeBasisPoints",
                  "type": "u16"
                },
                {
                  "name": "creators",
                  "type": {
                    "option": {
                      "vec": {
                        "defined": "Creator"
                      }
                    }
                  }
                },
                {
                  "name": "collection",
                  "type": {
                    "option": {
                      "defined": "Collection"
                    }
                  }
                },
                {
                  "name": "uses",
                  "type": {
                    "option": {
                      "defined": "Uses"
                    }
                  }
                }
              ]
            }
        },
        {
            "name": "Creator",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "address",
                  "type": "publicKey"
                },
                {
                  "name": "verified",
                  "type": "bool"
                },
                {
                  "name": "share",
                  "type": "u8"
                }
              ]
            }
        },
        {
            "name": "Collection",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "verified",
                  "type": "bool"
                },
                {
                  "name": "key",
                  "type": "publicKey"
                }
              ]
            }
        }
    ],
    "metadata": {
        "origin": "shank",
        "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
        "binaryVersion": "0.2.0",
        "libVersion": "0.2.0"
    }
}