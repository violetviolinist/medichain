curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
     "packageId": "package1",
     "name": "Heart Surgery Medical Term",
     "description": "Long text describing procedure",
     "category": "Cardiac",
     "image": "BASE64",
     "requiredDocs": ["MRI Scan", "CT Scan"],
     "fundamentalProcedureNames": ["Heart Procedure 1", "Heart Procedure 2", "Heart Procedure 3"],
     "fundamentalProcedureCosts": [5000, 75000, 5000],
     "fundamentalProcedureTimes": ["1", "5", "10"],
     "contingencyNames": ["Contingency 1", "Contingency 2", "Contingency 3"],
     "contingencyDescriptions": ["Contingency Description 1", "Contingency Description 2", "Contingency Description 3"],
     "contingencyCosts": [200, 600, 1000],
     "contingencyTimes": ["2", "6", "10"],
     "unvalidatedContingencyNames": [],
     "unvalidatedContingencyDescriptions": [],
     "unvalidatedContingencyCosts": [],
     "unvalidatedContingencyTimes": [],
     "totalFundamentalCost": 85000,
     "totalFundamentalTime": "16",
     "totalTime": "34",
     "totalCost": 86800,
     "providerId": "hospital1",
     "providerType": "Hospital",
     "providerName": "Some Hospital Name"
}' 'http://localhost:3000/api/Package'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
     "$class": "medichain.network.BoughtPackage",
     "boughtPackageId": "boughtPackage1",
     "packageId": "package1",
     "providerId": "hospital1",
     "providerType": "Hospital",
     "providerName": "Some Hospital Name",
     "customerId": "customer1",
     "customerName": "Jay Parekh",
     "holdAmount": 50000,
     "contingencyFund": 10000,
     "patientStageStatus": [false, false, false],
     "providerStageStatus": [false, false, false],
     "patientContingencyStatus": [false, false, false],
     "providerContingencyStatus": [false, false, false],
     "patientUnvalidatedContingencyStatus": [],
     "providerUnvalidatedContingencyStatus": [],
     "unverifiedStageName": "-1",
     "unverifiedContingencyName": "-1",
     "medicalRecords": ["BASE64", "BASE64"],
     "startDate": "TIMESTAMP",
     "currentStage": "Heart Procedure 1"
}' 'http://localhost:3000/api/BoughtPackage'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
     "$class": "medichain.network.Hospital",
     "hospitalId": "hospital1",
     "hospitalName": "Some Hospital Name",
     "address": "Banglore, India",
     "rating": "5/6",
     "contingenciesProposed": "5",
     "contingenciesValidated": "5",
     "packageIds": ["package1"],
     "country": "India",
     "wallet": 1000000
}' 'http://localhost:3000/api/Hospital'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.CompleteStage",
   "boughtPackageId": "boughtPackage1",
   "stageName": "Heart Procedure 1"
}' 'http://localhost:3000/api/CompleteStage'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.VerifyStage",
   "boughtPackageId": "boughtPackage1",
   "stageName": "Heart Procedure 1"
}' 'http://localhost:3000/api/VerifyStage'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.CompleteContingency",
   "boughtPackageId": "boughtPackage1",
   "contingencyName": "Contingency 1"
 }' 'http://localhost:3000/api/CompleteContingency'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.VerifyContingency",
   "boughtPackageId": "boughtPackage1",
   "contingencyName": "Contingency 1"
}' 'http://localhost:3000/api/VerifyContingency'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.RaiseContingency",
   "boughtPackageId": "boughtPackage1",
   "contingencyName": "Some contingency name",
   "contingencyDescription": "Some required extra procedure",
   "contingencyCost": 1000,
   "contingencyTime": "2"
}' 'http://localhost:3000/api/RaiseContingency'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.VerifyContingency",
   "boughtPackageId": "boughtPackage1",
   "contingencyName": "Some contingency name"
}' 'http://localhost:3000/api/VerifyContingency'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.ValidateContingency",
   "boughtPackageId": "boughtPackage1",
   "contingencyName": "Some contingency name"
}' 'http://localhost:3000/api/ValidateContingency'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.RaiseContingency",
   "boughtPackageId": "boughtPackage1",
   "contingencyName": "Contingency to reject",
   "contingencyDescription": "Some required extra procedure",
   "contingencyCost": 400,
   "contingencyTime": "2"
}' 'http://localhost:3000/api/RaiseContingency'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "medichain.network.RejectContingency",
   "boughtPackageId": "boughtPackage1",
   "contingencyName": "Contingency to reject"
}' 'http://localhost:3000/api/RejectContingency'