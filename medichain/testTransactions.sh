curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.Citizen",
   "aadhaarId": "123456789010",
   "dob": "01/01/1998",
   "firstName": "Urvi",
   "middleName": "Jagdish",
   "lastName": "Bhanushali",
   "phoneNo": "1234567890",
   "emailId": "urvi.bhanushali@spit.ac.in",
   "docsJSON": "{}"
 }' 'http://localhost:3000/api/Citizen'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.Citizen",
   "aadhaarId": "234567890123",
   "dob": "01/01/1998",
   "firstName": "Sai",
   "middleName": "Jagdish",
   "lastName": "Nimkar",
   "phoneNo": "9869837671",
   "emailId": "sarahsonje99@gmail.com",
   "docsJSON": "{}"
 }' 'http://localhost:3000/api/Citizen'
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.Citizen",
   "aadhaarId": "123456789011",
   "dob": "01/01/1998",
   "firstName": "Sarah",
   "middleName": "Ashok",
   "lastName": "Sonje",
   "phoneNo": "1234567890",
   "emailId": "sarah.sonje@spit.ac.in",
   "docsJSON": "{}"
 }' 'http://localhost:3000/api/Citizen'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.Citizen",
   "aadhaarId": "098765432109",
   "dob": "01/01/1998",
   "firstName": "Test",
   "middleName": "Test",
   "lastName": "Test",
   "phoneNo": "7045152555",
   "emailId": "jay.parekh0@gmail.com",
   "docsJSON": "{}"
 }' 'http://localhost:3000/api/Citizen'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthority",
   "IAName": "RTO",
   "description": "RTO for driving licenses",
   "IACentreNames": ["Kolkata RTO", "Thane RTO", "Wadala RTO"]
 }' 'http://localhost:3000/api/IssuingAuthority'
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthority",
   "IAName": "Passport Authority",
   "description": "Issues passports to good citizens",
   "IACentreNames": ["Delhi PA", "Kolkata PA", "Mumbai PA"]
 }' 'http://localhost:3000/api/IssuingAuthority'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthorityCentre",
   "IACentreName": "Kolkata RTO",
   "IAName": "RTO",
   "location": "Kolkata"
 }' 'http://localhost:3000/api/IssuingAuthorityCentre'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthorityCentre",
   "IACentreName": "Wadala RTO",
   "IAName": "RTO",
   "location": "Wadala"
 }' 'http://localhost:3000/api/IssuingAuthorityCentre'
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthorityCentre",
   "IACentreName": "Thane RTO",
   "IAName": "RTO",
   "location": "Thane"
 }' 'http://localhost:3000/api/IssuingAuthorityCentre'
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthorityCentre",
   "IACentreName": "Mumbai PA",
   "IAName": "Passport Authority",
   "location": "Mumbai"
 }' 'http://localhost:3000/api/IssuingAuthorityCentre'
   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthorityCentre",
   "IACentreName": "Kolkata PA",
   "IAName": "Passport Authority",
   "location": "Kolkata"
 }' 'http://localhost:3000/api/IssuingAuthorityCentre'
   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.IssuingAuthorityCentre",
   "IACentreName": "Delhi PA",
   "IAName": "Passport Authority",
   "location": "Delhi"
 }' 'http://localhost:3000/api/IssuingAuthorityCentre'
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "digitracker.network.PermitMetadata", 
   "permitName": "Driving License", 
   "requiredDocs": ["sign", "addressProof"], 
   "formBuilderJSON": "\"[{\\\"type\\\":\\\"number\\\",\\\"required\\\":true,\\\"label\\\":\\\"Number\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"number-1551556726585\\\"},{\\\"type\\\":\\\"select\\\",\\\"required\\\":true,\\\"label\\\":\\\"Select\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"select-1551556732479\\\",\\\"values\\\":[{\\\"label\\\":\\\"Option 1\\\",\\\"value\\\":\\\"option-1\\\",\\\"selected\\\":true},{\\\"label\\\":\\\"Option 2\\\",\\\"value\\\":\\\"option-2\\\"},{\\\"label\\\":\\\"Option 3\\\",\\\"value\\\":\\\"option-3\\\"}]},{\\\"type\\\":\\\"text\\\",\\\"required\\\":true,\\\"label\\\":\\\"Text Field\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"text-1551556735011\\\",\\\"subtype\\\":\\\"text\\\"},{\\\"type\\\":\\\"radio-group\\\",\\\"required\\\":true,\\\"label\\\":\\\"Radio Group\\\",\\\"name\\\":\\\"radio-group-1551556737433\\\",\\\"values\\\":[{\\\"label\\\":\\\"Option 1\\\",\\\"value\\\":\\\"option-1\\\",\\\"selected\\\":true},{\\\"label\\\":\\\"Option 2\\\",\\\"value\\\":\\\"option-2\\\"},{\\\"label\\\":\\\"Option 3\\\",\\\"value\\\":\\\"option-3\\\"}]}]\"", 
   "validationRequired": true,
   "validationRequirements": ["Written Test", "Simulation Test", "On-Road Test"],
   "requiredPermitNames": [],
   "validityPeriod": 8,
   "applicationFee": 100,
   "IAName": "RTO"
 }' 'http://localhost:3000/api/PermitMetadata'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "digitracker.network.PermitMetadata", 
   "permitName": "Learning License", 
   "requiredDocs": ["sign", "addressProof"], 
   "formBuilderJSON": "\"[{\\\"type\\\":\\\"number\\\",\\\"required\\\":true,\\\"label\\\":\\\"Number\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"number-1551556726585\\\"},{\\\"type\\\":\\\"select\\\",\\\"required\\\":true,\\\"label\\\":\\\"Select\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"select-1551556732479\\\",\\\"values\\\":[{\\\"label\\\":\\\"Option 1\\\",\\\"value\\\":\\\"option-1\\\",\\\"selected\\\":true},{\\\"label\\\":\\\"Option 2\\\",\\\"value\\\":\\\"option-2\\\"},{\\\"label\\\":\\\"Option 3\\\",\\\"value\\\":\\\"option-3\\\"}]},{\\\"type\\\":\\\"text\\\",\\\"required\\\":true,\\\"label\\\":\\\"Text Field\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"text-1551556735011\\\",\\\"subtype\\\":\\\"text\\\"},{\\\"type\\\":\\\"radio-group\\\",\\\"required\\\":true,\\\"label\\\":\\\"Radio Group\\\",\\\"name\\\":\\\"radio-group-1551556737433\\\",\\\"values\\\":[{\\\"label\\\":\\\"Option 1\\\",\\\"value\\\":\\\"option-1\\\",\\\"selected\\\":true},{\\\"label\\\":\\\"Option 2\\\",\\\"value\\\":\\\"option-2\\\"},{\\\"label\\\":\\\"Option 3\\\",\\\"value\\\":\\\"option-3\\\"}]}]\"", 
   "validationRequired": true,
   "validationRequirements": ["Written Test", "Simulation Test", "On-Road Test"],
   "requiredPermitNames": [],
   "validityPeriod": 8,
   "applicationFee": 100,
   "IAName": "RTO"
 }' 'http://localhost:3000/api/PermitMetadata'
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "digitracker.network.PermitMetadata", 
   "permitName": "Passport", 
   "requiredDocs": ["sign", "addressProof"], 
   "formBuilderJSON": "\"[{\\\"type\\\":\\\"number\\\",\\\"required\\\":true,\\\"label\\\":\\\"Number\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"number-1551556726585\\\"},{\\\"type\\\":\\\"select\\\",\\\"required\\\":true,\\\"label\\\":\\\"Select\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"select-1551556732479\\\",\\\"values\\\":[{\\\"label\\\":\\\"Option 1\\\",\\\"value\\\":\\\"option-1\\\",\\\"selected\\\":true},{\\\"label\\\":\\\"Option 2\\\",\\\"value\\\":\\\"option-2\\\"},{\\\"label\\\":\\\"Option 3\\\",\\\"value\\\":\\\"option-3\\\"}]},{\\\"type\\\":\\\"text\\\",\\\"required\\\":true,\\\"label\\\":\\\"Text Field\\\",\\\"className\\\":\\\"form-control\\\",\\\"name\\\":\\\"text-1551556735011\\\",\\\"subtype\\\":\\\"text\\\"},{\\\"type\\\":\\\"radio-group\\\",\\\"required\\\":true,\\\"label\\\":\\\"Radio Group\\\",\\\"name\\\":\\\"radio-group-1551556737433\\\",\\\"values\\\":[{\\\"label\\\":\\\"Option 1\\\",\\\"value\\\":\\\"option-1\\\",\\\"selected\\\":true},{\\\"label\\\":\\\"Option 2\\\",\\\"value\\\":\\\"option-2\\\"},{\\\"label\\\":\\\"Option 3\\\",\\\"value\\\":\\\"option-3\\\"}]}]\"", 
   "validationRequired": true,
   "validationRequirements": ["Police Verification", "Passport Office Validation"],
   "requiredPermitNames": [],
   "validityPeriod": 8,
   "applicationFee": 100,
   "IAName": "Passport Authority"
 }' 'http://localhost:3000/api/PermitMetadata'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.EnforcingAuthority",
   "EAName": "Police",
   "description": "Thain thain"
 }' 'http://localhost:3000/api/EnforcingAuthority'
 curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.UserPermit",
   "aadhaarId": "123456789011",
   "permitId": "Learning License#123456789011",
   "permitNumber": "a3jdh5",
   "permitName": "Learning License",
   "formJSON": "[{\"label\":\"Number\",\"value\":[\"123\"]},{\"label\":\"Select\",\"value\":[\"option-1\"]},{\"label\":\"Text Field\",\"value\":[\"drive\"]},{\"label\":\"Radio Group\",\"value\":[\"option-1\"]}]",
   "stage": "ISSUED",
   "isRejected": "false",
   "rejectedBecause": "-1",
   "appliedDate": "2019-02-28T07:48:34.456Z",
   "validFrom": "2019-02-02",
   "validTill": "2019-09-02",
   "validationRequirementsJSON": "{\"Written Test\":true,\"Simulation Test\":true,\"On-Road Test\":true}",
   "validationDatesJSON": "{\"Written Test\": \"2019-02-24T11:55:48.422Z\", \"Simulation Test\": \"2019-02-24T11:55:48.422Z\", \"On-Road Test\": \"2019-02-24T11:55:48.422Z\", \"psychEval\": \"2019-02-24T11:55:48.422Z\"}",
   "IACentreName": "Wadala RTO"
 }' 'http://localhost:3000/api/UserPermit'
  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.UserWallet",
   "uId": "123456789011",
   "ownerFirstName": "Sarah",
   "ownerLastName": "Sonje",
   "paymentDetails": ["VISA"],
   "balance": 20
 }' 'http://localhost:3000/api/UserWallet'
   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.UserWallet",
   "uId": "Wadala RTO",
   "ownerFirstName": "IAC",
   "ownerLastName": "Wadala",
   "paymentDetails": ["VISA"],
   "balance": 12
 }' 'http://localhost:3000/api/UserWallet'
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "digitracker.network.SubmitApplication",
   "aadhaarId": "123456789011",
   "permitName": "Driving License",
   "formJSON": "[{\"label\":\"Number\",\"value\":[\"123\"]},{\"label\":\"Select\",\"value\":[\"option-1\"]},{\"label\":\"Text Field\",\"value\":[\"drive\"]},{\"label\":\"Radio Group\",\"value\":[\"option-1\"]}]",
   "IACentreName": "Wadala RTO",
   "submittedDocsJSON": "{\"sign\": \"BASE64\", \"addressProof\": \"BASE64\"}",   
   "timestamp": "2019-02-23T10:26:03.346Z"
 }' 'http://localhost:3000/api/SubmitApplication'
# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.VerifyApplication",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "timestamp": "2019-02-24T10:17:20.757Z"
# }' 'http://localhost:3000/api/VerifyApplication'
# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.UpdateNlpScore",
#    "nlpScore": 0.75,
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "timestamp": "2019-03-03T07:58:25.686Z"
#  }' 'http://localhost:3000/api/UpdateNlpScore'
#  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.PsychEvaluation",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "doctorCertificate": "BASE64",
#    "timestamp": "2019-03-03T07:58:25.545Z"
#  }' 'http://localhost:3000/api/PsychEvaluation'
# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.ValidateNextStage",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "validationRequirementsJSON": "{\"Written Test\":true,\"Simulation Test\":true,\"On-Road Test\":true,\"psychEval\":true}",
#    "validationDatesJSON": "{\"Written Test\": \"2019-02-24T11:55:48.422Z\", \"Simulation Test\": \"2019-02-24T11:55:48.422Z\", \"On-Road Test\": \"2019-02-24T11:55:48.422Z\", \"psychEval\": \"2019-02-24T11:55:48.422Z\"}",
#    "timestamp": "2019-02-24T11:55:48.422Z"
#  }' 'http://localhost:3000/api/ValidateNextStage'
# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.IssuePermit",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "timestamp": "2019-02-24T11:55:48.151Z"
#  }' 'http://localhost:3000/api/IssuePermit'
#   curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.RegisterPenalty",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "description": "Traffic signal jump",
#    "penalty": 550.5,
#    "date": "2019-02-24T11:55:48.422Z",
#    "timestamp": "2019-02-26T04:43:40.811Z"
#  }' 'http://localhost:3000/api/RegisterPenalty'
#  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.RejectApplication",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "rejectionStage": "VALIDATION",
#    "rejectedBecause": "Test failed",
#    "timestamp": "2019-02-26T04:58:34.314Z"
#  }' 'http://localhost:3000/api/RejectApplication'
#  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.SuspendPermit",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "suspendedBecause": "Some violation",
#    "suspendTill": "2019-02-24T11:55:48.422Z",
#    "date": "2019-02-24T11:55:48.422Z",
#    "timestamp": "2019-02-26T04:58:34.367Z"
#  }' 'http://localhost:3000/api/SuspendPermit'
#  curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.RevokePermit",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "revokedBecause": "Some violation",
#    "date": "2019-02-24T11:55:48.422Z",
#    "timestamp": "2019-02-26T04:58:34.332Z"
#  }' 'http://localhost:3000/api/RevokePermit'

# curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
#    "$class": "digitracker.network.PayForViolation",
#    "aadhaarId": "123456789011",
#    "permitName": "Driving License",
#    "violationArrayIndex": "0",
#    "amount": "500",
#    "date": "2019-02-24T11:55:48.422Z",
#    "timestamp": "2019-03-02T08:51:08.111Z"
#  }' 'http://localhost:3000/api/PayForViolation'



#   ============================== IDENTITIES PART ========================================== #

# curl -O -X POST --header 'Content-Type: application/json' --header 'Accept: application/octet-stream' -d '{
#    "participant": "digitracker.network.Citizen#123456789012",
#    "userID": "citizen",S
#    "options": {}
#  }' 'http://localhost:3000/api/system/identities/issue'
# mv issue citizen@permit-cycle.card
# curl -O -X POST --header 'Content-Type: application/json' --header 'Accept: application/octet-stream' -d '{
#   "participant": "digitracker.network.EnforcingAuthority#Police",
#   "userID": "police",
#   "options": {}
# }' 'http://localhost:3000/api/system/identities/issue'
# mv issue police@permit-cycle.card
# curl -O -X POST --header 'Content-Type: application/json' --header 'Accept: application/octet-stream' -d '{
#   "participant": "digitracker.network.IssuingAuthority#RTO",
#   "userID": "rto",
#   "options": {}
# }' 'http://localhost:3000/api/system/identities/issue'
# mv issue rto@permit-cycle.card
# curl -O -X POST --header 'Content-Type: application/json' --header 'Accept: application/octet-stream' -d '{
#   "participant": "digitracker.network.IssuingAuthorityCentre#RTOKolkata",
#   "userID": "rto_kolkata",
#   "options": {}
# }' 'http://localhost:3000/api/system/identities/issue'
# mv issue rto_kolkata@permit-cycle.card

# composer card delete -c citizen@permit-cycle
# composer card delete -c police@permit-cycle
# composer card delete -c rto@permit-cycle
# composer card delete -c rto_kolkata@permit-cycle

# composer card import -c citizen@permit-cycle -f citizen@permit-cycle.card
# composer card import -c police@permit-cycle -f police@permit-cycle.card
# composer card import -c rto@permit-cycle -f rto@permit-cycle.card
# composer card import -c rto_kolkata@permit-cycle -f rto_kolkata@permit-cycle.card