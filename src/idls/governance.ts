type GovernanceIdl = {
    "version": "3.1.1",
    "name": "spl_governance",
    "instructions": [
      {
        "name": "createRealm",
        "accounts": [
          {
            "name": "realmAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "realmAuthority",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "communityTokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenHoldingAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "payer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "splTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "sysVarRent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "councilTokenMint",
            "isMut": false,
            "isSigner": false,
            "isOptional": true
          },
          {
            "name": "councilTokenHolding",
            "isMut": true,
            "isSigner": false,
            "isOptional": true
          },
          {
            "name": "realmConfig",
            "isMut": true,
            "isSigner": false,
            "isOptional": true
          },
          {
            "name": "communityVoterWeight",
            "isMut": false,
            "isSigner": false,
            "isOptional": true
          },
          {
            "name": "maxCommunityVoterWeight",
            "isMut": false,
            "isSigner": false,
            "isOptional": true
          },
          {
            "name": "councilVoterWeight",
            "isMut": false,
            "isSigner": false,
            "isOptional": true
          },
          {
            "name": "maxCouncilVoterWeight",
            "isMut": false,
            "isSigner": false,
            "isOptional": true
          }
        ],
        "args": [
          {
            "name": "instructionType",
            "type": {
              "defined": "InstructionType"
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "realmConfigArgs",
            "type": {
              "defined": "RealmConfigArgs"
            }
          }
        ]
      },
      {
        "name": "depositGoverningTokens",
        "accounts": [
            {
                "name": "realmAccount",
                "isMut": false,
                "isSigner": false
            },
            {
                "name": "tokenHolding",
                "isMut": true,
                "isSigner": false
            },
            {
                "name": "tokenSource",
                "isMut": true,
                "isSigner": false
            },
            {
                "name": "tokenOwnerAccount",
                "isMut": true,
                "isSigner": true
            },
            {
                "name": "tokenSourceAccount",
                "isMut": true,
                "isSigner": false
            },
            {
                "name": "tokenRecordAccount",
                "isMut": true,
                "isSigner": false
            },
            {
                "name": "payer",
                "isMut": true,
                "isSigner": true
            },
            {
                "name": "systemProgram",
                "isMut": false,
                "isSigner": false
            },
            {
                "name": "splTokenProgram",
                "isMut": false,
                "isSigner": false
            },
            {
                "name": "realmConfig",
                "isMut": false,
                "isSigner": false,
                "isOptional": true
            }
        ],
        "args": [
            {
                "name": "instructionType",
                "type": {
                  "defined": "InstructionType"
                }
            },
            {
                "name": "amount",
                "type": "u64"
            }
        ]
      }
    ],
    "accounts": [
        {
            "name": "realmV2",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "accountType",
                  "type": {
                    "defined": "GovernanceAccountType"
                  }
                },
                {
                  "name": "communityMint",
                  "type": "publicKey"
                },
                {
                  "name": "config",
                  "type": {
                    "defined": "RealmConfig"
                  }
                },
                {
                  "name": "reserved",
                  "type": {
                    "array": [
                      "u8",
                      6
                    ]
                  }
                },
                {
                  "name": "legacy1",
                  "type": "u16"
                },
                {
                  "name": "authority",
                  "type": {
                    "option": "publicKey"
                  }
                },
                {
                  "name": "name",
                  "type": "string"
                },
                {
                  "name": "reservedV2",
                  "type": {
                    "array": [
                      "u8",
                      128
                    ]
                  }
                }
              ]
            }
        }
    ],
    "types": [
        {
            "name": "InstructionType",
            "type": {
              "kind": "enum",
              "variants": [
                {
                  "name": "CreateRealm"
                },
                {
                    "name": "DepositGoverningTokens"
                }
              ]
            }
        },
        {
            "name": "RealmConfigArgs",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "useCouncilMint",
                  "type": "bool"
                },
                {
                  "name": "minCommunityWeightToCreateGovernance",
                  "type": "u64"
                },
                {
                  "name": "communityMintMaxVoterWeightSource",
                  "type": {
                    "defined": "MintMaxVoterWeightSource"
                  }
                },
                {
                  "name": "communityTokenConfigArgs",
                  "type": {
                    "defined": "GoverningTokenConfigArgs"
                  }
                },
                {
                  "name": "councilTokenConfigArgs",
                  "type": {
                    "defined": "GoverningTokenConfigArgs"
                  }
                }
              ]
            }
        },
        {
            "name": "GovernanceAccountType",
            "type": {
              "kind": "enum",
              "variants": [
                {
                  "name": "Uninitialized"
                },
                {
                  "name": "RealmV1"
                },
                {
                  "name": "TokenOwnerRecordV1"
                },
                {
                  "name": "GovernanceV1"
                },
                {
                  "name": "ProgramGovernanceV1"
                },
                {
                  "name": "ProposalV1"
                },
                {
                  "name": "SignatoryRecordV1"
                },
                {
                  "name": "VoteRecordV1"
                },
                {
                  "name": "ProposalInstructionV1"
                },
                {
                  "name": "MintGovernanceV1"
                },
                {
                  "name": "TokenGovernanceV1"
                },
                {
                  "name": "RealmConfig"
                },
                {
                  "name": "VoteRecordV2"
                },
                {
                  "name": "ProposalTransactionV2"
                },
                {
                  "name": "ProposalV2"
                },
                {
                  "name": "ProgramMetadata"
                },
                {
                  "name": "RealmV2"
                },
                {
                  "name": "TokenOwnerRecordV2"
                },
                {
                  "name": "GovernanceV2"
                },
                {
                  "name": "ProgramGovernanceV2"
                },
                {
                  "name": "MintGovernanceV2"
                },
                {
                  "name": "TokenGovernanceV2"
                },
                {
                  "name": "SignatoryRecordV2"
                },
                {
                  "name": "ProposalDeposit"
                },
                {
                  "name": "RequiredSignatory"
                }
              ]
            }
        },
        {
            "name": "RealmConfig",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "legacy1",
                  "type": "u8"
                },
                {
                  "name": "legacy2",
                  "type": "u8"
                },
                {
                  "name": "reserved",
                  "type": {
                    "array": [
                      "u8",
                      6
                    ]
                  }
                },
                {
                  "name": "minCommunityWeightToCreateGovernance",
                  "type": "u64"
                },
                {
                  "name": "communityMintMaxVoterWeightSource",
                  "type": {
                    "defined": "MintMaxVoterWeightSource"
                  }
                },
                {
                  "name": "councilMint",
                  "type": {
                    "option": "publicKey"
                  }
                }
              ]
            }
        },
        {
          "name": "MintMaxVoterWeightSource",
          "type": {
            "kind": "enum",
            "variants": [
              {
                "name": "SupplyFraction",
                "fields": [
                  "u64"
                ]
              },
              {
                "name": "Absolute",
                "fields": [
                  "u64"
                ]
              }
            ]
          }
        },
        {
          "name": "GoverningTokenConfigArgs",
          "type": {
            "kind": "struct",
            "fields": [
              {
                "name": "useVoterWeightAddin",
                "type": "bool"
              },
              {
                "name": "useMaxVoterWeightAddin",
                "type": "bool"
              },
              {
                "name": "tokenType",
                "type": {
                  "defined": "GoverningTokenType"
                }
              }
            ]
          }
        },
        {
          "name": "GoverningTokenType",
          "type": {
            "kind": "enum",
            "variants": [
              {
                "name": "Liquid"
              },
              {
                "name": "Membership"
              },
              {
                "name": "Dormant"
              }
            ]
          }
        }
    ],
    "errors": [
        {
          "code": 500,
          "name": "InvalidInstruction",
          "msg": "Invalid instruction passed to program"
        },
        {
          "code": 501,
          "name": "RealmAlreadyExists",
          "msg": "Realm with the given name and governing mints already exists"
        },
        {
          "code": 502,
          "name": "InvalidRealm",
          "msg": "Invalid realm"
        },
        {
          "code": 503,
          "name": "InvalidGoverningTokenMint",
          "msg": "Invalid Governing Token Mint"
        },
        {
          "code": 504,
          "name": "GoverningTokenOwnerMustSign",
          "msg": "Governing Token Owner must sign transaction"
        },
        {
          "code": 505,
          "name": "GoverningTokenOwnerOrDelegateMustSign",
          "msg": "Governing Token Owner or Delegate  must sign transaction"
        },
        {
          "code": 506,
          "name": "AllVotesMustBeRelinquishedToWithdrawGoverningTokens",
          "msg": "All votes must be relinquished to withdraw governing tokens"
        },
        {
          "code": 507,
          "name": "InvalidTokenOwnerRecordAccountAddress",
          "msg": "Invalid Token Owner Record account address"
        },
        {
          "code": 508,
          "name": "InvalidGoverningMintForTokenOwnerRecord",
          "msg": "Invalid GoverningMint for TokenOwnerRecord"
        },
        {
          "code": 509,
          "name": "InvalidRealmForTokenOwnerRecord",
          "msg": "Invalid Realm for TokenOwnerRecord"
        },
        {
          "code": 510,
          "name": "InvalidProposalForProposalTransaction",
          "msg": "Invalid Proposal for ProposalTransaction,"
        },
        {
          "code": 511,
          "name": "InvalidSignatoryAddress",
          "msg": "Invalid Signatory account address"
        },
        {
          "code": 512,
          "name": "SignatoryAlreadySignedOff",
          "msg": "Signatory already signed off"
        },
        {
          "code": 513,
          "name": "SignatoryMustSign",
          "msg": "Signatory must sign"
        },
        {
          "code": 514,
          "name": "InvalidProposalOwnerAccount",
          "msg": "Invalid Proposal Owner"
        },
        {
          "code": 515,
          "name": "InvalidProposalForVoterRecord",
          "msg": "Invalid Proposal for VoterRecord"
        },
        {
          "code": 516,
          "name": "InvalidGoverningTokenOwnerForVoteRecord",
          "msg": "Invalid GoverningTokenOwner for VoteRecord"
        },
        {
          "code": 517,
          "name": "InvalidVoteThresholdPercentage",
          "msg": "Invalid Governance config: Vote threshold percentage out of range"
        },
        {
          "code": 518,
          "name": "ProposalAlreadyExists",
          "msg": "Proposal for the given Governance, Governing Token Mint and index already exists"
        },
        {
          "code": 519,
          "name": "VoteAlreadyExists",
          "msg": "Token Owner already voted on the Proposal"
        },
        {
          "code": 520,
          "name": "NotEnoughTokensToCreateProposal",
          "msg": "Owner doesn't have enough governing tokens to create Proposal"
        },
        {
          "code": 521,
          "name": "InvalidStateCannotEditSignatories",
          "msg": "Invalid State: Can't edit Signatories"
        },
        {
          "code": 522,
          "name": "InvalidProposalState",
          "msg": "Invalid Proposal state"
        },
        {
          "code": 523,
          "name": "InvalidStateCannotEditTransactions",
          "msg": "Invalid State: Can't edit transactions"
        },
        {
          "code": 524,
          "name": "InvalidStateCannotExecuteTransaction",
          "msg": "Invalid State: Can't execute transaction"
        },
        {
          "code": 525,
          "name": "CannotExecuteTransactionWithinHoldUpTime",
          "msg": "Can't execute transaction within its hold up time"
        },
        {
          "code": 526,
          "name": "TransactionAlreadyExecuted",
          "msg": "Transaction already executed"
        },
        {
          "code": 527,
          "name": "InvalidTransactionIndex",
          "msg": "Invalid Transaction index"
        },
        {
          "code": 528,
          "name": "TransactionHoldUpTimeBelowRequiredMin",
          "msg": "Transaction hold up time is below the min specified by Governance"
        },
        {
          "code": 529,
          "name": "TransactionAlreadyExists",
          "msg": "Transaction at the given index for the Proposal already exists"
        },
        {
          "code": 530,
          "name": "InvalidStateCannotSignOff",
          "msg": "Invalid State: Can't sign off"
        },
        {
          "code": 531,
          "name": "InvalidStateCannotVote",
          "msg": "Invalid State: Can't vote"
        },
        {
          "code": 532,
          "name": "InvalidStateCannotFinalize",
          "msg": "Invalid State: Can't finalize vote"
        },
        {
          "code": 533,
          "name": "InvalidStateCannotCancelProposal",
          "msg": "Invalid State: Can't cancel Proposal"
        },
        {
          "code": 534,
          "name": "VoteAlreadyRelinquished",
          "msg": "Vote already relinquished"
        },
        {
          "code": 535,
          "name": "CannotFinalizeVotingInProgress",
          "msg": "Can't finalize vote. Voting still in progress"
        },
        {
          "code": 536,
          "name": "ProposalVotingTimeExpired",
          "msg": "Proposal voting time expired"
        },
        {
          "code": 537,
          "name": "InvalidSignatoryMint",
          "msg": "Invalid Signatory Mint"
        },
        {
          "code": 538,
          "name": "InvalidGovernanceForProposal",
          "msg": "Proposal does not belong to the given Governance"
        },
        {
          "code": 539,
          "name": "InvalidGoverningMintForProposal",
          "msg": "Proposal does not belong to given Governing Mint"
        },
        {
          "code": 540,
          "name": "MintAuthorityMustSign",
          "msg": "Current mint authority must sign transaction"
        },
        {
          "code": 541,
          "name": "InvalidMintAuthority",
          "msg": "Invalid mint authority"
        },
        {
          "code": 542,
          "name": "MintHasNoAuthority",
          "msg": "Mint has no authority"
        },
        {
          "code": 543,
          "name": "SplTokenAccountWithInvalidOwner",
          "msg": "Invalid Token account owner"
        },
        {
          "code": 544,
          "name": "SplTokenMintWithInvalidOwner",
          "msg": "Invalid Mint account owner"
        },
        {
          "code": 545,
          "name": "SplTokenAccountNotInitialized",
          "msg": "Token Account is not initialized"
        },
        {
          "code": 546,
          "name": "SplTokenAccountDoesNotExist",
          "msg": "Token Account doesn't exist"
        },
        {
          "code": 547,
          "name": "SplTokenInvalidTokenAccountData",
          "msg": "Token account data is invalid"
        },
        {
          "code": 548,
          "name": "SplTokenInvalidMintAccountData",
          "msg": "Token mint account data is invalid"
        },
        {
          "code": 549,
          "name": "SplTokenMintNotInitialized",
          "msg": "Token Mint account is not initialized"
        },
        {
          "code": 550,
          "name": "SplTokenMintDoesNotExist",
          "msg": "Token Mint account doesn't exist"
        },
        {
          "code": 551,
          "name": "InvalidProgramDataAccountAddress",
          "msg": "Invalid ProgramData account address"
        },
        {
          "code": 552,
          "name": "InvalidProgramDataAccountData",
          "msg": "Invalid ProgramData account Data"
        },
        {
          "code": 553,
          "name": "InvalidUpgradeAuthority",
          "msg": "Provided upgrade authority doesn't match current program upgrade authority"
        },
        {
          "code": 554,
          "name": "UpgradeAuthorityMustSign",
          "msg": "Current program upgrade authority must sign transaction"
        },
        {
          "code": 555,
          "name": "ProgramNotUpgradable",
          "msg": "Given program is not upgradable"
        },
        {
          "code": 556,
          "name": "InvalidTokenOwner",
          "msg": "Invalid token owner"
        },
        {
          "code": 557,
          "name": "TokenOwnerMustSign",
          "msg": "Current token owner must sign transaction"
        },
        {
          "code": 558,
          "name": "VoteThresholdTypeNotSupported",
          "msg": "Given VoteThresholdType is not supported"
        },
        {
          "code": 559,
          "name": "VoteWeightSourceNotSupported",
          "msg": "Given VoteWeightSource is not supported"
        },
        {
          "code": 560,
          "name": "Legacy1",
          "msg": "Legacy1"
        },
        {
          "code": 561,
          "name": "GovernancePdaMustSign",
          "msg": "Governance PDA must sign"
        },
        {
          "code": 562,
          "name": "TransactionAlreadyFlaggedWithError",
          "msg": "Transaction already flagged with error"
        },
        {
          "code": 563,
          "name": "InvalidRealmForGovernance",
          "msg": "Invalid Realm for Governance"
        },
        {
          "code": 564,
          "name": "InvalidAuthorityForRealm",
          "msg": "Invalid Authority for Realm"
        },
        {
          "code": 565,
          "name": "RealmHasNoAuthority",
          "msg": "Realm has no authority"
        },
        {
          "code": 566,
          "name": "RealmAuthorityMustSign",
          "msg": "Realm authority must sign"
        },
        {
          "code": 567,
          "name": "InvalidGoverningTokenHoldingAccount",
          "msg": "Invalid governing token holding account"
        },
        {
          "code": 568,
          "name": "RealmCouncilMintChangeIsNotSupported",
          "msg": "Realm council mint change is not supported"
        },
        {
          "code": 569,
          "name": "InvalidMaxVoterWeightAbsoluteValue",
          "msg": "Invalid max voter weight absolute value"
        },
        {
          "code": 570,
          "name": "InvalidMaxVoterWeightSupplyFraction",
          "msg": "Invalid max voter weight supply fraction"
        },
        {
          "code": 571,
          "name": "NotEnoughTokensToCreateGovernance",
          "msg": "Owner doesn't have enough governing tokens to create Governance"
        },
        {
          "code": 572,
          "name": "TooManyOutstandingProposals",
          "msg": "Too many outstanding proposals"
        },
        {
          "code": 573,
          "name": "AllProposalsMustBeFinalisedToWithdrawGoverningTokens",
          "msg": "All proposals must be finalized to withdraw governing tokens"
        },
        {
          "code": 574,
          "name": "InvalidVoterWeightRecordForRealm",
          "msg": "Invalid VoterWeightRecord for Realm"
        },
        {
          "code": 575,
          "name": "InvalidVoterWeightRecordForGoverningTokenMint",
          "msg": "Invalid VoterWeightRecord for GoverningTokenMint"
        },
        {
          "code": 576,
          "name": "InvalidVoterWeightRecordForTokenOwner",
          "msg": "Invalid VoterWeightRecord for TokenOwner"
        },
        {
          "code": 577,
          "name": "VoterWeightRecordExpired",
          "msg": "VoterWeightRecord expired"
        },
        {
          "code": 578,
          "name": "InvalidRealmConfigForRealm",
          "msg": "Invalid RealmConfig for Realm"
        },
        {
          "code": 579,
          "name": "TokenOwnerRecordAlreadyExists",
          "msg": "TokenOwnerRecord already exists"
        },
        {
          "code": 580,
          "name": "GoverningTokenDepositsNotAllowed",
          "msg": "Governing token deposits not allowed"
        },
        {
          "code": 581,
          "name": "InvalidVoteChoiceWeightPercentage",
          "msg": "Invalid vote choice weight percentage"
        },
        {
          "code": 582,
          "name": "VoteTypeNotSupported",
          "msg": "Vote type not supported"
        },
        {
          "code": 583,
          "name": "InvalidProposalOptions",
          "msg": "Invalid proposal options"
        },
        {
          "code": 584,
          "name": "ProposalIsNotExecutable",
          "msg": "Proposal is not not executable"
        },
        {
          "code": 585,
          "name": "DenyVoteIsNotAllowed",
          "msg": "Deny vote is not allowed"
        },
        {
          "code": 586,
          "name": "CannotExecuteDefeatedOption",
          "msg": "Cannot execute defeated option"
        },
        {
          "code": 587,
          "name": "VoterWeightRecordInvalidAction",
          "msg": "VoterWeightRecord invalid action"
        },
        {
          "code": 588,
          "name": "VoterWeightRecordInvalidActionTarget",
          "msg": "VoterWeightRecord invalid action target"
        },
        {
          "code": 589,
          "name": "InvalidMaxVoterWeightRecordForRealm",
          "msg": "Invalid MaxVoterWeightRecord for Realm"
        },
        {
          "code": 590,
          "name": "InvalidMaxVoterWeightRecordForGoverningTokenMint",
          "msg": "Invalid MaxVoterWeightRecord for GoverningTokenMint"
        },
        {
          "code": 591,
          "name": "MaxVoterWeightRecordExpired",
          "msg": "MaxVoterWeightRecord expired"
        },
        {
          "code": 592,
          "name": "NotSupportedVoteType",
          "msg": "Not supported VoteType"
        },
        {
          "code": 593,
          "name": "RealmConfigChangeNotAllowed",
          "msg": "RealmConfig change not allowed"
        },
        {
          "code": 594,
          "name": "GovernanceConfigChangeNotAllowed",
          "msg": "GovernanceConfig change not allowed"
        },
        {
          "code": 595,
          "name": "AtLeastOneVoteThresholdRequired",
          "msg": "At least one VoteThreshold is required"
        },
        {
          "code": 596,
          "name": "ReservedBufferMustBeEmpty",
          "msg": "Reserved buffer must be empty"
        },
        {
          "code": 597,
          "name": "CannotRelinquishInFinalizingState",
          "msg": "Cannot Relinquish in Finalizing state"
        },
        {
          "code": 598,
          "name": "InvalidRealmConfigAddress",
          "msg": "Invalid RealmConfig account address"
        },
        {
          "code": 599,
          "name": "CannotDepositDormantTokens",
          "msg": "Cannot deposit dormant tokens"
        },
        {
          "code": 600,
          "name": "CannotWithdrawMembershipTokens",
          "msg": "Cannot withdraw membership tokens"
        },
        {
          "code": 601,
          "name": "CannotRevokeGoverningTokens",
          "msg": "Cannot revoke GoverningTokens"
        },
        {
          "code": 602,
          "name": "InvalidRevokeAmount",
          "msg": "Invalid Revoke amount"
        },
        {
          "code": 603,
          "name": "InvalidGoverningTokenSource",
          "msg": "Invalid GoverningToken source"
        },
        {
          "code": 604,
          "name": "CannotChangeCommunityTokenTypeToMembership",
          "msg": "Cannot change community TokenType to Membership"
        },
        {
          "code": 605,
          "name": "VoterWeightThresholdDisabled",
          "msg": "Voter weight threshold disabled"
        },
        {
          "code": 606,
          "name": "VoteNotAllowedInCoolOffTime",
          "msg": "Vote not allowed in cool off time"
        },
        {
          "code": 607,
          "name": "CannotRefundProposalDeposit",
          "msg": "Cannot refund ProposalDeposit"
        },
        {
          "code": 608,
          "name": "InvalidProposalForProposalDeposit",
          "msg": "Invalid Proposal for ProposalDeposit"
        },
        {
          "code": 609,
          "name": "InvalidDepositExemptProposalCount",
          "msg": "Invalid deposit_exempt_proposal_count"
        },
        {
          "code": 610,
          "name": "GoverningTokenMintNotAllowedToVote",
          "msg": "GoverningTokenMint not allowed to vote"
        },
        {
          "code": 611,
          "name": "InvalidDepositPayerForProposalDeposit",
          "msg": "Invalid deposit Payer for ProposalDeposit"
        },
        {
          "code": 612,
          "name": "InvalidStateNotFinal",
          "msg": "Invalid State: Proposal is not in final state"
        },
        {
          "code": 613,
          "name": "InvalidStateToCompleteProposal",
          "msg": "Invalid state for proposal state transition to Completed"
        },
        {
          "code": 614,
          "name": "InvalidNumberOfVoteChoices",
          "msg": "Invalid number of vote choices"
        },
        {
          "code": 615,
          "name": "RankedVoteIsNotSupported",
          "msg": "Ranked vote is not supported"
        },
        {
          "code": 616,
          "name": "ChoiceWeightMustBe100Percent",
          "msg": "Choice weight must be 100%"
        },
        {
          "code": 617,
          "name": "SingleChoiceOnlyIsAllowed",
          "msg": "Single choice only is allowed"
        },
        {
          "code": 618,
          "name": "AtLeastSingleChoiceIsRequired",
          "msg": "At least single choice is required"
        },
        {
          "code": 619,
          "name": "TotalVoteWeightMustBe100Percent",
          "msg": "Total vote weight must be 100%"
        },
        {
          "code": 620,
          "name": "InvalidMultiChoiceProposalParameters",
          "msg": "Invalid multi choice proposal parameters"
        },
        {
          "code": 621,
          "name": "InvalidGovernanceForRequiredSignatory",
          "msg": "Invalid Governance for RequiredSignatory"
        },
        {
          "code": 622,
          "name": "SignatoryRecordAlreadyExists",
          "msg": "Signatory Record has already been created"
        },
        {
          "code": 623,
          "name": "InstructionDeprecated",
          "msg": "Instruction has been removed"
        },
        {
          "code": 624,
          "name": "MissingRequiredSignatories",
          "msg": "Proposal is missing required signatories"
        }
    ],
    "metadata": {
        "address": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
    }
}

export default GovernanceIdl;